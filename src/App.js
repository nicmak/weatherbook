import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firstAction } from './Actions/exampleAction';
import { selectedCityAction, finishedCitySelection } from './Actions/searchActions'
import request from 'superagent';
import moment from 'moment';
import _ from 'underscore';

// Components
import Card  from './Components/Card';
import Search  from './Components/Search';
import Dates from './Components/Dates';

//Style
import './Styles/main.css';

const mapStateToProps = (state) => {
  return {
    forecastReceived:state.forecastReducer.forecastReceived,
    forecastStore:state.forecastReducer.selectedForecast,
    selectedCity:state.SearchReducer.selectedCity,
    city:state.SearchReducer.city,
    image:state.SearchReducer.text
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    firstDispatch : () => {
      dispatch(firstAction())
    },
    selectedCity: (city) => {
      dispatch(selectedCityAction(city))
      dispatch(finishedCitySelection())
    },
    sendImage:(text) => {
      dispatch({
        type:'SENDIMAGE',
        text:text
      })
    }
  }
}
 let link = `qHA73Wea8IdSXAIB9lwK7Hggj0vsGLh1`
 let link2 = `KTml5XBAyj7JzMGGFMhZ7wJuYY1eDi77`
 let link3 = `QrfgGRd20zQSJQgbmGVWNYT3cHPfIDgN`


class App extends Component {
  
  placesGoogle = (coordinates) => {
    return request 
    .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&radius=500&key=AIzaSyAvL8yhpdzfhxItMOPcHPq0OGUY-eqqbpM`)
    .then((res, err) => {
      if (res) {
        return JSON.parse(res.text)
      }
      else {
        console.log('couldnt get paces')
      }
    })
  }

  photosGoogle = (photoRef, size) => {
    fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${size}&photoreference=${photoRef}&key=AIzaSyAvL8yhpdzfhxItMOPcHPq0OGUY-eqqbpM`, {
      method:'get'
    })
    .then((res, err) => res.blob())
    .then(blob => {
      this.props.sendImage(URL.createObjectURL(blob))
    })
  }

  queryCity = (value) => {
    let city = encodeURI(value)
    console.log('searchCity', city)
    return request
      .get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=QrfgGRd20zQSJQgbmGVWNYT3cHPfIDgN&q=${city}`)
      .then( async (res, err) => {
        if (res) {
          return JSON.parse(res.text)
        } else {
          console.log('error could not search city', err)
        }
      })
  }

  ForecastCall = (cityID) => {
    return request
      .get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityID}?apikey=QrfgGRd20zQSJQgbmGVWNYT3cHPfIDgN&metric=true`)
      .then((res,err) => {
        if (res) {
          return JSON.parse(res.text)
        } else {
          console.log('error could not get forecast', err)
        }
      })
  }

  convertDate = (dateString) => {
    let newString = dateString.slice(0,10)
    let day = moment(newString).format('dddd');
    return day
  } 

  makeForecastStore = (forecastArray) => {
    let forecastStore = {}
    forecastArray.forEach((day) => {
      let dateKey = this.convertDate(day.Date)
      forecastStore[dateKey] = {
        Day:day.Day,
        Night:day.Night,
        Temp:day.Temperature  
      }
    })
    return forecastStore
  }

  async componentDidMount() {
    this.props.firstDispatch();
    let cityArray = await this.queryCity('Toronto')
    console.log(cityArray,'LOOK')
    this.props.selectedCity(cityArray[0])
  }

  render() {
    const { forecastReceived } = this.props;
    console.log(forecastReceived, 'look')
    return (
      <section className='OuterContainer'>
        <section
          className='imageContainer'
          style={{backgroundImage:`url(${this.props.image}`}}
        >
          <div className='shadowContainer'>
            <div className='AppContainer' style={{padding:'5vw 7vw'}}>
              <Search 
                queryCity = { this.queryCity } 
                ForecastCall = { this.ForecastCall }
                makeForecastStore = { this.makeForecastStore }
                photosGoogle = { this.photosGoogle }
                placesGoogle = { this.placesGoogle }
              />
              <div className='grid-row' style={{paddingLeft:'2vw',background: 'rgba(255, 255, 255, 0.74)',borderRadius: '3vw'}}>
                {
                  !_.isEmpty(this.props.city) && !_.isEmpty(this.props.forecastStore)?
                    <Card
                      city = {this.props.city}
                      forecastStore = {this.props.forecastStore}
                    />
                  :null 
                }
                {
                  !_.isEmpty(this.props.city) ?
                    <Dates/>
                  :null
                }
              </div>
            </div>
          </div>  
        </section>
      </section>
    );
  }
}

App = connect(mapStateToProps,mapDispatchToProps)(App)
export default App;
