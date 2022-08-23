/*

description:
	
	
state:
	- values: the list of values (or null if loading, or "Error" if errors occurred)
	- modalOpen: briefly set to true when modal is opened, in order to refresh its
		AdaptiveFontSize-s
	- updateFontSize: briefly set to true when data is loaded, in order to refresh the displayed
		AdaptiveFontSize-s
	
props:
	- title: the title to be displayed
	- fontSizeGroupTitles: the name of the group for the font-sizes
	- fontSizeGroupValues: the name of the group for the font-sizes
	
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
			modalOpen: false,
			updateFontSize: false
		};
	}

	loadData = () => {
		apiCall(`/temp${this.props.title}`)
			.then((data) => {
				if (this.state.values !== "Error") this.setState({ values: data });
				else
					this.setState({ values: data, updateFontSize: true }, () => {
						this.setState({ updateFontSize: false });
					});
			})
			.catch((err) => {
				if (this.state.values !== "Error")
					this.setState({ values: "Error", updateFontSize: true }, () => {
						this.setState({ updateFontSize: false });
					});
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
								group={this.props.fontSizeGroupTitles}
								icon={this.props.title === "Interna" ? Inside : Outside}
							/>
							{this.state.values === null ? (
								<span className="spinner-border" />
							) : (
								<AdaptiveFontSize
									text={
										this.state.values === "Error"
											? "Si è verificato un errore"
											: `${this.state.values[0].value.toFixed(1).replace(".", ",")}°C`
									}
									className="m-0 text-right h-75percent w-90percent-left"
									group={this.props.fontSizeGroupValues}
									recalc={this.state.updateFontSize}
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
