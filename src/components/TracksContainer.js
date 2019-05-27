import React from 'react'
import TracksPreview from './TracksPreview'
import SpotifyPlaylistButtonDropdown from './SpotifyPlaylistButtonDropdown'
import * as SpotifyFunctions from '../util/spotifyFunctions'
import { Container, Grid } from 'semantic-ui-react'

class Track {
    constructor(id, title, artists) {
        this.id = id;
        this.title = title;
        this.artists = artists;
    }
};

const testTracks = [
    new Track(0, "shut up", ["Greyson Chance"]),
    new Track(1, "i'm so tired...", ["Lauv", "Troye Sivan"]),
    new Track(2, "Honey Whisky", ["SATICA"])
];

class TracksContainer extends React.Component {
    state = { tracks: [], accessToken: null, autoId: 0 }

    onSpotifyPlaylistToAdd = async (playlistId, finishLoadingPlaylist) => {
        const fetchedTracks = await SpotifyFunctions.getPlaylistTracks(playlistId);
        if(!fetchedTracks) {
            finishLoadingPlaylist();
            return;
        }
        let autoId = this.state.autoId;
        const newTracks = fetchedTracks.map(track => ({
            id: autoId++,
            title: track.title,
            artists: track.artists
        }));
        const tracks = (this.state.tracks.length === 0 ?
            newTracks :
            [...this.state.tracks, ...newTracks])
        this.setState({tracks: tracks, autoId: autoId});
        finishLoadingPlaylist();
    }

    onClearTracks = () => {
        this.setState({tracks: []})
    }

    onRemoveTrack = (id) => {
        const filteredTracks = this.state.tracks.filter(track => {
            return track.id !== id
        })
        this.setState({tracks: filteredTracks})
    }

    componentDidMount() {
        const token = SpotifyFunctions.checkUrlForSpotifyAccessToken();
        if(token) {
            SpotifyFunctions.setAccessToken(token);
            this.setState({accessToken: token});
        }
    }

    render() {
        return (
            <Container>
                <Grid textAlign='left' stackable>
                    <Grid.Row>
                        <Grid.Column style={{ maxWidth: 600 }}>
                            <h2>Tracks Preview</h2>
                            <SpotifyPlaylistButtonDropdown
                                onPlaylistToAdd={this.onSpotifyPlaylistToAdd}
                                accessToken={this.state.accessToken}
                            />
                            <TracksPreview
                                tracks={this.state.tracks}
                                onClearTracks={this.onClearTracks}
                                onRemoveTrack={this.onRemoveTrack}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default TracksContainer