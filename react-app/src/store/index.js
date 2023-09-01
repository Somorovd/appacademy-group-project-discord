import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import communications from './communications';
import servers from './servers';
import channels from './channels';
import messages from './messages';

const CLEAR_ALL = 'app/CLEAR_ALL';

export const clearAll = () => ({
  type: CLEAR_ALL,
  payload: null,
});

const appReducer = combineReducers({
  session,
  communications,
  servers,
  channels,
  messages,
});

const rootReducer = (state, action) => {
  if (action.type === CLEAR_ALL) {
    return appReducer(undefined, action);
  } else {
    return appReducer(state, action);
  }
};

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
