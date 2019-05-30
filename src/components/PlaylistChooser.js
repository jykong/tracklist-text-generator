import React from 'react'
import * as SpotifyFunctions from '../util/spotifyFunctions'
import { Button, Dropdown, Grid} from 'semantic-ui-react'

class PlaylistChooser extends React.Component {
    state = {
        playlists: null,
        playlistOptions: null,
        selectedPlaylist: null,
        loadingTracks: false,
        fetching: null,
    };
  
    onFetchUpdate = (playlists, offset, limit) => {
        if(offset !== limit) {
            this.setState({fetching: [offset, limit]});
            return;
        }
        this.setState({ 
            playlists: playlists,
            playlistOptions: playlists.map(playlist => (
                { key: playlist.id, value: playlist.id, text: playlist.playlistName }
            )),
            fetching: null
        });
    }

    onFetchError = () => {
        this.setState({fetching: null});
        this.props.onPlaylistFetchError();
    }

    componentDidMount() {
        if(!this.props.disabled) {
            SpotifyFunctions.getUserPlaylists(this.onFetchUpdate, this.onFetchError);
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.disabled && !this.props.disabled) {
            SpotifyFunctions.getUserPlaylists(this.onFetchUpdate, this.onFetchError);
        }
    }

    onPlaylistSelected = (e, { value }) => {
        this.setState({selectedPlaylist: value});
    }

    onPlaylistToAdd = () => {
        this.setState({loadingTracks: true})
        this.props.onPlaylistToAdd(this.state.selectedPlaylist, this.finishLoadingPlaylist);
    }

    finishLoadingPlaylist = () => {
        this.setState({loadingTracks: false})
    }

    renderPlaceholderText = () => {
        if(this.props.disabled) return 'Log in to view playlists';
        if(!this.state.playlists) {
            if(!this.state.fetching) return 'Fetching playlists...';
            const [offset, total] = this.state.fetching;
            return `Fetching playlists... (${offset}/${total})`
        }
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
                    loading={this.state.loadingTracks || this.state.fetching != null}
                />
                <Button
                    content='Add Tracks'
                    onClick={this.onPlaylistToAdd}
                    icon='spotify'
                    labelPosition='left'
                    color='green'
                    attached='right'
                    disabled={!this.state.playlists}
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
