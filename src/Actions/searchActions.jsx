export const searchAction = (value) => {
	return {
		type:'INPUT_VALUE',
		value:value
	}
}

export const suggestionAction = (array) => {
	return {
		type:'CURRENT_SUGGESTIONS',
		suggestions:array
	}
}

export const selectedCityAction = (city) => {
	return {
		type:'SELECTED_CITY',
		city:city
	}
}

export const finishedCitySelection = () => {
	return {
		type:'FINISHED_SELECTED_CITY',
		selectedCity:true
	}
}