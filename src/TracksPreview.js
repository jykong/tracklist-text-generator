import React from 'react'
import { Segment, Table } from 'semantic-ui-react'

class TracksPreview extends React.Component {
    renderContent() {
        if(!this.props.tracks) {
            return (
                <Segment>
                    Loading...
                </Segment>
            );
        }
        if(this.props.tracks.length > 0) {
            return (
                <Table unstackable compact selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Artist</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.tracks.map(track =>
                            <Table.Row key={track.title + track.artist}>
                                <Table.Cell>
                                    {track.title}
                                </Table.Cell>
                                <Table.Cell>
                                    {track.artist}
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            )
        }
        return (
            <Segment>
                <p>No tracks to display.</p>
                <p>Suggestions</p>
                <ul>
                    <li>Add more Source playlists</li>
                    <li>Change or remove Filter playlists</li>
                </ul>
            </Segment>
        );
    }

    render() {
        return (
            <Segment>
                <h3>Tracks Preview</h3>
                {this.renderContent()}
            </Segment>
        );
    }
}

export default TracksPreview;