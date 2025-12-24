/*

description:
	
	
state:
	- 
	
props:
	- heating: bool
	- orientation: "horizontal" | "vertical"
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";
import { Link } from "react-router-dom";
import Back from "../../images/back.svg";

class Title extends React.Component {
	horiz = this.props.orientation === "horizontal";

	render() {
		return (
			<div className={`w-100percent rounded-lg fill-primary px-2 h-100percent`}>
				<div className="h-100percent row w-100percent m-0">
					<div className={`h-100percent col-${this.horiz ? 1 : 2}`}>
						<div className={`center-vertically`}>
							<Link to="/">
								<img src={Back} alt="Back" />
							</Link>
						</div>
					</div>
					<div className={`h-100percent col-${this.horiz ? 10 : 8}`}>
						<p
							className="white-text bold text-center center-vertically mb-0"
							style={{ fontSize: this.horiz ? "13vh" : "3.8vh" }}
						>
							{this.props.heating ? "Riscaldamento" : "Raffreddamento"}
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Title;
