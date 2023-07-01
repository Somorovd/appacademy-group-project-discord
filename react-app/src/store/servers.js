
const GET_USER_SERVERS = "servers/GET_USER_SERVERS";
const GET_SINGLE_SERVER = "servers/GET_SINGLE_SERVER"

const actionGetAllUserServers = (servers) => ({
  type: GET_USER_SERVERS,
  payload: servers
})

const actionGetSingleServer = (server) => ({
  type: GET_SINGLE_SERVER,
  payload: server
})

export const thunkGetAllUserServers = () => async (dispatch) => {
  const res = await fetch("/api/servers/current");
  const resBody = await res.json();

  if (res.ok) {
    const servers = {}
    for (let server of resBody.servers) {
      servers[server.id] = server;
    }
    dispatch(actionGetAllUserServers(servers));
  }
}

export const thunkGetSingleServer = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}`);
  const resBody = await res.json();

  if (res.ok) {
    const server = resBody;
    dispatch(actionGetSingleServer(server));
  }
}

const initialState = {
  allServers: {},
  allUserServers: {},
  singleUserServer: {}
}

export default function serversReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SERVERS:
      return { ...state, allUserServers: action.payload }
    case GET_SINGLE_SERVER:
      return { ...state, singleUserServer: action.payload }
    default:
      return state;
  }
}