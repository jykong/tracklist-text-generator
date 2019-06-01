import React from 'react'
import * as SpotifyFunctions from '../util/spotifyFunctions'
import { Button, Dropdown, Grid} from 'semantic-ui-react'

class PlaylistChooser extends React.Component {
    state = {
        fetchingPlaylists: false,
        playlistOptions: null,
        selectedPlaylist: null,
        loadingTracks: false,
    };

    componentDidMount() {
        if(!this.props.disabled) {
            SpotifyFunctions.getUserPlaylists(this.onPlaylistFetchUpdate, this.onFetchError);
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.disabled && !this.props.disabled) {
            SpotifyFunctions.getUserPlaylists(this.onPlaylistFetchUpdate, this.onFetchError);
        }
    }
  
    onPlaylistFetchUpdate = (playlists, offset, total) => {
        if(offset !== total) {
            this.props.updateStatusMsg(`Fetching playlists... (${offset}/${total})`);
            return;
        }
        this.setState({
            playlistOptions: playlists.map(playlist => (
                { key: playlist.id, value: playlist.id, text: playlist.playlistName }
            )),
            fetchingPlaylists: null
        });
        this.props.updateStatusMsg('')
    }

    onFetchError = () => {
        this.setState({ loadingTracks: false, fetching: false });
        this.props.onFetchError();
    }

    onPlaylistSelected = (e, { value }) => {
        this.setState({ selectedPlaylist: value });
    }

    onPlaylistToAdd = () => {
        this.setState({ loadingTracks: true })
        SpotifyFunctions.getPlaylistTracks(
            this.state.selectedPlaylist, 
            this.onTracksLoadUpdate, 
            this.onFetchError
        )
    }

    onTracksLoadUpdate = (tracks, offset, total) => {
        if(offset !== total) {
            this.props.updateStatusMsg(`Loading tracks... (${offset}/${total})`);
            return;
        }
        this.props.onTracksToAdd(tracks);
        this.setState({ loadingTracks: false });
        this.props.updateStatusMsg('')
    }

    renderPlaceholderText = () => {
        if(this.props.disabled) return 'Log in to view playlists';
        if(this.state.fetchingPlaylists) return 'Fetching playlists...';
        return 'Select playlist'
    }

    renderPlaylists() {
        return (
            <Grid.Row>
                <Dropdown
                    placeholder={this.renderPlaceholderText()}
                    initialvalue={this.state.selectedPlaylist}
                    options={this.state.playlistOptions}
                    onChange={this.onPlaylistSelected}
                    search
                    selection
                    clearable
                    loading={this.state.loadingTracks || this.state.fetchingPlaylists}
                />
                <Button
                    content='Add Tracks'
                    onClick={this.onPlaylistToAdd}
                    icon='spotify'
                    labelPosition='left'
                    color='green'
                    attached='right'
                    disabled={!this.state.playlistOptions}
                />
            </Grid.Row>
        );
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
