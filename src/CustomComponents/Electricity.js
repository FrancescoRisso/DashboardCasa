/*

description:
	A dashboard for displaying info about the energy consumption
	
state:
	- values: an array of {"label", "value"} that holds the data, or "Error", or null if data
		is not loaded yet
	- modalOpen: briefly set to true when modal is opened, in order to refresh its
		AdaptiveFontSize-s
	
functions:
	- updateData: retreives the data from the server, and stores it in the state
	- doModalOpen: manages the modalOpen value of the state
	- componentDidMount: registers the AdaptiveFontSize group
	
imported into:
	- MainPage
	
dependences:
	- api
	- ElectricityItem
	- CyclicAction
	- Modal
	- Context
	
*/

import React from "react";
import apiCall from "./api";
import Context from "./Context";
import CyclicAction from "./CyclicAction";
import ElectricityItem from "./ElectricityItem";
import Modal from "./Modal";

class Electricity extends React.Component {
	static contextType = Context;

	constructor(props) {
		super(props);
		this.state = {
			values: null,
			modalOpen: false
		};
	}

	updateData = () => {
		apiCall("/consumptions")
			.then((data) => {
				this.setState({ values: data });
			})
			.catch((err) => {
				this.setState({ values: "Error" });
			});
	};

	doModalOpen = () => {
		this.setState({ modalOpen: true }, () => {
			this.setState({ modalOpen: false });
		});
	};

	componentDidMount = () => {
		this.context.AdaptiveFontSize.registerGroup("titles-consumptions");
	};

	render() {
		return (
			<>
				<CyclicAction action={this.updateData} time={60 /* Every min */} firstWait={() => null} />
				<Modal
					id="consumptions"
					title="Consumi elettrici"
					recalc={this.state.modalOpen}
					values={this.state.values}
					unit=" kW"
				/>
				<ElectricityItem
					padding="pb"
					title="Produzione fotovoltaico"
					values={this.state.values}
					doModalOpen={this.doModalOpen}
					fontSizeGroup="titles-consumptions"
				/>
				<ElectricityItem
					padding="py"
					title="Consumo totale"
					values={this.state.values}
					doModalOpen={this.doModalOpen}
					fontSizeGroup="titles-consumptions"
				/>
				<ElectricityItem
					padding="pt"
					title={
						this.state.values &&
						this.state.values.filter((x) => x.label === "Immessa in rete") &&
						this.state.values.filter((x) => x.label === "Immessa in rete").length > 0 &&
						this.state.values.filter((x) => x.label === "Immessa in rete")[0].value > 0
							? "Immessa in rete"
							: "Comprata dall'ENEL"
					}
					values={this.state.values}
					doModalOpen={this.doModalOpen}
					fontSizeGroup="titles-consumptions"
				/>
			</>
		);
	}
}

export default Electricity;
