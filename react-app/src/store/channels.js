const GET_CHANNEL = 'channels/GET_CHANNEL';
const CREATE_CHANNEL = 'channels/CREATE_CHANNEL';
const EDIT_CHANNEL = 'channels/EDIT_CHANNEL';
const DELETE_CHANNEL = 'channels/DELETE_CHANNEL';
const GET_SINGLE_SERVER = 'servers/GET_SINGLE_SERVER';

const CREATE_MESSAGE = 'messages/CREATE_MESSAGES';
const EDIT_MESSAGE = 'messages/EDIT_MESSAGE';
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE';

const actionGetChannel = channel => ({
  type: GET_CHANNEL,
  payload: channel,
});

const actionCreateChannel = channel => ({
  type: CREATE_CHANNEL,
  payload: channel,
});

const actionEditChannel = channel => ({
  type: EDIT_CHANNEL,
  payload: channel,
});

const actionDeleteChannel = channelId => ({
  type: DELETE_CHANNEL,
  payload: channelId,
});

export const thunkGetChannel = channelId => async dispatch => {
  const res = await fetch(`/api/channels/${channelId}`);
  const resBody = await res.json();

  if (res.ok) {
    const channel = resBody;
    dispatch(actionGetChannel(channel));
  }
};

export const thunkCreateChannel = (channel, serverId) => async dispatch => {
  const res = await fetch(`/api/servers/${serverId}/channels`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(channel),
  });

  const resBody = await res.json();

  if (res.ok) {
    const channel = resBody;
    dispatch(actionCreateChannel(channel));
    return channel;
  } else if (res.status < 500) {
    if (resBody.errors) {
      return { errors: resBody.errors };
    }
  } else {
    return { errors: ['An error occurred. Please try again.'] };
  }
};

export const thunkEditChannel = channel => async dispatch => {
  const res = await fetch(`/api/channels/${channel.id}/edit`, {
    method: 'put',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(channel),
  });
  const resBody = await res.json();

  if (res.ok) {
    const channel = resBody;
    dispatch(actionEditChannel(channel));
    return channel;
  } else if (res.status < 500) {
    if (resBody.errors) {
      return { errors: resBody.errors };
    }
  } else {
    return { errors: ['An error occurred. Please try again.'] };
  }
};

export const thunkDeleteChannel = channelId => async dispatch => {
  const res = await fetch(`/api/channels/${channelId}/delete`, {
    method: 'delete',
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
};

const initialState = { allChannels: {}, singleChannel: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNEL:
      return { ...state, singleChannel: action.payload };
    case CREATE_CHANNEL: {
      const allChannels = {
        ...state.allChannels,
        [action.payload.id]: action.payload,
      };
      const singleChannel = action.payload;
      return { ...state, allChannels, singleChannel };
    }
    case GET_SINGLE_SERVER:
      const allChannels = { ...state.allChannels, ...action.payload.channels };
      return { ...state, allChannels };
    case EDIT_CHANNEL:
      if (state.singleChannel.id === action.payload.id) {
        const singleChannel = { ...state.singleChannel };
        singleChannel.name = action.payload.name;
        return { ...state, singleChannel };
      } else return state;
    case DELETE_CHANNEL: {
      const allChannels = { ...state.allChannels };
      delete allChannels[action.payload.id];
      return { ...state, allChannels, singleChannel: {} };
    }
    case CREATE_MESSAGE: {
      if (state.singleChannel.id !== action.payload.channelId) {
        return state;
      }
      const singleChannel = { ...state.singleChannel };
      singleChannel.messages.unshift(action.payload);
      return { ...state, singleChannel };
    }
    default:
      return state;
  }
}
