import { createStore, combineReducers, applyMiddleware } from 'redux';
import restaurantReducer from './app/reducers/restaurantReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    restaurants: restaurantReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;