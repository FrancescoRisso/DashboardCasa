/*

description:
	Weather forecasts

state:
	- currentWeather: the temperature and the link to the image of the current temperature
	- forecasts: the forecasts for the next days
	- currentWeatherResize: briefly set to true when data is loaded, in order to refresh the displayed
		AdaptiveFontSize for the current temperature
	- forecastsResize: briefly set to true when data is loaded, in order to refresh the displayed
		AdaptiveFontSize-s for the weather forecasts

props:
	- arrange (col|row): whether the items should be arranged in a row or in a column
	
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
			currentWeatherResize: false,
			forecasts: [],
			forecastsResize: false
		};
	}

	loadForecasts = () => {
		apiCall("/weatherNow")
			.then((data) => {
				this.setState({ currentWeather: data, currentWeatherResize: true }, () => {
					this.setState({ currentWeatherResize: false });
				});
			})
			.catch((err) => {
				this.setState({ currentWeather: "Error", currentWeatherResize: true }, () => {
					this.setState({ currentWeatherResize: false });
				});
			});

		apiCall("/weatherForecast")
			.then((data) => {
				this.setState({ forecasts: data, forecastsResize: true }, () => {
					this.setState({ forecastsResize: false });
				});
			})
			.catch((err) => {
				this.setState({ forecasts: "Error", forecastsResize: true }, () => {
					this.setState({ forecastsResize: false });
				});
			});
	};

	componentDidUpdate = () => {
		if (this.state.currentWeather !== null && this.state.currentWeather !== "Error")
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
						<div className={this.props.arrange === "col" ? "h-100percent" : "row m-0 w-100percent h-100percent"}>
							<div
								className={
									this.props.arrange === "col"
										? "py-2 h-40percent"
										: "col-6 p-0 w-100percent h-100percent"
								}
							>
								<div className="h-35percent">
									<AdaptiveFontSize text="Manta" className="text-center" />
								</div>
								<div className="row m-0 px-2 h-65percent">
									<div className="col-6 p-0 h-100percent">
										<div className="h-100percent">
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
												recalc={this.state.currentWeatherResize}
											/>
										)}
									</div>
								</div>
							</div>
							<div
								className={
									this.props.arrange === "col"
										? "py-2 h-60percent px-2"
										: "col-6 p-0 w-100percent h-100percent"
								}
							>
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
											recalc={this.state.forecastsResize}
										/>
									))
								)}
							</div>
						</div>
					</a>
				</>
			);
	}
}

export default Previsioni;
