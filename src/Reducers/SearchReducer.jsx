let initialState = {
	value:"",
  suggestions:[],
  selectedCity:false,
  city:{}
}

export const SearchReducer = ( state = initialState, action) => {
  switch (action.type) {
  	case 'INPUT_VALUE' : {
  		return {
  			...state,
  			value:action.value,
  		}
  	}
    case 'CURRENT_SUGGESTIONS' : {
      return {
        ...state,
        suggestions:action.suggestions
      }
    }
    case 'SELECTED_CITY' : {
      return {
        ...state,
        city:action.city
      }
    }
    case 'FINISHED_SELECTED_CITY' : {
      return {
        ...state,
        selectedCity:action.selectedCity
      }
    }
    case 'SENDIMAGE': {
      return {
        ...state,
        text:action.text
      }
    }
  	default:
  	  return state
  }
}