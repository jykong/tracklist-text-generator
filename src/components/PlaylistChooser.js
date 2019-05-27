import React, { Component } from 'react'
import * as SpotifyFunctions from '../util/spotifyFunctions'
import { Button, Dropdown, Grid } from 'semantic-ui-react'

class PlaylistChooser extends Component {
    state = { playlists: null, playlistOptions: null, selectedPlaylist: null, loading: false };
  
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
        this.setState({selectedPlaylist: value});
    }

    onPlaylistToAdd = () => {
        this.setState({loading: true})
        this.props.onPlaylistToAdd(this.state.selectedPlaylist, this.finishLoadingPlaylist);
    }

    finishLoadingPlaylist = () => {
        this.setState({loading: false})
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
                <Grid padded>
                    <Dropdown
                        fluid
                        options={this.state.playlistOptions}
                        onChange={this.onPlaylistSelected}
                        placeholder='Select Playlist'
                        initialvalue={this.state.selectedPlaylist}
                        search
                        selection
                        clearable
                        loading={this.state.loading}
                        style={{ maxWidth: 300 }}
                    />
                    <Button
                        color='green'
                        onClick={this.onPlaylistToAdd}
                        content='Add Tracks'
                        icon='spotify'
                        labelPosition='left'
                        compact
                    />
                </Grid>
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
