/*

description:
	Weather forecasts

state:
	- currentWeather: the temperature and the link to the image of the current temperature
	- forecasts: the forecasts for the next days
	
functions:
	- apiCall(): calls an API and returns the result
	- componentDidMount(): fetches the current and forecasted weather and creates the groups
		for the AdaptiveFontSizes
	
imported into:
	- MainPage
	
dependences:
	- SingleDayForecast
	- CyclicAction
	- api
	- AdaptiveFontSize
	- Context
	
*/

import React from "react";
import CyclicAction from "./CyclicAction";
import SingleDayForecast from "./SingleDayForecast";
import apiCall from "./api";
import AdaptiveFontSize from "./AdaptiveFontSize";
import Context from "./Context";

class Previsioni extends React.Component {
	static contextType = Context;

	constructor(props) {
		super(props);
		this.state = {
			currentWeather: null,
			forecasts: []
		};
	}

	loadForecasts = () => {
		apiCall("/weatherNow")
			.then((data) => {
				this.setState({ currentWeather: data });
			})
			.catch((err) => {
				this.setState({ currentWeather: "Error" });
			});

		apiCall("/weatherForecast")
			.then((data) => {
				this.setState({ forecasts: data });
			})
			.catch((err) => {
				console.log(err);
				this.setState({ forecasts: "Error" });
			});
	};

	componentDidUpdate = () => {
		if (this.state.currentWeather !== null)
			document.getElementById("forecast-now").innerHTML = this.state.currentWeather.icon;
	};

	componentDidMount = () => {
		this.context.AdaptiveFontSize.registerGroup("forecasts-days");
		this.context.AdaptiveFontSize.registerGroup("forecasts-temperatures");
	};

	render() {
		if (true)
			return (
				<>
					<CyclicAction action={this.loadForecasts} firstWait={() => null} time={60 * 60 /* Every hour */} />
					<a
						href="https://www.3bmeteo.com/meteo/manta"
						className="no-link-format"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="h-40percent py-2">
							<div className="row m-0 px-2 h-100percent">
								<div className="col-6 p-0 h-100percent">
									<div className="h-35percent">
										<AdaptiveFontSize text="Manta" className="text-center" />
									</div>
									<div className="h-65percent">
										<div id="forecast-now" className="h-100percent" />
									</div>
								</div>
								<div className="col-6 p-0 h-100percent">
									{this.state.currentWeather === null ? (
										<span className="text-center col-8 py-auto">
											<div className="center-vertically">
												<div className="spinner-border"></div>
											</div>
										</span>
									) : (
										<AdaptiveFontSize
											text={
												this.state.currentWeather === "Error"
													? "Si è verificato un errore"
													: this.state.currentWeather.temperature
											}
											className="text-center"
										/>
									)}
								</div>
							</div>
						</div>
						<div className="h-60percent py-2">
							{this.state.forecasts === "Error" ? (
								<p className="text-center col-12">Si è verificato un errore.</p>
							) : (
								this.state.forecasts.map((day) => (
									<SingleDayForecast
										day={day.day}
										icon={day.icon}
										temp={[day.minTemp, day.maxTemp]}
										count={this.state.forecasts.length}
										key={day.day}
										fontSizeGroups={{
											day: "forecasts-days",
											temperatures: "forecasts-temperatures"
										}}
									/>
								))
							)}
						</div>
					</a>
				</>
			);
	}
}

export default Previsioni;