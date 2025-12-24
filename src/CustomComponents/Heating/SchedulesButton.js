/*

description:
	
	
state:
	- 
	
props:
	- orientation: "horizontal" | "vertical"
	- open_schedules: () => void
	- heating: bool
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";
import Calendar from "../../images/calendar.svg";
import CenteredTextWithIcon from "./CenteredTextWithIcon";

class SchedulesButton extends React.Component {
	horiz = this.props.orientation === "horizontal";

	render() {
		return (
			<button
				className={`btn w-100percent rounded-lg fill-primary${this.horiz ? "-light" : ""} px-2 h-100percent`}
				onClick={this.props.open_schedules}
			>
				<div className="h-100percent w-90percent center-horizontally m-0">
					<CenteredTextWithIcon
						text="&nbsp;&nbsp;Programmazione"
						icon={Calendar}
						textScale={this.horiz ? 7 : 3.5}
						imgScale={this.horiz ? 7 : 4}
						textClass={this.horiz ? "" : "white-text"}
					/>
				</div>
			</button>
		);
	}
}

export default SchedulesButton;
