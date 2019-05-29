import React from 'react'
import { Form, Input, Segment } from 'semantic-ui-react'
import TracklistTextView from './TracklistTextView'

class TracklistTextControls extends React.Component {
    state = {
        numbering: 'none',
        delimiter: '-',
        orderFirst: 'title',
        titleQuotes: true,
        artistsQuotes: false
    };

    onNumberingChange = (e, { value }) => this.setState({ numbering: value })
    onOrderFirstChange = (e, { value }) => this.setState({ orderFirst: value })
    onTitleQuotesChange = () => this.setState({ titleQuotes: !this.state.titleQuotes })
    onArtistsQuotesChange = () => this.setState({ artistsQuotes: !this.state.artistsQuotes })
    onDelimiterChange = (e, { value }) => this.setState({ delimiter: value })

    renderNumberingInput = () => {
        return (
            <Form.Group inline>
                <label>
                    Numbering
                </label>
                <Form.Radio
                    label='None'
                    value='none'
                    checked={this.state.numbering === 'none'}
                    onChange={this.onNumberingChange}
                />
                <Form.Radio
                    label='Dot'
                    value='dot'
                    checked={this.state.numbering === 'dot'}
                    onChange={this.onNumberingChange}
                />
                <Form.Radio
                    label='Parenthesis'
                    value='parenthesis'
                    checked={this.state.numbering === 'parenthesis'}
                    onChange={this.onNumberingChange}
                />
            </Form.Group>
        );
    }

    renderOrderFirstInput = () => {
        return (
            <Form.Group inline>
                <label>
                    Ordering
                </label>
                <Form.Radio
                    label='Title First'
                    value='title'
                    checked={this.state.orderFirst === 'title'}
                    onChange={this.onOrderFirstChange}
                />
                <Form.Radio
                    label='Artists First'
                    value='artists'
                    checked={this.state.orderFirst === 'artists'}
                    onChange={this.onOrderFirstChange}
                />
            </Form.Group>
        );
    }

    renderTitleQuotesInput = () => {
        return (
            <Form.Checkbox
                toggle
                label='Title Quotes'
                checked={this.state.titleQuotes}
                onChange={this.onTitleQuotesChange}
            />
        );
    }

    renderArtistsQuotesInput = () => {
        return (
            <Form.Checkbox
                toggle
                label='Artists Quotes'
                checked={this.state.artistsQuotes}
                onChange={this.onArtistsQuotesChange}
            />
        );
    }

    renderDelimiterInput = () => {
        return (
            <Form.Group inline>
                <label>Delimiter</label>
                <Input
                    size='mini'
                    value={this.state.delimiter}
                    onChange={this.onDelimiterChange}
                    style={{maxWidth: 35, maxlength: 2}}
                />
            </Form.Group>
        )
    }

    render() {
        return (
            <div>
                <h2>Tracklist Text</h2>
                <Segment>
                    <Form>
                        {this.renderNumberingInput()}
                        {this.renderOrderFirstInput()}
                        <Form.Group inline>
                            {this.renderTitleQuotesInput()}
                            <br />
                            {this.renderArtistsQuotesInput()}
                        </Form.Group>
                        {this.renderDelimiterInput()}
                    </Form>
                </Segment>
                <TracklistTextView
                    tracks={this.props.tracks}
                    urls={this.props.urls}
                    controls={this.state}
                />
            </div>
        )
    }
}

export default TracklistTextControls;