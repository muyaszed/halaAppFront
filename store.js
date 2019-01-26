import { createStore, combineReducers, applyMiddleware } from 'redux';
import restaurantReducer from './app/reducers/restaurantReducer';
import authReducer from './app/reducers/authReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    restaurants: restaurantReducer,
    authentication: authReducer,
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;