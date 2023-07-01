const LOAD_ALL_COMMUNICATIONS = "communications/LOAD_ALL_COMMUNICATIONS"

const actionLoadAllCommunications = (allCommunications) => {
    return {
        type: LOAD_ALL_COMMUNICATIONS,
        payload: allCommunications
    }
}

export const thunkLoadAllCommunications = () => async (dispatch) => {
    const res = await fetch("/api/communications/current");

    if(res.ok) {
        const body = await res.json()
        const normalized_DMs = {};
        for (let user of body.dms) {
            normalized_DMs[user.id] = user
        }

        return dispatch(actionLoadAllCommunications(normalized_DMs))
    } else {
        console.log("Failed res")
    }
}


const initialState = {
    allCommunications: {},
    singleCommunication: {
      messages: {}
    }
}

export default function communicationsReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_ALL_COMMUNICATIONS:
            // make sure to normalize
            return { ...state, allCommunications: action.payload }
        default:
            return state
    }
}
