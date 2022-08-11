/*

description:
	
	
state:
	- values: the list of values (or null if loading, or "Error" if errors occurred)
	- modalOpen: briefly set to true when modal is opened, in order to refresh its
		AdaptiveFontSize-s
	
props:
	- title: the title to be displayed
	- fontSizeGroup: the name of the group for the font-sizes
	
functions:
	- loadData: retreives the data from the server, and stores it in the state
	- doModalOpen: manages the modalOpen value of the state
	
imported into:
	- MainPage
	
dependences:
	- api
	- CyclicAction
	- AdaptiveFontSize
	- Modal
	
*/

import React from "react";
import apiCall from "./api";
import CyclicAction from "./CyclicAction";
import AdaptiveFontSize from "./AdaptiveFontSize";
import Modal from "./Modal";
import Inside from "../images/inside.svg";
import Outside from "../images/outside2.svg";

class Temperature extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			values: null,
			modalOpen: false
		};
	}

	loadData = () => {
		apiCall(`/temp${this.props.title}`)
			.then((data) => {
				this.setState({ values: data });
			})
			.catch((err) => {
				console.log(err);
				this.setState({ values: "Error" });
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
				<CyclicAction action={this.loadData} time={5 * 60 /* Every 5 mins */} firstWait={() => null} />
				<Modal
					id={this.props.title}
					title={this.props.title}
					values={this.state.values}
					unit="°C"
					recalc={this.state.modalOpen}
				/>

				<button
					className="h-100percent w-100 btn p-0"
					data-toggle="modal"
					data-target={`#modal-${this.props.title}`}
					onClick={this.doModalOpen}
				>
					<div className="my-2 h-100percent">
						<div className="h-100percent">
							<AdaptiveFontSize
								text={`${this.props.title}:`}
								className="mb-0 h-25percent w-90percent-right text-left"
								group={this.props.fontSizeGroup}
								icon={this.props.title === "Interna" ? Inside : Outside}
							/>
							{this.state.values === null ? (
								<span className="spinner-border" />
							) : (
								<AdaptiveFontSize
									text={
										this.state.values === "Error"
											? "Si è verificato un errore"
											: `${this.state.values[0].value.toFixed(1)}°C`
									}
									className="m-0 text-right h-75percent w-90percent-left"
								/>
							)}
						</div>
					</div>
				</button>
			</>
		);
	}
}

export default Temperature;
