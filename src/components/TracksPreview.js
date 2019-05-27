import React from 'react'
import { Segment, Table, Icon, Button } from 'semantic-ui-react'

class TracksPreview extends React.Component {
    renderArtists(artists) {
        let s = ''
        for(let i = 0; ; i++) {
            s += artists[i]
            if(i + 1 === artists.length) {
                return s
            }
            s += ', '
        }
    }

    onRemoveTrack = (e, {value}) => {
        this.props.onRemoveTrack(value)
    }

    render() {
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
                            <Table.HeaderCell width={8}>Title</Table.HeaderCell>
                            <Table.HeaderCell width={7}>Artist</Table.HeaderCell>
                            <Table.HeaderCell width={1}>
                                <Button compact basic onClick={this.props.onClearTracks}>
                                    Clear
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.tracks.map(track =>
                            <Table.Row key={track.id}>
                                <Table.Cell width={8}>
                                    {track.title}
                                </Table.Cell >
                                <Table.Cell width={7}>
                                    {this.renderArtists(track.artists)}
                                </Table.Cell>
                                <Table.Cell width={1} textAlign='right'>
                                    <Button
                                        icon 
                                        basic
                                        compact
                                        onClick={this.onRemoveTrack}
                                        value={track.id}
                                    >
                                        <Icon
                                            name='remove'
                                            color='grey'
                                            link
                                        />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            )
        }
        return (
            <Segment>
                <p>No tracks to display</p>
            </Segment>
        );
    }
}

export default TracksPreview;