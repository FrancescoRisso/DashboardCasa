/*

description:
	
	
state:
	- 
	
props:
	- orientation: "horizontal" | "vertical"
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeatingCoolingPage from "./Heating/HeatingCoolingPage";
import Context from "./Context";

class MyRouter extends React.Component {
	static contextType = Context;

	componentDidMount = () => {
		this.context.AdaptiveFontSize.registerGroup("titles-temperatures-titles");
		this.context.AdaptiveFontSize.registerGroup("titles-temperatures-values");
		this.context.AdaptiveFontSize.registerGroup("titles-onOff");
	};

	render() {
		return (
			<Router>
				<Switch>
					<Route path="/heating">
						<HeatingCoolingPage orientation={this.props.orientation} heating={true} />
					</Route>
					<Route path="/cooling">
						<HeatingCoolingPage orientation={this.props.orientation} heating={false} />
					</Route>
					<Route>
						<MainPage orientation={this.props.orientation} />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default MyRouter;
