import React, {Component} from 'react';
import { connect } from 'react-redux';

// weather icons imports
import IconSelector from './IconSelector'

const mapStateToProps = (state) => {
	return {
	  selectedDay:state.forecastReducer.selectedDay
	}
}

class CardIndex extends Component {
  
  maxTemp = () => {
  	const { forecastStore } = this.props;
  	let maxTemp = forecastStore[this.props.selectedDay].Temp.Maximum.Value
  	return 30;
  }

  minTemp = () => {
  	const { forecastStore } = this.props;
    let minTemp = forecastStore[this.props.selectedDay].Temp.Minimum.Value
    return minTemp
  }

	medianTemp = () => {
		let median = Math.round((this.maxTemp() + this.minTemp()) / 2)
		return median
	}

	DayWeatherDescription = () => {
		const { forecastStore } = this.props;
		let description = forecastStore[this.props.selectedDay].Day.IconPhrase
		return description
	}
	render() {
		  console.log(this.props.selectedDay, 'WHO')
      const { city } = this.props;
      console.log(city, 'inside cardindex')
      console.log(this.props.forecastStore, 'insdie cardindex')
		return (
			<section className='CardContainer'>
			  <div className='grid-row'>
			    <div className='location large-6 push-large-2 xs-12'>{`${city.EnglishName}, ${city.AdministrativeArea.ID}`|| `MIAMI`}</div>
			  </div>
			  <div className='grid-row'>
          <div className='temperature large-6 xs-12'>
            <div className='median large-6 push-large-1 xs-12'>
              {this.medianTemp()}&#8451;
             </div>
            <div className='minmax large-6 push-large-1'>
			        {this.minTemp()}&#8451; / {this.maxTemp()}&#8451;
			      </div>
			      <div className='Details large-6 push-large-1 '>
			        ~ {this.DayWeatherDescription()}
			      </div>
          </div>
          <IconSelector
            DayWeatherDescription={this.DayWeatherDescription()}
          />
			  </div>
			  <div className='grid-row'>
			    
			  </div>
			  
			</section>
		)
	}
}
CardIndex = connect(mapStateToProps, null)(CardIndex)
export default CardIndex;


//         </div>