import React from 'react'

class TracksPreview extends React.Component {
    render() {
        if(!this.props.tracks) {
            return <p>Loading...</p>;
        }
        if(this.props.tracks.length > 0) {
            return (
                <div>
                    {this.props.tracks.map(
                        track => <div>{track.title} - {track.artist}</div>
                    )}
                </div>
            );
        }
        return (
            <div>
                <p>No tracks to display.</p>
                <p>Suggestions</p>
                <ul>
                    <li>Add more Source playlists</li>
                    <li>Change or remove Filter playlists</li>
                </ul>
            </div>
        );
    }
}

export default TracksPreview;