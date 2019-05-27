import React, { Component } from 'react'
import * as SpotifyFunctions from '../util/spotifyFunctions'
import { Dropdown } from 'semantic-ui-react'

class PlaylistChooser extends Component {
    state = { playlists: null, playlistOptions: null };
  
    async componentDidMount() {
      //await SpotifyFunctions.setAccessToken(this.props.accessToken);
      const playlists = await SpotifyFunctions.getUserPlaylists();
      if(!playlists) {
          this.props.onPlaylistFetchError();
          return;
      }
      this.setState({ playlists: playlists });
      this.setState({ playlistOptions: playlists.map(playlist => (
            { key: playlist.id, value: playlist.id, text: playlist.playlistName }
          ))});
    }

    onPlaylistSelected = (e, { value }) => {
        this.props.onPlaylistSelected(value)
    }

    renderAllPlaylists() {
        return (
            <ul>
            {this.state.playlists.map(playlist => (
                <div>
                    <li>{playlist.playlistName}</li>
                    <ul>
                        <li>{playlist.id}</li>
                    </ul>
                </div>
            ))}
            </ul>
        );
    }

    renderPlaylists() {
        if(this.state.playlists) {
            return (
                <div>
                    <Dropdown
                        fluid
                        options={this.state.playlistOptions}
                        onChange={this.onPlaylistSelected}
                        placeholder='Select playlist to add tracks from'
                        search
                        style={{ maxWidth: 400 }}
                    />
                </div>
            );
        }
        return <p>Loading Playlists...</p>
    }

    render() {
        return (
            <div>
                {this.renderPlaylists()}
            </div>
        );
    }
}

export default PlaylistChooser;
