import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import theme from './searchTheme.css'

//Actions
import { searchAction, suggestionAction, selectedCityAction } from '../../Actions/searchActions';
import { forecastAction, ReceivedAction } from '../../Actions/forecastActions';

const mapStateToProps = (state) => {
	return {
		value : state.SearchReducer.value,
		suggestions : state.SearchReducer.suggestions,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		sendInput : (value) => {
			dispatch(searchAction(value))
		},
		sendSuggestions : (suggestionArray) => {
			dispatch(suggestionAction(suggestionArray))
		},
		selectForecast: (forecast) => {
			dispatch(forecastAction(forecast))
			dispatch(ReceivedAction())
		},
		selectedCity: (city) => {
			dispatch(selectedCityAction(city))
		}
	}
}

class SearchIndex extends Component {
	
  getSuggestionValue =  (suggestion) => {
  	console.log('suggestion', suggestion)
    this.props.selectedCity(suggestion)
  	this.getForecast(suggestion.Key, `${suggestion.GeoPosition.Latitude},${suggestion.GeoPosition.Longitude} `)

		return (
			`${suggestion.EnglishName}, ${suggestion.AdministrativeArea.EnglishName}`
		)
	}

	getForecast = async (cityID, coordinates) => {
		let forecast = await this.props.ForecastCall(cityID);
		let forecastStore = this.props.makeForecastStore(forecast.DailyForecasts);
		console.log('newStore', forecastStore);
		this.props.selectForecast(forecastStore);
		let cityArray = await this.props.placesGoogle(coordinates)
    console.log(cityArray, 'cityArray')
    let photoRef = await this.props.photosGoogle(cityArray.results[0].photos[0].photo_reference, cityArray.results[0].photos[0].width)

	}


//-----------------------------------------------
	// Use your imagination to render suggestions.
	// basically how you want to display your suggestions/content
	renderSuggestion = suggestion => {
	return (
	  <div>
	    {`${suggestion.EnglishName}, ${suggestion.AdministrativeArea.EnglishName} - ${suggestion.Country.EnglishName}`}
	  </div>
	)};

	onSuggestionsFetchRequested = ({ value }) => {
		console.log('suggestionFetch')
		console.log(value,'inside suggestionFetch')
	  
		//the async function api call should be done here
		//cannot be done here, cannot use async await
    // this.props.sendSuggestions(this.getSuggestions(value))
	}

//AutoSuggest will call this function every time you clear suggestions
  onSuggestionsClearRequested = () => {
  	console.log('suggestionCleared')
  	this.props.sendSuggestions([])
  }

  onChange = async (event, { newValue }) => {
    const { sendInput, sendSuggestions } = this.props;
    sendInput(newValue)
    if (newValue.length >= 4 && newValue.slice(-1) !== " ") {
      let results = await this.props.queryCity(newValue);
		  sendSuggestions(results)
    }
  }

  componentDidMount() {
    this.getForecast(55488,'43.633,-79.354');
  }

	render() {
		const { value, suggestions } = this.props; 
		const inputProps = {
	    placeholder: 'Search For A City',
	    value,
	    onChange: this.onChange,
	  };
		return (
			<div className='grid-row'>
			  <div className='search large-4 push-large-2'>
			    <Autosuggest
			      suggestions={suggestions}
			      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
			    />
			  </div>
			</div>
		)
	}
}

SearchIndex = connect(mapStateToProps, mapDispatchToProps)(SearchIndex);
export default SearchIndex;