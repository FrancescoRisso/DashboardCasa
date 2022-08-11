/*

description:
	The main page of the website
	
state:
	- displaySummer: a boolean to tell if it should be in summer or in winter mode
	
props:
	- 
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- App.css
	- DateTitle
	- Previsioni
	
*/

import React from "react";
import "./App.css";
import MainPage from "./CustomComponents/MainPage";
import Context from "./CustomComponents/Context";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLandscape: window.matchMedia("(orientation: landscape)").matches,
			AdaptiveFontSizeGroups: {}
		};
	}

	componentDidMount = () => {
		window.addEventListener("resize", () => {
			this.setState({ isLandscape: window.matchMedia("(orientation: landscape)").matches });
		});
	};

	registerAdaptiveFontSizeGroup = (name) => {
		this.setState((state) => {
			state.AdaptiveFontSizeGroups[name] = { fontSize: null, instances: {} };
			return { AdaptiveFontSizeGroups: state.AdaptiveFontSizeGroups };
		});
	};

	// registerAdaptiveFontSizeInstancesInGroup = (group, item) => {
	// 	this.setState((state) => {
	// 		state.AdaptiveFontSizeGroups[group].instances = Object.entries(
	// 			state.AdaptiveFontSizeGroups[group].instances
	// 		).map(prev => {
	// 			return [prev[0], prev[1] === null ? state.AdaptiveFontSize[group].fontSize : prev[1]];
	// 		});
	// 		state.AdaptiveFontSizeGroups[group].instances[item] = undefined;
	// 		return { AdaptiveFontSizeGroups: state.AdaptiveFontSizeGroups };
	// 	});
	// };

	// changeAdaptiveFontSizeFont = (group, item, font) => {
	// 	this.setState((state) => {
	// 		state.AdaptiveFontSizeGroups[group].instances[item] = font;
	// 		console.log(Object.entries(state.AdaptiveFontSizeGroups["modal-consumptions"].instances));
	// 		if (Object.values(state.AdaptiveFontSizeGroups[group].instances).filter((x) => x === null).length === 0) {
	// 			state.AdaptiveFontSizeGroups[group].fontSize = Math.min(
	// 				...Object.values(state.AdaptiveFontSizeGroups[group].instances)
	// 			);
	// 			state.AdaptiveFontSizeGroups[group].instances = Object.fromEntries(
	// 				Object.keys(state.AdaptiveFontSizeGroups[group].instances).map((instance) => [instance, null])
	// 			);
	// 		}
	// 		console.log(Object.entries(state.AdaptiveFontSizeGroups["modal-consumptions"].instances));
	// 		return { AdaptiveFontSizeGroups: state.AdaptiveFontSizeGroups };
	// 	});
	// };

	changeAdaptiveFontSizeFont = (group, item, font) => {
		this.setState((state) => {
			state.AdaptiveFontSizeGroups[group].instances[item] = font;
			state.AdaptiveFontSizeGroups[group].fontSize = Math.min(
				...Object.values(state.AdaptiveFontSizeGroups[group].instances)
			);

			return { AdaptiveFontSizeGroups: state.AdaptiveFontSizeGroups };
		});
	};

	render() {
		return (
			<Context.Provider
				value={{
					AdaptiveFontSize: {
						groups: this.state.AdaptiveFontSizeGroups,
						registerGroup: this.registerAdaptiveFontSizeGroup,
						//registerInstanceInGroup: this.registerAdaptiveFontSizeInstancesInGroup,
						changeFont: this.changeAdaptiveFontSizeFont
					}
				}}
			>
				<MainPage orientation={this.state.isLandscape ? "horizontal" : "vertical"} />
			</Context.Provider>
		);
	}
}

export default App;
