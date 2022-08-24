/*

description:
	A wide title, containing the date and the time
	
state:
	- day: the day of the month
	- month: the number of the mont
	- weekDay: the number of the day in the week
	- hour: the current hour
	- min: the current minute
	
functions:
	- weekDayNumToWord[]: given a week day number, returns its name
	- MonthNumToWord[]: given a month number, returns its name
	- updateClockValues(): updates the state, setting the current time
	- syncWait(): returns the number of milliseconds to be waited to have the clock synced
	- stopClock(): stops the interval that is running the clock
	- groupName: the name of the AdaptiveFontSize group for this component
	- componentDidMount: register the AdaptiveFontSize group
	
imported into:
	- MainPage
	
dependences:
	- CyclicAction
	- AdaptiveFontSize
	- Context
	
*/

import React from "react";
import AdaptiveFontSize from "./AdaptiveFontSize";
import Context from "./Context";
import CyclicAction from "./CyclicAction";

class DateTitle extends React.Component {
	static contextType = Context;

	constructor(props) {
		super(props);
		let date = new Date();
		this.state = {
			day: date.getDate(),
			month: date.getMonth(),
			weekDay: date.getDay(),
			hour: date.getHours(),
			min: date.getMinutes()
		};
	}

	updateClockValues = () => {
		let date = new Date();
		this.setState({
			day: date.getDate(),
			month: date.getMonth(),
			weekDay: date.getDay(),
			hour: date.getHours(),
			min: date.getMinutes()
		});
	};

	syncWait = () => {
		let date = new Date();
		let nextMinute = new Date();
		nextMinute.setMinutes(nextMinute.getMinutes() + 1);
		nextMinute.setMilliseconds(0);
		nextMinute.setSeconds(0);

		return nextMinute - date;
	};

	weekDayNumToWord = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
	monthNumToWord = [
		"Gennaio",
		"Febbraio",
		"Marzo",
		"Aprile",
		"Maggio",
		"Giugno",
		"Luglio",
		"Agosto",
		"Settembre",
		"Ottobre",
		"Novembre",
		"Dicembre"
	];

	groupName = "dateTitle";

	componentDidMount = () => {
		this.context.AdaptiveFontSize.registerGroup(this.groupName);
	};

	render() {
		return (
			<>
				<CyclicAction action={this.updateClockValues} time={60 /* Every minute */} firstWait={this.syncWait} />
				<div className="h-100percent rounded-lg fill-primary px-2">
					<div className="h-100percent align-items-center row">
						<div className="w-100 h-100percent">
							<div className="h-50percent">
								<AdaptiveFontSize
									className="text-center text-white mb-0 bold"
									text={`${this.weekDayNumToWord[this.state.weekDay]} ${this.state.day} ${
										this.monthNumToWord[this.state.month]
									}`}
									group={this.groupName}
								/>
							</div>
							<div className="h-50percent">
								<AdaptiveFontSize
									className="text-center text-white font-percentage mb-0"
									text={`${this.state.hour.toString().padStart(2, "0")}:${this.state.min
										.toString()
										.padStart(2, "0")}`}
									group={this.groupName}
								/>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default DateTitle;
