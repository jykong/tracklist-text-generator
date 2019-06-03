import React from 'react'
import * as SpotifyFunctions from '../util/spotifyFunctions'
import { Button, Dropdown, Grid} from 'semantic-ui-react'

class PlaylistChooser extends React.Component {
    state = {
        fetchingPlaylists: false,
        playlistOptions: null,
        selectedPlaylist: null,
        playlistToAdd: null,
        loadingTracks: false,
    };

    componentDidMount() {
        if(this.props.refreshPlaylists) {
            SpotifyFunctions.getUserPlaylists(this.onPlaylistFetchUpdate, this.onFetchError);
        }
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.refreshPlaylists && this.props.refreshPlaylists) {
            SpotifyFunctions.getUserPlaylists(this.onPlaylistFetchUpdate, this.onFetchError);
        }
    }
  
    onPlaylistFetchUpdate = (playlists, offset, total) => {
        if(offset !== total) {
            this.props.updateStatusMsg(`Fetching playlists... (${offset}/${total})`);
            return;
        }
        this.setState({
            playlistOptions: playlists.map(playlist => ({
                key: playlist.id,
                value: playlist.id,
                text: playlist.playlistName,
                url: playlist.url
            })),
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

    onPlaylistToAdd = async () => {
        const playlistToAdd = this.state.playlistOptions.filter(playlist => (
            playlist.value === this.state.selectedPlaylist
        ))[0];
        this.setState({ loadingTracks: true, playlistToAdd: playlistToAdd });
        SpotifyFunctions.getPlaylistTracks(
            this.state.selectedPlaylist, 
            this.onTracksLoadUpdate, 
            this.onFetchError
        );
    }

    onTracksLoadUpdate = (tracks, offset, total) => {
        if(offset !== total) {
            this.props.updateStatusMsg(`Loading tracks... (${offset}/${total})`);
            return;
        }
        this.props.addPlaylist(this.state.playlistToAdd, tracks);
        this.setState({ loadingTracks: false });
        this.props.updateStatusMsg('')
    }

    renderPlaceholderText = () => {
        if(!this.props.refreshPlaylists) return 'Log in to view playlists';
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
                    loading={this.state.loadingTracks || this.state.fetchingPlaylists}
                    disabled={this.props.disabled || !this.state.playlistOptions || 
                        this.state.loadingTracks}
                />
                <Button
                    content='Add Tracks'
                    onClick={this.onPlaylistToAdd}
                    icon='spotify'
                    labelPosition='left'
                    color='green'
                    attached='right'
                    disabled={this.props.disabled || !this.state.playlistOptions || 
                        this.state.loadingTracks || !this.state.selectedPlaylist}
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
