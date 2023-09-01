const CREATE_MESSAGE = 'messages/CREATE_MESSAGES';
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE';

const actionCreateMessage = message => ({
  type: CREATE_MESSAGE,
  payload: message,
});

const actionDeleteMessage = messageId => ({
  type: DELETE_MESSAGE,
  payload: messageId,
});

export const thunkCreateMessage = message => async dispatch => {
  const res = await fetch('/api/messages/new', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  const resBody = await res.json();

  if (res.ok) {
    const message = resBody.message;
    dispatch(actionCreateMessage(message));
    return message;
  }
};

export const thunkDeleteMessage = messageId => async dispatch => {
  const res = await fetch(`/api/messages/${messageId}/delete`, {
    method: 'delete',
  });
  const resBody = await res.json();

  if (res.ok) {
    dispatch(actionDeleteMessage(messageId));
  }
};
