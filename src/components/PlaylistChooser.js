import React from 'react'
import * as SpotifyFunctions from '../util/spotifyFunctions'
import { Button, Dropdown, Grid} from 'semantic-ui-react'

class PlaylistChooser extends React.Component {
    state = { playlists: null, playlistOptions: null, selectedPlaylist: null, loading: false };
  
    fetchPlaylists = async () => {
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

    componentDidMount() {
        if(!this.props.disabled) this.fetchPlaylists();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.disabled && !this.props.disabled) this.fetchPlaylists();
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

    renderPlaceholderText = () => {
        if(this.props.disabled) return 'Log in to view playlists';
        if(!this.state.playlists) return 'Fetching playlists...';
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
                    loading={this.state.loading}
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
