import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket'

const initialState = {
  messages: [],
  newMessageEntry: '',
  nameEntry: ''
};
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const NAME_CHANGED = 'NAME_CHANGED';
export function fetchMessages () {
  return function thunk (dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => dispatch(gotMessagesFromServer(messages)))
  }
}

export function postMessage(content, channelId){
  return function thunk(dispatch){
    return axios.post('/api/messages', { author: initialState.nameEntry, content: content, channelId: channelId })
    .then(res => res.data)
    .then(message => {
      dispatch(gotNewMessageFromServer(message));
      socket.emit('new-message', message);
    });
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

export function nameChanged (name) {
  console.log('here')
  return {
    type: NAME_CHANGED,
    nameEntry: name
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
    case NAME_CHANGED:
      return Object.assign({}, prevState, {nameEntry: action.nameEntry})
    default:
      return prevState;
  }
}

const middleware = applyMiddleware(loggerMiddleware, thunkMiddleware);
const store = createStore(reducer, middleware)
export default store;