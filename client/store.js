import { createStore } from 'redux';


const initialState = {
  messages: [],
  newMessageEntry: ''
};
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

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

const store = createStore(reducer)
export default store;
