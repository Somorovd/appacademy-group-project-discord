const LOAD_ALL_COMMUNICATIONS = "communications/LOAD_ALL_COMMUNICATIONS"
const LOAD_SINGLE_COMMUNICATION = 'communications/LOAD_SINGLE_COMMUNICATION'

const actionLoadAllCommunications = (allCommunications) => {
    return {
        type: LOAD_ALL_COMMUNICATIONS,
        payload: allCommunications
    }
}

const actionLoadSingleCommunication = (singleCommunication) => {
    return {
        type: LOAD_SINGLE_COMMUNICATION,
        payload: singleCommunication
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

export const thunkLoadSingleCommunication = (communicationId) => async (dispatch) => {
    const res = await fetch(`/api/communications/${communicationId}`)

    if(res.ok) {
        const body = await res.json()
        const normalizedMessages = {}
        body.messages.forEach(message => {
            normalizedMessages[message.id] = message
        })

        return dispatch(actionLoadSingleCommunication({
            communication: body.communication,
            messages: normalizedMessages
        }))

    } else {
        console.log("Failed Load Single Comm")
    }
}


const initialState = {
    allCommunications: {},
    singleCommunication: {
      messages: {},
      communication: {}
    }
}

export default function communicationsReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_ALL_COMMUNICATIONS:
            // make sure to normalize
            return { ...state, allCommunications: action.payload }
        case LOAD_SINGLE_COMMUNICATION:
            return { ...state, singleCommunication: action.payload}
        default:
            return state
    }
}
