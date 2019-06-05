import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import AboutHelp from './AboutHelp'
import TracksPreview from './TracksPreview'
import TracksFromSpotifyPlaylist from './TracksFromSpotifyPlaylist'
import TracklistTextControls from './TracklistTextControls'

class TracksContainer extends React.Component {
    state = { tracks: [], url: null }

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
            <Grid textAlign='left' stackable container>\
                <Grid.Row centered>
                    <Header as='h1' textAlign='center'>
                        Tracklist Text Generator
                        <Header.Subheader>
                            <AboutHelp />
                        </Header.Subheader>
                    </Header>
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