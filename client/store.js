import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  messages: [],
  newMessageEntry: ''
};
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

export function fetchMessages () {
  return function thunk (dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => dispatch(gotMessagesFromServer(messages)))
  }
}

export function gotMessagesFromServer (messageArr) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messageArr
  }
}

export function writeMessage(messageStr) {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry: messageStr
  }
}

export function gotNewMessageFromServer (message) {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message: message
  }
}

const reducer = function (prevState = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, prevState, {messages: action.messages});
    case WRITE_MESSAGE:
      return Object.assign({}, prevState, {newMessageEntry: action.newMessageEntry});
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return Object.assign({}, prevState, {messages: [...prevState.messages, action.message]});
    default:
      return prevState;
  }
}

const middleware = applyMiddleware(loggerMiddleware, thunkMiddleware);
const store = createStore(reducer, middleware)
export default store;
