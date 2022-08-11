/*

description:
	A component that cyclically repeats an action.
	When the page is not visible, the cycle is stopped, and gets restarted when the page is visible again
	
state:
	- clockInterval: the interval item, to be used to stop the cyclic action
	
props:
	- time: the time in seconds between an execution and the next
	- action: the function to be called periodically
	- firstWait: a function to return the number of milliseconds to be waited before starting the clock
		(an action is executed before waiting that time). Please make it return null if this behavior is
		not desired, or the action will be executed twice
	
functions:
	- update: given if the component is visible or not, starts or stops the timer
	- componentDidMount: set component visible
	- componentWillUnmount: set component invisible
	
imported into:
	- DateTitle
	- Temperature
	- Forecasts
	- IsOnOff
	- Electricity
	
dependences:
	- PageVisibility
	
*/

import React from "react";
import PageVisibility from "react-page-visibility";

class CyclicAction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clockInterval: null
		};
	}

	update = (isVisible) => {
		if (isVisible) {
			if (this.props.firstWait() !== null) this.props.action();
			setTimeout(() => {
				this.props.action();
				let clockInterval = setInterval(this.props.action, this.props.time * 1000);
				this.setState({ clockInterval });
			}, this.props.firstWait());
		} else clearInterval(this.state.clockInterval);
	};

	componentDidMount = () => {
		this.update(true);
	};

	componentWillUnmount = () => {
		this.update(false);
	};

	render() {
		return (
			<PageVisibility
				onChange={(isVisible) => {
					this.update(isVisible);
				}}
			/>
		);
	}
}

export default CyclicAction;
