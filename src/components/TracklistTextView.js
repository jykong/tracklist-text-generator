import React from 'react'
import { Segment } from 'semantic-ui-react'

class TracklistTextView extends React.Component {
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

    render() {
        return (
            <Segment
                style={{minHeight: 150}}
            >
                <pre style={{
                    fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word"
                }}>
                    {this.renderTracklistText()}
                </pre>
            </Segment>
        );
    }
}

export default TracklistTextView;