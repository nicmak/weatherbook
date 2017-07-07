export const forecastAction = (forecast) => {
	return {
		type:'GETTING_FORECAST',
		selectedForecast:forecast
	}
}

export const ReceivedAction = () => {
	return {
		type:'RECEIVED_FORECAST',
		received:true
	}
}

export const selectedDayAction = (selectedDay) => {
	return {
		type:'SELECTED_DAY',
			selectedDay:selectedDay
	}
}


