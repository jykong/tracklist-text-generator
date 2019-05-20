import React from 'react'
import ReactDOM from 'react-dom'
import TracksPreview from './TracksPreview'

class Track {
    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
    }
};

const tracks = [
    new Track("shut up", ["Greyson Chance"]),
    new Track("i'm so tired...", ["Lauv, Troye Sivan"]),
    new Track("Honey Whisky", ["SATICA"])
];

const App = () => {
    return (
        <div>
            <TracksPreview tracks={null}/>
            <TracksPreview tracks={[]}/>
            <TracksPreview tracks={tracks} />
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)