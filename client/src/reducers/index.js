import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import fileReducer from './fileReducer';
import userReducer from './userReducer';
import uploadReducer from './uploadReducer';
import loaderReducer from './loaderReducer';



const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer,
    loader: loaderReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));