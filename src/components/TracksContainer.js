import React from 'react'
import { Grid } from 'semantic-ui-react'
import TracksPreview from './TracksPreview'
import TracksFromSpotifyPlaylist from './TracksFromSpotifyPlaylist'
import TracklistTextControls from './TracklistTextControls'

// class Track {
//     constructor(id, title, artists) {
//         this.id = id;
//         this.title = title;
//         this.artists = artists;
//     }
// };

// const testTracks = [
//     new Track(0, "shut up", ["Greyson Chance"]),
//     new Track(1, "i'm so tired...", ["Lauv", "Troye Sivan"]),
//     new Track(2, "Honey Whisky", ["SATICA"])
// ];

class TracksContainer extends React.Component {
    state = { tracks: [], autoId: 0 }

    onTracksToAdd = (fetchedTracks) => {
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

    render() {
        return (
            <Grid textAlign='left' stackable container>
                <Grid.Row centered>
                    <h1>GSDJs Top Tracks Post Assistant</h1>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <TracksFromSpotifyPlaylist
                            onTracksToAdd={this.onTracksToAdd}
                        />
                        <TracksPreview
                            tracks={this.state.tracks}
                            onClearTracks={this.onClearTracks}
                            onRemoveTrack={this.onRemoveTrack}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <TracklistTextControls
                            tracks={this.state.tracks}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default TracksContainer