/*

description:
	Displays a single value for the electricity dashboard
	
	
props:
	- padding: pt|pb|py, where the padding should be
	- values: an object containing all the data
	- title: the title to be displayed, also the key for values
	- recalc: briefly set to true when modal is opened, in order to refresh its
		AdaptiveFontSize-s
	- fontSizeGroup: the name of the group for the font-sizes
	- updateFontSize: set it to true, then false to force a recalculation of the font sizes
		(to be done when the values change between values and errors)
	- arrange (col|row): whether the items should be arranged in a row or in a column
	
imported into:
	- Electricity
	
dependences:
	- AdaptiveFontSize
	
*/

import React from "react";
import AdaptiveFontSize from "./AdaptiveFontSize";

class ElectricityItem extends React.Component {
	render() {
		return (
			<div
				className={`${this.props.arrange === "col" ? `h-33percent` : `h-100percent col-4 p-0`} ${
					this.props.padding
				}-1`}
			>
				<button
					className={`h-100percent fill-primary-light rounded-lg py-2 btn w-100 ${
						this.props.arrange === "row" ? "px-1" : ""
					}`}
					data-toggle="modal"
					data-target={`#modal-consumptions`}
					onClick={this.props.doModalOpen}
				>
					<AdaptiveFontSize
						className={`h-30percent ${
							this.props.arrange === "col" ? "w-90percent-right" : "w-100percent"
						} text-left`}
						text={`${this.props.title}:`}
						group={this.props.fontSizeGroup}
					/>
					{this.props.values ? (
						<AdaptiveFontSize
							className="h-70percent w-90percent-left text-right"
							text={
								this.props.values !== "Error" &&
								this.props.values.filter((x) => x.label === this.props.title).length !== 0
									? `${this.props.values
											.filter((x) => x.label === this.props.title)[0]
											.value.toFixed(3)
											.replace(".", ",")} kW`
									: "Si è verificato un errore"
							}
							recalc={this.props.updateFontSize}
						/>
					) : (
						<div className="h-70percent w-100">
							<span className="center">
								<span className="spinner-border"></span>
							</span>
						</div>
					)}
				</button>
			</div>
		);
	}
}

export default ElectricityItem;
