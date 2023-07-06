const GET_CHANNEL = "channels/GET_CHANNEL";
const CLEAR_STATE = "channels/CLEAR_STATE";

const actionGetChannel = channel => ({
  type: GET_CHANNEL,
  payload: channel
})

export const thunkGetChannel = channelId => async dispatch => {
  const res = await fetch(`/api/channels/${channelId}`);
  const resBody = await res.json();

  if (res.ok) {
    const channel = resBody;
    dispatch(actionGetChannel(channel));
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
    case CLEAR_STATE:
      return { ...initialState }
    default:
      return state;
  }
}