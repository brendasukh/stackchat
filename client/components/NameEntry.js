import React from 'react'
import store, {nameChanged} from '../store'

export default class NameEntry extends React.Component {

  constructor () {
    super()
    this.state = store.getState()
    this.handleChange = this.handleChange.bind(this)
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
    store.dispatch(nameChanged(event.target.value))
  }
  render () {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={this.handleChange}
        />
      </form>
    )
  }
}
