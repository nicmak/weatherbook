import React, {Component} from 'react';
import { connect } from 'react-redux';

import { selectedDayAction } from  '../../Actions/forecastActions'

const mapStateToProps = (state) => {
	return {
		forecastStore:state.forecastReducer.selectedForecast
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    selectDay: (selectedDay) => {
    	dispatch(selectedDayAction(selectedDay))
    }
	}
}

class DatesIndex extends Component {
	render() {
    const { forecastStore } = this.props;
		
		const dateButtons = () => {
			let keyArray = Object.keys(forecastStore)
			console.log(keyArray,'keyArray');
			return keyArray.map((dayKey, index) => (
			  <button 
			    onClick = { () => {this.props.selectDay(dayKey)} }
			    className="button button--primary"
			    style={{outline:'none'}}
			    key={index}
			  >
          {dayKey}
        </button>
			))}
		return (
			<div className='dateButtons grid-row'>
			  <div className='dateButtonsCol large-12 push-large-1'>
			    {dateButtons()}
			  </div>
			</div>
		)
	}
}

DatesIndex = connect(mapStateToProps, mapDispatchToProps)(DatesIndex);
export default DatesIndex;

// <div 
// 			    key={ index }
// 			    className='dateButton large-2 push-large-1'
// 			    onClick = { () => {this.props.selectDay(dayKey)} }
// 			  >
// 			    {dayKey}
// 			  </div>