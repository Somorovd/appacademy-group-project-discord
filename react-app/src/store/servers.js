const GET_USER_SERVERS = 'servers/GET_USER_SERVERS';
const GET_SINGLE_SERVER = 'servers/GET_SINGLE_SERVER';
const CREATE_SERVER = 'servers/CREATE_SERVER';
const EDIT_SERVER = 'servers/EDIT_SERVER';
const DELETE_SERVER = 'servers/DELETE_SERVER';
const CREATE_CHANNEL = 'servers/CREATE_CHANNEL';
const DELETE_CHANNEL = 'servers/DELETE_CHANNEL';
const GET_ALL_PUBLIC_SERVERS = 'servers/GET_ALL_PUBLIC_SERVERS';
const CLEAR_STATE = "servers/CLEAR_STATE"


const actionGetAllUserServers = servers => ({
  type: GET_USER_SERVERS,
  payload: servers,
});

const actionGetSingleServer = server => ({
  type: GET_SINGLE_SERVER,
  payload: server,
});

const actionCreateServer = server => ({
  type: CREATE_SERVER,
  payload: server,
});

const actionEditServer = server => ({
  type: EDIT_SERVER,
  payload: server,
});

const actionDeleteServer = serverId => ({
  type: DELETE_SERVER,
  payload: serverId,
});

const actionCreateChannel = channel => ({
  type: CREATE_CHANNEL,
  payload: channel,
});
const actionDeleteChannel = channelId => ({
  type: DELETE_CHANNEL,
  payload: channelId,
});

const actionGetAllPublicServers = servers => ({
  type: GET_ALL_PUBLIC_SERVERS,
  payload: servers
})

export const thunkGetAllUserServers = () => async dispatch => {
  const res = await fetch('/api/servers/current');
  const resBody = await res.json();

  if (res.ok) {
    const servers = {};
    for (let server of resBody.servers) {
      servers[server.id] = server;
    }
    dispatch(actionGetAllUserServers(servers));
  }
};

export const thunkGetSingleServer = serverId => async dispatch => {
  const res = await fetch(`/api/servers/${serverId}`);
  const resBody = await res.json();

  if (res.ok) {
    const server = resBody;
    dispatch(actionGetSingleServer(server));
    return server;
  }
};

export const thunkCreateServer = server => async dispatch => {
  const res = await fetch(`/api/servers/new`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(server),
  });
  const resBody = await res.json();

  if (res.ok) {
    const server = resBody;
    dispatch(actionCreateServer(server));
    return server;
  } else if (res.status < 500) {
    if (resBody.errors) {
      return { errors: resBody.errors };
    }
  } else {
    return { errors: ['An error occurred. Please try again.'] };
  }
};

export const thunkEditServer = server => async dispatch => {
  const res = await fetch(`/api/servers/${server.id}/edit`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(server),
  });
  const resBody = await res.json();

  if (res.ok) {
    const server = resBody;
    dispatch(actionEditServer(server));
    return server;
  } else if (res.status < 500) {
    if (resBody.errors) {
      return { errors: resBody.errors };
    }
  } else {
    return { errors: ['An error occurred. Please try again.'] };
  }
};

export const thunkDeleteServer = serverId => async dispatch => {
  const res = await fetch(`/api/servers/${serverId}/delete`, {
    method: 'delete',
  });
  const resBody = await res.json();

  if (res.ok) {
    dispatch(actionDeleteServer(serverId));
    return resBody;
  } else if (res.status < 500) {
    if (resBody.errors) {
      return { errors: resBody.errors };
    }
  } else {
    return { errors: ['An error occurred. Please try again.'] };
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

export const thunkDeleteChannel = channelId => async dispatch => {
  dispatch(actionDeleteChannel(channelId));
};

export const thunkGetAllPublicServers = () => async dispatch => {
  const res = await fetch('/api/servers/discover');

  if (res.ok) {
    const data = await res.json();
    const normalized = {};
    data.servers.forEach(server => {
      normalized[server.id] = server;
    });

    return dispatch(actionGetAllPublicServers(normalized));
  }
}

const actionClearState = () => ({
  type: CLEAR_STATE
})

export const thunkClearState = () => async dispatch => {
  dispatch(actionClearState())
}

const initialState = {
  publicServers: {},
  allUserServers: {},
  singleUserServer: {},
  discoverServers: {}
};

export default function serversReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SERVERS:
      return { ...state, allUserServers: action.payload };
    case GET_SINGLE_SERVER:
      return { ...state, singleUserServer: action.payload };
    case CREATE_SERVER: {
      const allUserServers = {
        ...state.allUserServers,
        [action.payload.id]: action.payload,
      };
      return { ...state, allUserServers, singleUserServer: action.payload };
    }
    case EDIT_SERVER:
      const allUserServers = {
        ...state.allUserServers,
        [action.payload.id]: action.payload,
      };
      const publicServers = {
        ...state.publicServers,
        [action.payload.id]: !action.payload.private
          ? action.payload
          : undefined,
      };
      return {
        ...state,
        allUserServers,
        singleUserServer: action.payload,
        publicServers,
      };
    case DELETE_SERVER:
      const newState = {
        ...state,
        discoverServers: { ...state.discoverServers },
        allUserServers: { ...state.allUserServers },
        singleUserServer: {},
      };
      delete newState.discoverServers[action.payload];
      delete newState.allUserServers[action.payload];
      return newState;
    case CREATE_CHANNEL:
      return {
        ...state,
        singleUserServer: {
          ...state.singleUserServer,
          channels: {
            ...state.singleUserServer.channels,
            [action.payload.id]: action.payload,
          },
        },
      };
    case DELETE_CHANNEL:
      const channels = { ...state.singleUserServer.channels }
      delete channels[action.payload];
      return {
        ...state,
        singleUserServer: {
          ...state.singleUserServer,
          channels
        }
      }
    case GET_ALL_PUBLIC_SERVERS:
      return { ...state, discoverServers: action.payload }
    case CLEAR_STATE:
      return { ...initialState }
    default:
      return state;
  }
}
