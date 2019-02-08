import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import restaurantReducer from './app/reducers/restaurantReducer';
import authReducer from './app/reducers/authReducer';
import dialogReducer from './app/reducers/dialogReducer';

const rootReducer = combineReducers({
  restaurants: restaurantReducer,
  authentication: authReducer,
  dialog: dialogReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
