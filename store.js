import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import restaurantReducer from './app/reducers/restaurantReducer';
import authReducer from './app/reducers/authReducer';
import dialogReducer from './app/reducers/dialogReducer';
import reviewsReducer from './app/reducers/reviewsReducer';
import userReducer from './app/reducers/userReducer';
import bookmarkReducer from './app/reducers/bookmarkReducer';
import listfilterReducer from './app/reducers/listfilterReducer';

const rootReducer = combineReducers({
  restaurants: restaurantReducer,
  authentication: authReducer,
  dialog: dialogReducer,
  reviews: reviewsReducer,
  user: userReducer,
  bookmark: bookmarkReducer,
  filteredList: listfilterReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
