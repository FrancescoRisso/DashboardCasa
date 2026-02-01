/*

description:
	Displays a list of key-values inside the modal
	
props:
	- values[]: the array of objects {label, value (,link)} to be displayed
	- unit: the unit of the data in display
	- larger
	
imported into:
	- Modal
	
dependences:
	- ModalListItem
	
*/

import React from "react";
import ModalListItem from "./ModalListItem";

class ModalList extends React.Component {
	render() {
		return this.props.values.map((val, index) => {
			if (val.link)
				return (
					<a
						style={{
							height: `${100 / this.props.values.length}%`,
						}}
						className={`row m-0 w-${
							this.props.centerSmaller ? "50" : "100"
						}percent py-1 no-link-format center-horizontally`}
						target="_blank"
						rel="noopener noreferrer"
						href={val.link}
						key={index}
					>
						<ModalListItem
							name={val.label}
							value={val.value}
							unit={val.unit || this.props.unit}
							larger={this.props.larger}
						/>
					</a>
				);
			else
				return (
					<div
						style={{
							height: `${100 / this.props.values.length}%`,
						}}
						className={`row m-0 w-${
							this.props.centerSmaller ? "50" : "100"
						}percent py-1 center-horizontally`}
						key={index}
					>
						<ModalListItem
							name={val.label}
							value={val.value}
							unit={val.unit || this.props.unit}
							larger={this.props.larger}
						/>
					</div>
				);
		});
	}
}

export default ModalList;
