import { createStore } from 'redux'


const initialState = {
  messages: []
};
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

export function gotMessagesFromServer (messageArr) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messageArr
  }
}

const reducer = function (prevState = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, prevState, {messages: action.messages});
    default:
      return prevState;
  }
}

const store = createStore(reducer)
export default store;
