import React, { Component } from 'react'
import store, {writeMessage, gotNewMessageFromServer} from '../store'
import axios from 'axios'
import socket from '../socket'

export default class NewMessageEntry extends Component {
  constructor () {
    super()
    this.state = store.getState()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.unsubscribeFromStore = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount () {
    this.unsubscribeFromStore()
  }

  handleChange (event) {
    store.dispatch(writeMessage(event.target.value))
  }
  handleSubmit (event) {
    event.preventDefault()
    const channelId = this.props.channelId
    const content = this.state.newMessageEntry
    axios.post('/api/messages', { content: content, channelId: channelId })
    .then(res => res.data)
    .then(message => {
      store.dispatch(gotNewMessageFromServer(message));
      socket.emit('new-message', message);
    });

  }
  render () {
    return (
      <form id="new-message-form" onSubmit={ this.handleSubmit }>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessageEntry}
            onChange= { this.handleChange }
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    )
  }
}
