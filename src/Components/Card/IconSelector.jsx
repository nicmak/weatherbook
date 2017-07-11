import React, { Component } from 'react';
import DrizzleDay from '../weatherIcons/icons/weather-drizzle-day.png';
import Day from './weatherIconsAnimation/animated/day.svg'
import CD from './weatherIconsAnimation/animated/cloudy.svg'
import CD1 from './weatherIconsAnimation/animated/cloudy-day-1.svg'
import CD3 from './weatherIconsAnimation/animated/cloudy-day-3.svg'
import Snow from './weatherIconsAnimation/animated/snowy-1.svg'
import CDShowers from './weatherIconsAnimation/animated/rainy-5.svg'
import CDShowers2 from './weatherIconsAnimation/animated/rainy-3.svg'
import Rain from './weatherIconsAnimation/animated/rainy-7.svg'
import Thunder from './weatherIconsAnimation/animated/thunder.svg'

class IconSelector extends Component {

  chosenIcon = () => {
  	switch(this.props.DayWeatherDescription.toLowerCase()) {
  		case 'sunny':
  		case 'mostly sunny':
  		  return Day
      case 'partly sunny':
      case 'intermittent clouds':
      case 'hazy sunshine':
        return CD1
      case 'mostly cloudy':
        return CD3
      case 'cloudy':
      case 'fog':
        return CD
      case 'showers':
      case 'rain':
        return Rain
      case 'mostly cloudy w/ showers':
        return CDShowers
      case 'partly sunny w/ showers':
        return CDShowers2
      case 't-storms':
      case 'mostly cloudy w/ t-storms':
      case 'partly sunny w/ t-storms':
      case 'thunderstorms':
        return Thunder

      default:
        return false
  	}
  }

	render() {
		return (
      <div className='weatherIcon large-4 pull-large-1 small-12 xs-12' >
        <img src={this.chosenIcon() || Snow }/>
      </div>
		)
	}
}

export default IconSelector;