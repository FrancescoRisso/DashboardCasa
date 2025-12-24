/*

description:
	Creates the main page, handling wheter the horizontal and vertical layouts
	
props:
	- this.props.orientation: horizontal|vertical

functions:
	- componentDidMount: registers the AdaptiveFontSize groups
	
imported into:
	- App
	
dependences:
	- DateTitle
	- Forecasts
	- Temperature
	- IsOnOff
	- Symbols
	- Electricity
	- Context
	
*/

import React from "react";
import DateTitle from "./DateTitle";
import Forecasts from "./Forecasts";
import Temperature from "./Temperature";
import Symbols from "./Symbols";
import Electricity from "./Electricity";
import Context from "./Context";
import AdaptiveFontSize from "./AdaptiveFontSize";
import Heating from "../images/heating.svg";
import Cooling from "../images/cooling.svg";
import { Link } from "react-router-dom";

const pages = [
	{ name: "Riscaldamento", link: "/heating" },
	{ name: "Raffreddamento", link: "/cooling" },
];

class MainPage extends React.Component {
	static contextType = Context;

	constructor(props) {
		super(props);
		this.state = {
			updateFontSize: false,
		};
	}

	render() {
		if (this.props.orientation === "horizontal")
			return (
				<div className="container-fluid vh-100">
					<div className="py-2 h-30">
						<DateTitle />
					</div>
					<div className="row m-0 h-55">
						<div className="px-0 col-4 h-100percent pr-1">
							<div className="h-50percent pb-1">
								<div className="h-100percent fill-primary-light rounded-lg">
									<Temperature
										title="Interna"
										fontSizeGroupTitles="titles-temperatures-titles"
										fontSizeGroupValues="titles-temperatures-values"
									/>
								</div>
							</div>
							<div className="h-50percent pt-1">
								<div className="h-100percent fill-primary-light rounded-lg">
									<Temperature
										title="Esterna"
										fontSizeGroupTitles="titles-temperatures-titles"
										fontSizeGroupValues="titles-temperatures-values"
									/>
								</div>
							</div>
						</div>
						<div className="px-0 col-4 h-100percent">
							<div className="mx-1 h-100percent fill-primary-light rounded-lg">
								<Forecasts arrange="col" />
							</div>
						</div>
						<div className="px-0 pl-1 col-4 h-100percent">
							<Electricity arrange="col" />
						</div>
					</div>
					<div className="row py-2 mx-auto h-15">
						{pages.map((page) => (
							<div className="col-6 m-0 p-0 pr-1 h-100percent" key={page.name}>
								<Link to={page.link}>
									<button className="w-100percent h-100percent btn btn-primary">
										<AdaptiveFontSize
											className="text-center mb-0"
											text={page.name}
											group={"titles-onOff"}
											icon={page.name === "Riscaldamento" ? Heating : Cooling}
											recalc={this.state.updateFontSize}
										/>
									</button>
								</Link>
							</div>
						))}
					</div>
					<Symbols />
				</div>
			);
		// return <p>La pagina verticale arriverà in futuro</p>;
		return (
			<div className="container-fluid vh-100">
				<div className="py-2 h-20">
					<DateTitle />
				</div>
				<div className="h-60">
					<div className="h-33percent pb-1 row w-100percent m-0">
						<div className="col-6 h-100percent p-0 pr-1">
							<div className="fill-primary-light rounded-lg h-100percent">
								<Temperature
									title="Interna"
									fontSizeGroupTitles="titles-temperatures-titles"
									fontSizeGroupValues="titles-temperatures-values"
								/>
							</div>
						</div>
						<div className="col-6 h-100percent p-0 pl-1">
							<div className="fill-primary-light rounded-lg h-100percent">
								<Temperature
									title="Esterna"
									fontSizeGroupTitles="titles-temperatures-titles"
									fontSizeGroupValues="titles-temperatures-values"
								/>
							</div>
						</div>
					</div>

					<div className="h-33percent py-1 w-100percent m-0">
						<div className="h-100percent fill-primary-light rounded-lg">
							<Forecasts arrange="row" />
						</div>
					</div>

					<div className="h-33percent pt-1 w-100percent m-0">
						<Electricity arrange="row" />
					</div>
				</div>
				<div className="py-2 mx-auto h-20">
					{pages.map((page) => (
						<div className="m-0 p-0 pb-1 h-50percent" key={page.name}>
							<Link to={page.link}>
								<button className="w-100percent h-100percent btn btn-primary">
									<AdaptiveFontSize
										className="text-center mb-0"
										text={page.name}
										group={"titles-onOff"}
										icon={page.name === "Riscaldamento" ? Heating : Cooling}
										recalc={this.state.updateFontSize}
									/>
								</button>
							</Link>
						</div>
					))}
				</div>
				<Symbols />
			</div>
		);
	}
}

export default MainPage;
