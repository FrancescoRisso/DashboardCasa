/*

description:
	
	
state:
	- 
	
props:
	- index: int
	- val: str
	- update: (prev_state) => next_state
	- width: str
	- update_override: (plus: bool) => null
	- fontSize (optional): str
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";

class DigitPicker extends React.Component {
	offset_unit = (plus) => {
		if (this.props.index === 0) return plus ? 1 : -1;
		return 0;
	};

	offset_decimal = (plus) => {
		if (this.props.index === 0) return 0;
		return plus ? 1 : -1;
	};

	clamp = (val, min_val, max_val) => Math.min(max_val, Math.max(min_val, val));

	change_val = this.props.update_override
		? this.props.update_override
		: (plus) => {
				this.props.update((prev_state) => {
					const unit = this.clamp(
						parseInt(prev_state.set_temperature.split(".")[0]) + this.offset_unit(plus),
						0,
						99,
					);

					const decimal =
						(parseInt(prev_state.set_temperature.split(".")[1]) + this.offset_decimal(plus)) % 10;

					return { set_temperature: `${unit}.${decimal}` };
				});
		  };

	fontSize = this.props.fontSize ?? "5vh";

	render() {
		return (
			<span className="col-layout my-auto" style={{ width: this.props.width }}>
				<button
					className="btn w-100percent p-0"
					style={{ fontSize: this.fontSize }}
					onClick={() => this.change_val(true)}
				>
					+
				</button>
				<p className="w-100percent mb-0 text-center" style={{ fontSize: this.fontSize }}>
					{this.props.val.split(".")[this.props.index]}
				</p>
				<button
					className="btn w-100percent p-0"
					style={{ fontSize: this.fontSize }}
					onClick={() => this.change_val(false)}
				>
					-
				</button>
			</span>
		);
	}
}

export default DigitPicker;
