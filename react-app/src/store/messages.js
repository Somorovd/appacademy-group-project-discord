const CREATE_MESSAGE = 'messages/CREATE_MESSAGES';

const actionCreateMessage = message => ({
  type: CREATE_MESSAGE,
  payload: message,
});

export const thunkCreateMessage = message => async dispatch => {
  console.log('message thunk');
  const res = await fetch('/api/messages/new', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  dispatch(actionCreateMessage(message));
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      console.log('message reducer');
      return state;
    default:
      return state;
  }
}
