import React from 'react'
import { Segment, Table, Icon, Button, Header } from 'semantic-ui-react'

class TracksPreview extends React.Component {
    onRemoveTrack = (e, {value}) => {
        this.props.onRemoveTrack(value)
    }

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

    renderTable() {
        const headerCellStyle = {padding: '.5em .5em'};
        const cellStyle = {padding: '.3em .5em'};
        const buttonStyle = {margin: 0};

        return (
            <Table unstackable compact selectable
                style={{border: 'none', 
                    borderTop: '1px solid rgba(34,36,38,.15)',
                    margin: 0
                }}
            >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={8} style={headerCellStyle}>
                            Title
                        </Table.HeaderCell>
                        <Table.HeaderCell width={7} style={headerCellStyle}>
                            Artist
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} style={headerCellStyle}>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.tracks.map(track =>
                        <Table.Row key={track.id}>
                            <Table.Cell width={8}  style={cellStyle}>
                                {track.title}
                            </Table.Cell >
                            <Table.Cell width={7}  style={cellStyle}>
                                {this.renderArtists(track.artists)}
                            </Table.Cell>
                            <Table.Cell width={1} textAlign='right'  style={cellStyle}>
                                {track.type !== 'playlist' ?
                                <Button
                                    icon basic compact
                                    onClick={this.onRemoveTrack}
                                    value={track.id}
                                    style={buttonStyle}
                                >
                                    <Icon
                                        name='remove'
                                        color='grey'
                                        link
                                    />
                                </Button>
                                : ''}
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        )
    }

    render() {
        return (
            <Segment.Group>
                <Segment>
                    <Header as='h3'>
                        Tracklist
                        <Header.Subheader>
                            {this.props.tracks.length} songs
                        </Header.Subheader>
                    </Header>
                </Segment>
                {this.props.tracks.length > 0 ? this.renderTable() : ''}
            </Segment.Group>
        );
    }
}

export default TracksPreview;