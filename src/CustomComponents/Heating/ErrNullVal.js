/*

description:
	
	
state:
	- 
	
props:
	- val: "Error" | null | any
	- ifNull (optional): JSX
	- ifError (optional): JSX
	- ifErrorText (optional): str
	- display: JSX
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";

class ErrNullVal extends React.Component {
	ifNull = this.props.ifNull ?? (
		<span className="text-center col-8 py-auto">
			<div className="center-vertically">
				<div className="spinner-border"></div>
			</div>
		</span>
	);

	ifError = this.props.ifError ?? (
		<span className="text-center col-8 py-auto">
			<div className="center-vertically">{this.props.ifErrorText ?? "Si è verificato un errore"}</div>
		</span>
	);

	render() {
		if (this.props.val === null) return this.ifNull;
		if (this.props.val === "Error") return this.ifError;
		return this.props.display;
	}
}

export default ErrNullVal;
