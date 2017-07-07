import { combineReducers } from 'redux';
import { SearchReducer } from './SearchReducer';
import { forecastReducer } from './forecastReducer'



export default combineReducers({
  SearchReducer,
  forecastReducer
})