/*

description:
	Creates an item in the modal's list
	
props:
	- name: the title to be displayed
	- value: the value for the name
	- larger
	
imported into:
	- ModalList
	
dependences:
	- AdaptiveFontSize
	
*/

import React from "react";

const formatVal = (val, unit) => {
	if (typeof val === "boolean") return val ? "ON" : "OFF";

	switch (unit) {
		case " kW":
			return val.toFixed(3).replace(".", ",");
		case "%":
			return val.toFixed(0).replace(".", ",");
		case "°C":
			return val.toFixed(1).replace(".", ",");
		default:
			break;
	}

	return val;
};

class ModalListItem extends React.Component {
	render() {
		return (
			<div className="row m-0 fill-primary-light w-100 h-100percent rounded-lg">
				<div className="col-7 h-100percent p-0">
					<p
						className="text-center center-vertically mb-0"
						style={{ fontSize: this.props.larger ? "3.4vh" : "2vh" }}
					>
						{this.props.name}
					</p>
				</div>
				<div className="col-5 h-100percent p-0">
					<p
						className="text-center center-vertically mb-0"
						style={{ fontSize: this.props.larger ? "4vh" : "2.3vh" }}
					>
						{formatVal(this.props.value, this.props.unit)}
						{this.props.unit}
					</p>
				</div>
			</div>
		);
	}
}

export default ModalListItem;
