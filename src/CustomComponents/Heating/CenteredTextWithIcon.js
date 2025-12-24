/*

description:
	
	
state:
	- 
	
props:
	- text: str
	- icon: str
	- textScale: float
	- imgScale: float
	- textClass (optional): str
	- forceLeft (optional): bool
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";

class CenteredTextWithIcon extends React.Component {
	render() {
		return (
			<span className="h-100percent m-0 row" style={{ justifyContent: this.props.forceLeft ? "left" : "center" }}>
				<img src={this.props.icon} className="my-auto" height={`${this.props.imgScale * 10}vh`} alt="" />
				<p
					className={`text-center my-auto ${this.props.textClass}`}
					style={{ fontSize: `${this.props.textScale}vh`, verticalAlign: "middle" }}
				>
					{this.props.text}
				</p>
			</span>
		);
	}
}

export default CenteredTextWithIcon;
