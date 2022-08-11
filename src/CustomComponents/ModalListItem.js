/*

description:
	Creates an item in the modal's list
	
props:
	- name: the title to be displayed
	- value: the value for the name
	- recalc: whether the AdaptiveFontSize-s should recalculate
	- fontSizeGroup: the name of the font size group
	
imported into:
	- ModalList
	
dependences:
	- AdaptiveFontSize
	
*/

import React from "react";
import AdaptiveFontSize from "./AdaptiveFontSize";

class ModalListItem extends React.Component {
	render() {
		return (
			<div className="row m-0 fill-primary-light w-100 h-100percent rounded-lg">
				<div className="col-7 h-100percent">
					<AdaptiveFontSize
						text={this.props.name}
						recalc={this.props.recalc}
						className="text-center"
						group={this.props.fontSizeGroup}
					/>
				</div>
				<div className="col-5 h-100percent">
					<AdaptiveFontSize
						text={`${
							typeof this.props.value === "boolean"
								? this.props.value
									? "ON"
									: "OFF"
								: this.props.unit === " kW"
								? this.props.value.toFixed(4)
								: this.props.value.toFixed(1)
						}${this.props.unit}`}
						recalc={this.props.recalc}
						className="text-center"
						group={this.props.fontSizeGroup}
					/>
				</div>
			</div>
		);
	}
}

export default ModalListItem;
