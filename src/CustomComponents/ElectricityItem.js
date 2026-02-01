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
	- altTitle
	
imported into:
	- Electricity
	
dependences:
	- AdaptiveFontSize
	
*/

import React from "react";
import AdaptiveFontSize from "./AdaptiveFontSize";

const choose_name = (vals, title, altTitle) => {
	if (vals === null) return title;
	if (vals === "Error") return title;
	if (Object.keys(vals).includes(title)) return title;

	return altTitle;
};

class ElectricityItem extends React.Component {
	render() {
		const title = choose_name(this.props.values, this.props.title, this.props.altTitle);

		const spinner =
			this.props.values === null ||
			(this.props.values !== "Error" && !Object.keys(this.props.values).includes(title));

		return (
			<div
				className={`${this.props.arrange === "col" ? `h-33percent` : `h-100percent col-6 p-0`} ${
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
						text={`${title}:`}
						group={this.props.fontSizeGroup}
					/>
					{spinner ? (
						<div className="h-70percent w-100">
							<span className="center">
								<span className="spinner-border"></span>
							</span>
						</div>
					) : (
						<AdaptiveFontSize
							className="h-70percent w-90percent-left text-right"
							text={
								this.props.values === "Error"
									? "Si è verificato un errore"
									: `${this.props.values[title].toFixed(3).replace(".", ",")} kW`
							}
							recalc={this.props.updateFontSize}
						/>
					)}
				</button>
			</div>
		);
	}
}

export default ElectricityItem;
