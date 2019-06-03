import React from 'react'
import { Grid, Header, Label, List, Modal } from 'semantic-ui-react'
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
            <Grid textAlign='left' stackable container>\
                <Grid.Row centered>
                    <Header as='h1' textAlign='center'>
                        GSDJs Post Helper
                        <Header.Subheader>
                            <Modal
                                closeIcon
                                trigger={<Label as='a' basic content='About / Help'/>}
                            >
                                <Modal.Header>About / Help</Modal.Header>
                                <Modal.Content>
                                    <p>
                                        GSDJs Post Helper is a simple web app that allows
                                        users to select a Spotify playlist and then have its
                                        track list text automatically generated.
                                    </p>
                                    <p>
                                        To use the app, follow these instructions:
                                    </p>
                                    <List ordered>
                                        <List.Item>Login to Spotify.</List.Item>
                                        <List.Item>Select a playlist.</List.Item>
                                        <List.Item>Click "Add Tracks".</List.Item>
                                        <List.Item>Customize the post text using the Format Options.</List.Item>
                                        <List.Item>Click "Copy to clipboard" to copy the post text.</List.Item>
                                        <List.Item>Paste the text into a post on the GSDJ group page.</List.Item>
                                    </List>
                                    <p>
                                        The app was developed by James Kong as a self-guided
                                        demonstration project to help with learning web development.
                                        The app is written using <a href='https://reactjs.org/'>react</a>
                                        &nbsp;and <a href='https://react.semantic-ui.com/'>semantic-ui-react</a>.
                                    </p>
                                </Modal.Content>
                            </Modal>
                            
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