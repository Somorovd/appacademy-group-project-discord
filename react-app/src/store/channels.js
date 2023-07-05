const GET_CHANNEL = "channels/GET_CHANNEL";

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

const initialState = { singleChannel: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNEL:
      return { ...state, singleChannel: action.payload };
    default:
      return state;
  }
}