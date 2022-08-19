/*

description:
	Shows if a series of parameters are on or off
	
state:
	- values: the array of {"label", "value", "link"} values to be displayed in the modal
	- summary: the summary of all those values to be shown in the dashboard
	- modalOpen: briefly set to true when modal is opened, in order to refresh its
		AdaptiveFontSize-s
	- fontSizeGroup: the name of the group for the font-sizes
	
props:
	- title: the title of the thing
	
functions:
	- updateValues: fetches the values and pushes them to the state
	- doModalOpen: manages the modalOpen value of the state
	
imported into:
	- MainPage
	
dependences:
	- CyclicAction
	- api
	- AdaptiveFontSize
	- Modal
	
*/

import React from "react";
import AdaptiveFontSize from "./AdaptiveFontSize";
import apiCall from "./api";
import CyclicAction from "./CyclicAction";
import Modal from "./Modal";
import Heating from "../images/heating.svg";
import Cooling from "../images/cooling.svg";

class IsOnOff extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			values: null,
			summary: null,
			modalOpen: false
		};
	}

	updateValues = () => {
		apiCall(`/${this.props.title}`)
			.then((data) => {
				if (data === "Error") this.setState({ summary: "Error", values: "Error" });
				else this.setState({ summary: data.shift(), values: data });
			})
			.catch((err) => {
				console.log(err);
				this.setState({ values: "Error", summary: "Error" });
			});
	};

	doModalOpen = () => {
		this.setState({ modalOpen: true }, () => {
			this.setState({ modalOpen: false });
		});
	};

	render() {
		return (
			<>
				<CyclicAction time={60 * 5 /* Every 5 mins */} action={this.updateValues} firstWait={() => null} />
				<Modal
					id={this.props.title}
					title={this.props.title}
					values={this.state.values}
					recalc={this.state.modalOpen}
					unit=""
				/>
				<button
					className="h-100percent w-100 btn btn-primary rounded-lg p-0"
					data-toggle="modal"
					data-target={`#modal-${this.props.title}`}
					onClick={this.doModalOpen}
				>
					<div className="center-vertically h-100percent">
						{this.state.summary === null ? (
							<span className="spinner-border"></span>
						) : (
							<AdaptiveFontSize
								className="text-center mb-0"
								text={`${this.props.title}: ${
									this.state.summary === "Error"
										? "Si è verificato un errore"
										: this.state.summary
										? "ON"
										: "OFF"
								}`}
								group={this.props.fontSizeGroup}
								icon={this.props.title === "Riscaldamento" ? Heating : Cooling}
							/>
						)}
					</div>
				</button>
			</>
		);
	}
}

export default IsOnOff;
