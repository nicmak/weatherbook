// import logger from 'redux-logger'

import {createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './Reducers/index.jsx';


const middleware = applyMiddleware(thunk, logger)

export default createStore(reducers, middleware);