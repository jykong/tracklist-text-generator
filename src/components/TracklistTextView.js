import React from 'react'
import { Segment, Button, Grid } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class TracklistTextView extends React.Component {
    constructor(props) {
        super(props);
        this.text = React.createRef();
    }

    renderArtists = (artists) => {
        if(!artists || artists.length === 0) return '';
        const artistsQuotes = this.props.controls.artistsQuotes;
        let s = artistsQuotes ? '"' : '';
        for(let i = 0; ; i++) {
            s += artists[i]
            if(i + 1 === artists.length) {
                return artistsQuotes ? s + '"' : s;
            }
            s += ', '
        }
    }

    renderTitle = (title) => {
        if(!title || title === '') return '';
        return this.props.controls.titleQuotes ? '"' + title + '"' : title;
    }

    renderTitleArtist = (track) => {
        switch(this.props.controls.orderFirst) {
            default:
            case 'title':
                return (
                    this.renderTitle(track.title) + ' ' +
                    this.props.controls.delimiter + ' ' +
                    this.renderArtists(track.artists)
                );
            case 'artists':
                return (
                    this.renderArtists(track.artists) + ' ' +
                    this.props.controls.delimiter + ' ' +
                    this.renderTitle(track.title)
                );
        }
    }

    renderNumbering = (i) => {
        switch(this.props.controls.numbering) {
            default:
            case 'none':
                return '';
            case 'dot':
                return i.toString() + '. ';
            case 'parenthesis':
                return i.toString() + ') ';
        }
    }

    renderTracklistText = () => {
        const tracks = this.props.tracks;
        if(!tracks) return '';
        let s = '';
        for(let i = 0; i < tracks.length; i++) {
            s += this.renderNumbering(i + 1);
            s += this.renderTitleArtist(tracks[i]);
            s += '\n'
        }
        if(!this.props.urls) return s;
        this.props.urls.map(url => s += url + '\n')
        return s;
    }

    selectText = () => {
        let node = this.text.current;
        if (document.body.createTextRange) {
            const range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(node);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            console.warn("Could not select text: Unsupported browser.");
        }
    }

    render() {
        return (
            <Segment.Group>
                <Segment>
                    <h3>Top Tracks Post Text</h3>
                </Segment>
                <Segment>
                    <Grid>
                        <Grid.Row centered>
                            <CopyToClipboard text={this.renderTracklistText()}>
                                <Button
                                    icon='copy outline'
                                    labelPosition='left'
                                    content='Copy to clipboard'
                                    onClick={this.selectText}
                                />
                            </CopyToClipboard>
                        </Grid.Row>
                    </Grid>
                    <pre
                        ref={this.text}
                        style={{
                            fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                            overflowX: "auto",
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            minHeight: 150,
                            marginBottom: 0
                        }}
                    >
                        {this.renderTracklistText()}
                    </pre>
                </Segment>
            </Segment.Group>
        );
    }
}

export default TracklistTextView;