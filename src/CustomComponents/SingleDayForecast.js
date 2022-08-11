/*

description:
	Displays the forecasts for a day
	
props:
	- day: the name of the day
	- icon: the link to the icon of the forecast
	- temp: the temperature (either a single string, or an array of two strings for max and min)
	- count: the number of forecasted days
	- fontSizeGroups: an object {"day", "temperatures"} containing the names of the groups for
		the AdaptiveFontSizes
	
functions:
	- componentDidMount: inserts the icon in the container div
	
imported into:
	- Forecasts
	
dependences:
	- AdaptiveFontSize
	- Context
	
*/

import React from "react";
import AdaptiveFontSize from "./AdaptiveFontSize";

class SingleDayForecast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		document.getElementById(`icon-${this.props.day}`).innerHTML = this.props.icon;
	};

	render() {
		return (
			<div className="row m-0 w-100" style={{ height: `${100 / this.props.count}%` }}>
				<div className="col-4 h-100percent">
					<AdaptiveFontSize
						className="center-vertically m-0 text-left text py-auto h-100percent"
						text={`${this.props.day}:`}
						group={this.props.fontSizeGroups.day}
					/>
				</div>
				<div className="col-2 mx-0 h-100percent w-100 p-0">
					<div id={`icon-${this.props.day}`} className="h-100percent w-100"></div>
				</div>
				<div className={"col-6 mx-0 h-100percent"}>
					<AdaptiveFontSize
						className="text-center text-half-big m-0 center-vertically"
						HTMLtext={`<span class="text-blue">${this.props.temp[0]}</span> - <span class="text-red">${this.props.temp[1]}</span>`}
						text={`${this.props.temp[0]} - ${this.props.temp[1]}`}
						group={this.props.fontSizeGroups.temperatures}
					/>
				</div>
			</div>
		);
	}
}

export default SingleDayForecast;
