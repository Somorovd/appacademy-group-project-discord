const LOAD_ALL_COMMUNICATIONS = 'communications/LOAD_ALL_COMMUNICATIONS';
const LOAD_SINGLE_COMMUNICATION = 'communications/LOAD_SINGLE_COMMUNICATION';
const LOAD_ALL_USERS = 'communications/LOAD_ALL_USERS';

const actionLoadAllCommunications = allCommunications => {
  return {
    type: LOAD_ALL_COMMUNICATIONS,
    payload: allCommunications,
  };
};

const actionLoadSingleCommunication = singleCommunication => {
  return {
    type: LOAD_SINGLE_COMMUNICATION,
    payload: singleCommunication,
  };
};

const actionLoadAllUsers = allUsers => {
  return {
    type: LOAD_ALL_USERS,
    payload: allUsers,
  };
};

export const thunkLoadAllCommunications = () => async dispatch => {
  const res = await fetch('/api/communications/current');

  if (res.ok) {
    const body = await res.json();
    const normalized_DMs = {};
    for (let user of body.dms) {
      normalized_DMs[user.id] = user;
    }

    return dispatch(actionLoadAllCommunications(normalized_DMs));
  }
};

export const thunkLoadSingleCommunication =
  communicationId => async dispatch => {
    const res = await fetch(`/api/communications/${communicationId}`);

    if (res.ok) {
      const body = await res.json();
      const normalizedMessages = {};
      body.messages.forEach(message => {
        normalizedMessages[message.id] = message;
      });

      return dispatch(
        actionLoadSingleCommunication({
          communication: body.communication,
          messages: normalizedMessages,
        })
      );
    }
  };

export const thunkLoadAllUsers = () => async dispatch => {
  const res = await fetch('/api/communications/users');

  if (res.ok) {
    const data = await res.json();
    const normalized = {};
    data.users.forEach(user => {
      normalized[user.id] = user;
    });
    return dispatch(actionLoadAllUsers(normalized));
  }
};

export const thunkCreateNewDm = otherUserId => async dispatch => {
  const res = await fetch(`/api/communications/new/${otherUserId}`, {
    method: 'POST',
  });

  if (res.ok) {
    await dispatch(thunkLoadAllCommunications());
    const commId = await res.json();
    return commId.id;
  }
};

const initialState = {
  allCommunications: {},
  singleCommunication: {
    messages: {},
    communication: {},
  },
  allUsers: {},
};

export default function communicationsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_COMMUNICATIONS:
      // make sure to normalize
      return { ...state, allCommunications: action.payload };
    case LOAD_SINGLE_COMMUNICATION:
      return { ...state, singleCommunication: action.payload };
    case LOAD_ALL_USERS:
      return { ...state, allUsers: action.payload };
    default:
      return state;
  }
}
