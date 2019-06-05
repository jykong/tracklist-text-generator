import React from 'react'
import { Label, List, Modal } from 'semantic-ui-react'

const AboutHelp = () => {
    return (
        <Modal
            closeIcon
            size='small'
            trigger={<Label as='a' basic content='About / Help'/>}
        >
            <Modal.Header>About / Help</Modal.Header>
            <Modal.Content>
                <p>
                    Tracklist Text Generator helps you share your tracks
                    by automatically generating text tracklists from your
                    Spotify playlists.
                </p>
                <p>
                    To use the app, follow these instructions:
                </p>
                <List ordered>
                    <List.Item>Login to Spotify.</List.Item>
                    <List.Item>Select a playlist.</List.Item>
                    <List.Item>Click "Get Tracks".</List.Item>
                    <List.Item>Customize the post text using the Format Options.</List.Item>
                    <List.Item>Click "Copy to clipboard" to copy the tracklist text.</List.Item>
                    <List.Item>Paste the text into a post the share with others.</List.Item>
                </List>
                <p>
                    The app was developed by James Kong as a side project.
                    The app is written using <a href='https://reactjs.org/'>react</a>,
                    &nbsp;<a href='https://react.semantic-ui.com/'>semantic-ui-react</a>, 
                    and <a href='https://github.com/JMPerez/spotify-web-api-js'>spotify-web-api-js</a>.
                </p>
            </Modal.Content>
        </Modal>
    );
}

export default AboutHelp;