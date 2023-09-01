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
  const resBody = await res.json();

  if (res.ok) {
    const message = res;
    dispatch(actionCreateMessage(message));
    return message;
  } else if (res.status < 500) {
    if (resBody.errors) {
      return { errors: resBody.errors };
    } else {
      return { errors: ['An error occurred. Please try again.'] };
    }
  }
};
