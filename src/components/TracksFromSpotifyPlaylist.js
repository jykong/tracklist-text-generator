import React, { Component } from 'react';
import * as SpotifyFunctions from '../util/spotifyFunctions.js';
import { Button, Grid, Segment, Label, Table } from 'semantic-ui-react';
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

class TracksFromSpotifyPlaylist extends Component {
    state = {
        accessToken: null,
        fetchError: null,
        statusMsg: '',
        playlist: null
    };

    componentDidMount() {
        // Check URL for access token
        let token = SpotifyFunctions.checkUrlForSpotifyAccessToken();
        if(!token) {
            // Check local store for access token
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
            // Log In
            window.location.href = SpotifyFunctions.redirectUrlToSpotifyForLogin();
            this.setState({fetchError: null, statusMsg: <p>Logging into Spotify...</p>})
            return;
        }
        // Log Out
        store.remove('token');
        window.location.href = 'http://localhost:3000/';
    }

    addPlaylist = (playlist, tracks) => {
        this.setState({ playlist: playlist });
        this.props.addUrl(playlist.url);
        this.props.addTracks(tracks);
    }

    removePlaylist = (e, {value}) => {
        this.setState({ playlist: null });
        this.props.removeUrl();
        this.props.removeTracks();
    }

    onFetchError = () => {
        store.remove('token');
        this.setState({
            accessToken: null,
            fetchError: true,
            statusMsg: <p style={{ color: 'red' }}>
                {this.state.fetchError ?
                    'Unable to connect with Spotify. Please log in again.' : ''}
            </p>
        });
    }

    updateStatusMsg = (msg) => {
        this.setState({ statusMsg: msg });
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
                    circular
                    size='big'
                    color='green'
                />
            </Grid.Row>
        );
    }

    renderPlaylists = () => {
        if(!this.state.playlist) return;
        return (
            <Table
                style={{border: 'none', 
                    borderTop: '1px solid rgba(34,36,38,.15)',
                    margin: 0
                }}
            >
                <Table.Body>
                    <Table.Row>
                        <Table.Cell collapsing>
                            <h4>Playlist Added:</h4>
                        </Table.Cell>
                        <Table.Cell>
                            <Label 
                                key={this.state.playlist.key}
                                value={this.state.playlist.value}
                                onRemove={this.removePlaylist}
                                content={this.state.playlist.text}
                                color='blue'
                                size='large'
                            />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
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
                            refreshPlaylists={this.state.accessToken !== null}
                            disabled={!this.state.accessToken || this.state.playlist !== null}
                            addPlaylist={this.addPlaylist}
                            onFetchError={this.onFetchError}
                            updateStatusMsg={this.updateStatusMsg}
                        />
                        <Grid.Row>
                            {this.state.statusMsg}
                        </Grid.Row>
                    </Grid>
                </Segment>
                {this.renderPlaylists()}
            </Segment.Group>
        );
    }
}

export default TracksFromSpotifyPlaylist;