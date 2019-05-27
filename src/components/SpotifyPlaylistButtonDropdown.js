import React, { Component } from 'react';
import * as SpotifyFunctions from '../util/spotifyFunctions.js';
import { Button } from 'semantic-ui-react';
import PlaylistChooser from './PlaylistChooser';

const buttonConfig = {
    false: {
        buttonType: 'button',
        link: '',
        content: 'Add Tracks from Spotify playlist'
    },
    true: {
        buttonType: 'a',
        link: SpotifyFunctions.redirectUrlToSpotifyForLogin(),
        content: 'Login to Spotify'
    }
}

class SpotifyPlaylistButtonDropdown extends Component {
    state = { showing: 'button', playlistName: null }

    onButtonClick = (e) => {
        if(!this.props.accessToken) {
            this.setState({ showing: 'waiting for login' });
            window.location.href = SpotifyFunctions.redirectUrlToSpotifyForLogin();
        }
        this.setState({ showing: 'playlists'});
        e.preventDefault();
    }

    onPlaylistToAdd = (id, finishLoadingPlaylist) => {
        this.props.onPlaylistToAdd(id, finishLoadingPlaylist);
    }

    onPlaylistFetchError = () => {
        this.setState({ showing: 'waiting for login' });
        window.location.href = SpotifyFunctions.redirectUrlToSpotifyForLogin();
    }
    
    renderButton = () => {
        const { buttonType, link, content } = buttonConfig[!this.props.accessToken]

        return (
            <Button
                as={buttonType}
                href={link}
                onClick={this.onButtonClick}
                icon='spotify'
                content={content}
                labelPosition='left'
                inverted
                circular
                style={{backgroundColor: '#1DB954'}}
            />
        );
    }

    render() {
        if(this.state.showing === 'waiting for login') {
            return <div>Waiting for Spotify login...</div>
        }
        if(this.state.showing === 'playlists') {
            return (
                <PlaylistChooser
                    accessToken={this.props.accessToken}
                    onPlaylistToAdd={this.onPlaylistToAdd}
                    onPlaylistFetchError={this.onPlaylistFetchError}
                />
            );
        }
        return <div>{this.renderButton()}</div>;
    }
}

export default SpotifyPlaylistButtonDropdown;