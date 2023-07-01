
const GET_USER_SERVERS = "servers/GET_USER_SERVERS";

const actionGetAllUserServers = (servers) => ({
  type: GET_USER_SERVERS,
  payload: servers
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

const initialState = {
  allServers: {},
  allUserServers: {},
  singleUserServer: {}
}

export default function serversReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SERVERS:
      return { ...state, allUserServers: action.payload }
    default:
      return state;
  }
}