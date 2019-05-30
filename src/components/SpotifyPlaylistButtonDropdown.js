import React, { Component } from 'react';
import * as SpotifyFunctions from '../util/spotifyFunctions.js';
import { Button, Grid, Segment } from 'semantic-ui-react';
import PlaylistChooser from './PlaylistChooser';
import store from 'store'

const buttonConfig = {
    false: {
        buttonType: 'button',
        link: '',
        content: 'Log Out'
    },
    true: {
        buttonType: 'a',
        link: SpotifyFunctions.redirectUrlToSpotifyForLogin(),
        content: 'Log In'
    }
}

class SpotifyPlaylistButtonDropdown extends Component {
    state = { accessToken: null, fetchError: null };

    componentDidMount() {
        let token = SpotifyFunctions.checkUrlForSpotifyAccessToken();
        if(!token) {
            token = store.get('token');
        }
        if(token) {
            SpotifyFunctions.setAccessToken(token);
            store.set('token', token);
            this.setState({accessToken: token});
        }
    }

    onButtonClick = (e) => {
        e.preventDefault();
        if(!this.state.accessToken) {
            window.location.href = SpotifyFunctions.redirectUrlToSpotifyForLogin();
            this.setState({fetchError: null})
            return;
        }
        store.remove('token');
        window.location.href = 'http://localhost:3000/';
    }

    onPlaylistToAdd = (id, finishLoadingPlaylist) => {
        this.props.onPlaylistToAdd(id, finishLoadingPlaylist);
    }

    onPlaylistFetchError = () => {
        store.remove('token');
        this.setState({accessToken: null, fetchError: true});
    }
    
    renderButton = () => {
        const { buttonType, link, content } = buttonConfig[!this.state.accessToken];

        return (
            <Grid.Row>
                <Button
                    as={buttonType}
                    href={link}
                    onClick={this.onButtonClick}
                    icon='spotify'
                    content={content}
                    labelPosition='left'
                    inverted
                    circular
                    size='big'
                    style={{backgroundColor: '#1DB954'}}
                />
            </Grid.Row>
        );
    }

    renderError() {
        return (
            <Grid.Row>
                <p style={{color: 'red'}}>
                    {this.state.fetchError ?
                        'Unable to connect with Spotify. Please log in again.' : ''}
                </p>
            </Grid.Row>
        );
    }

    render() {
        return (
            <Segment.Group>
                <Segment>
                    <h3>Add Tracks from Playlist</h3>
                </Segment>
                <Segment>
                    <Grid centered>
                        {this.renderButton()}
                        <PlaylistChooser
                            disabled={!this.state.accessToken}
                            onPlaylistToAdd={this.onPlaylistToAdd}
                            onPlaylistFetchError={this.onPlaylistFetchError}
                        />
                        {this.renderError()}
                    </Grid>
                </Segment>
            </Segment.Group>
        );
    }
}

export default SpotifyPlaylistButtonDropdown;