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
    state = { tracks: [], autoId: 0, url: null }

    addTracks = (fetchedTracks) => {
        const newTracks = fetchedTracks.map(track => ({
            id: track.id,
            title: track.title,
            artists: track.artists,
            type: 'playlist'
        }));
        const tracks = (this.state.tracks.length === 0 ?
            newTracks :
            [...this.state.tracks, ...newTracks])
        this.setState({ tracks: tracks });
    }

    removeTracks = () => {
        this.setState({ tracks: this.state.tracks.filter(track => (
            track.type !== 'playlist')) })
    }

    onRemoveTrack = (id) => {
        const filteredTracks = this.state.tracks.filter(track => {
            return track.id !== id
        })
        this.setState({ tracks: filteredTracks })
    }

    addUrl = (url) => {
        this.setState({ url: url });
    }

    removeUrl = () => {
        this.setState({ url: null })
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
                            addTracks={this.addTracks}
                            removeTracks={this.removeTracks}
                            addUrl={this.addUrl}
                            removeUrl={this.removeUrl}
                        />
                        <TracksPreview
                            tracks={this.state.tracks}
                            onRemoveTrack={this.onRemoveTrack}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <TracklistTextControls
                            tracks={this.state.tracks}
                            url={this.state.url}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default TracksContainer