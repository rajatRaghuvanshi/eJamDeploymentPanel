import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import templateReducer from './redux/templateReducer';
import deployReducer from './redux/deployReducer';

const mainReducer = combineReducers({
    template: templateReducer,
    deploy: deployReducer
})


const store = createStore(mainReducer, applyMiddleware(thunk));

export default store;
