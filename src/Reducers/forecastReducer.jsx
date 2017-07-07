import moment from 'moment';

let initialState = {
	selectedForecast:{},
  forecastReceived:false,
  selectedDay:moment().format('dddd')
}

export const forecastReducer = ( state = initialState, action) => {
  switch (action.type) {
  	case 'GETTING_FORECAST' : {
  		return {
  			...state,
  			selectedForecast:action.selectedForecast,
  		}
  	}
    case 'RECEIVED_FORECAST': {
      return {
        ...state,
        forecastReceived:action.received
      }
    }
    case 'SELECTED_DAY' : {
      return {
        ...state,
        selectedDay:action.selectedDay
      }
    }
    
  	default:
  	  return state
  }
}