/*

description:
	A dashboard for displaying info about the energy consumption
	
state:
	- values: an array of {"label", "value"} that holds the data, or "Error", or null if data
		is not loaded yet
	- modalOpen: briefly set to true when modal is opened, in order to refresh its
		AdaptiveFontSize-s
	- updateFontSize: briefly set to true when data is loaded, in order to refresh the displayed
		AdaptiveFontSize-s

props:
	- arrange (col|row): whether the items should be arranged in a row or in a column
	
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
			modalOpen: false,
			updateFontSize: false,
		};
	}

	updateData = () => {
		apiCall("/consumptions")
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
					alwaysVertical={this.props.arrange === "row"}
					energyModal={true}
				/>
				<div className={`h-50percent row m-0 pb-1`}>
					<ElectricityItem
						padding={"pr"}
						title="Prodotta fotovoltaico"
						values={this.state.values}
						doModalOpen={this.doModalOpen}
						fontSizeGroup="titles-consumptions"
						updateFontSize={this.state.updateFontSize}
						arrange={"row"}
					/>
					<ElectricityItem
						padding={"pl"}
						title="Consumo totale"
						values={this.state.values}
						doModalOpen={this.doModalOpen}
						fontSizeGroup="titles-consumptions"
						updateFontSize={this.state.updateFontSize}
						arrange={"row"}
					/>
				</div>
				<div className={`h-50percent row m-0 pt-1`}>
					<ElectricityItem
						padding={"pr"}
						title="Comprata da rete"
						altTitle="Venduta in rete"
						values={this.state.values}
						doModalOpen={this.doModalOpen}
						fontSizeGroup="titles-consumptions"
						updateFontSize={this.state.updateFontSize}
						arrange={"row"}
					/>
					<ElectricityItem
						padding={"pl"}
						title="Consumo da batteria"
						altTitle="Immessa in batteria"
						values={this.state.values}
						doModalOpen={this.doModalOpen}
						fontSizeGroup="titles-consumptions"
						updateFontSize={this.state.updateFontSize}
						arrange={"row"}
					/>
				</div>
			</>
		);
	}
}

export default Electricity;
