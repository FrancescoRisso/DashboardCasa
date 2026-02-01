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
			bticinoValues: null,
			froniusValues: null,
			values: null,
			modalOpen: false,
			updateFontSize: false,
		};
	}

	componentDidUpdate = (_, prevState) => {
		if (
			prevState.bticinoValues !== this.state.bticinoValues ||
			prevState.froniusValues !== this.state.froniusValues
		) {
			const getNewVal = () => {
				if (this.state.bticinoValues === "Error" || this.state.froniusValues === "Error") return "Error";
				if (this.state.bticinoValues === null && this.state.froniusValues === null) return null;
				if (this.state.bticinoValues === null) return this.state.froniusValues;
				if (this.state.froniusValues === null) return this.state.bticinoValues;
				return { ...this.state.bticinoValues, ...this.state.froniusValues };
			};

			const newVal = getNewVal();

			this.setState({ values: newVal, updateFontSize: true }, () => {
				this.setState({ updateFontSize: false });
			});
		}
	};

	updateFroniusData = () => {
		apiCall("/consumptions/fronius")
			.then((data) => this.setState({ froniusValues: data }))
			.catch((err) => this.setState({ froniusValues: "Error" }));
	};

	updateBticinoData = () => {
		apiCall("/consumptions/bticino")
			.then((data) => this.setState({ bticinoValues: data }))
			.catch((err) => this.setState({ bticinoValues: "Error" }));
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
				<CyclicAction action={this.updateBticinoData} time={60 /* Every min */} firstWait={() => null} />
				<CyclicAction action={this.updateFroniusData} time={1 /* Every sec */} firstWait={() => null} />
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
