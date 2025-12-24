/*

description:
	
	
state:
	- 
	
props:
	- on: bool | null | "Error"
	- heating: bool
	- repull_data: () => void
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";
import ErrNullVal from "./ErrNullVal";
import apiCall from "../api";
import CenteredTextWithIcon from "./CenteredTextWithIcon";
import get_icon from "./OnOffIcon";

class HeatingStatus extends React.Component {
	horiz = this.props.orientation === "horizontal";

	render() {
		return (
			<div className="row w-100percent h-100percent m-0">
				<div className="w-100percent h-100percent">
					<button
						className={`btn w-100percent rounded-lg fill-primary${
							this.horiz ? "-light" : " white-text"
						} px-2 h-100percent`}
						onClick={() => {
							apiCall("/toggleHeating");
							this.props.repull_data();

							[0, 10, 100, 1000, 5_000, 10_000].forEach((delay) =>
								setTimeout(() => this.props.repull_data(), delay),
							);
						}}
					>
						<ErrNullVal
							val={this.props.on}
							display={
								this.props.on && (
									<CenteredTextWithIcon
										text={this.props.on.activated ? "ON (spegni)" : "OFF (accendi)"}
										icon={get_icon(this.props.heating, this.props.on?.activated)}
										textScale={this.horiz ? 7 : 3.5}
										imgScale={this.horiz ? 9 : 6}
									/>
								)
							}
						/>
					</button>
				</div>
			</div>
		);
	}
}

export default HeatingStatus;
