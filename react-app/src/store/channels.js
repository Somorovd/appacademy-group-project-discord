const GET_CHANNEL = "channels/GET_CHANNEL";
const DELETE_CHANNEL = "channels/DELETE_CHANNEL";
const CLEAR_STATE = "channels/CLEAR_STATE";

const actionGetChannel = channel => ({
  type: GET_CHANNEL,
  payload: channel
})

const actionDeleteChannel = channelId => ({
  type: DELETE_CHANNEL,
  payload: channelId
})

export const thunkGetChannel = channelId => async dispatch => {
  const res = await fetch(`/api/channels/${channelId}`);
  const resBody = await res.json();

  if (res.ok) {
    const channel = resBody;
    dispatch(actionGetChannel(channel));
  }
}

export const thunkDeleteChannel = channelId => async dispatch => {
  const res = await fetch(`/api/channels/${channelId}/delete`, {
    method: "delete"
  });

  const resBody = await res.json();

  if (res.ok) {
    dispatch(actionDeleteChannel(channelId));
    return resBody;
  } else if (res.status < 500) {
    if (resBody.errors) {
      return { errors: resBody.errors };
    }
  } else {
    return { errors: ['An error occurred. Please try again.'] };
  }
}

const actionClearState = () => ({
  type: CLEAR_STATE
})

export const thunkClearState = () => async dispatch => {
  dispatch(actionClearState())
}

const initialState = { singleChannel: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNEL:
      return { ...state, singleChannel: action.payload };
    case DELETE_CHANNEL:
      if (state.singleChannel.id === action.payload)
        return { ...initialState };
      else return state;
    case CLEAR_STATE:
      return { ...initialState }
    default:
      return state;
  }
}