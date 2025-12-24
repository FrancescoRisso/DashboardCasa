/*

description:
	
	
state:
	- day: int
	- on: [bool]
	- invert: () => void
	- orientation: "horizontal" | "vertical"
	
props:
	- 
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";

const color_on = "var(--color-primary)";
const color_off = "#999";

class Day extends React.Component {
	horiz = this.props.orientation === "horizontal";

	day = "LMMGVSD"[this.props.day];

	render() {
		const on = this.props.on[this.props.day];
		const color = on ? color_on : color_off;

		return (
			<button className="btn p-0" style={{ width: this.horiz ? "13%" : "25%" }} onClick={this.props.invert}>
				<svg
					viewBox="0 0 100 100"
					style={{
						position: "auto",
						transform: "none",
						top: 0,
						left: 0,
						maxWidth: "100%",
						maxHeight: "100%",
					}}
				>
					<circle
						cx={50}
						cy={50}
						r={47}
						fill="transparent"
						stroke={color}
						strokeWidth="3px"
						className="hoverable"
					/>
					<text
						x="50%"
						y="50%"
						textAnchor="middle"
						dominantBaseline="central"
						fill={color}
						fontSize={60}
						fontWeight="bold"
						className="hoverable"
					>
						{this.day}
					</text>
				</svg>
			</button>
		);
	}
}

export default Day;
