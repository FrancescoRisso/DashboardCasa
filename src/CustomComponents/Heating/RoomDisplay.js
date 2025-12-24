/*

description:
	
	
state:
	- 
	
props:
	- heating: bool
	- data: {room: str, current_temp: str, target_temp: str, is_on: bool}
	- first: bool
	- last: bool
	- widht: float
	- reload_data: () => void
	- index: int
	- orientation: "horizontal" | "vertical"

functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";
import Pencil from "../../images/pencil.svg";
import Thermometer from "../../images/thermometer.svg";
import ThermometerArrow from "../../images/thermometer-arrow.svg";
import CenteredTextWithIcon from "./CenteredTextWithIcon";
import SimpleModal from "./SimpleModal";
import DigitPicker from "./DigitPicker";
import apiCall from "../api";
import get_icon from "./OnOffIcon";

class RoomDisplay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modal_open: false,
			set_temperature: props.data.target_temp,
		};

		this.setState = this.setState.bind(this);
	}

	horiz = this.props.orientation === "horizontal";

	margin_dirs = (this.horiz ? "l" : "t", this.horiz ? "r" : "b");
	margin_dim = (this.props.first ? 0 : 1, this.props.last ? 0 : 1);

	margin = [
		[this.horiz ? "l" : "t", this.props.first ? 0 : 1],
		[this.horiz ? "r" : "b", this.props.last ? 0 : 1],
	]
		.map((margin) => `p${margin[0]}-${margin[1]}`)
		.join(" ");

	room_name_font_size = this.horiz ? 5.5 : 3.4;
	temp_font_size = this.horiz ? 4 : 2.5;
	temp_icon_size = this.horiz ? 4 : 3;

	render() {
		return (
			<div className={`${this.horiz ? "w" : "h"}-${this.props.width}percent ${this.margin}`}>
				<SimpleModal
					visible={this.state.modal_open}
					title={this.props.data.room}
					body={
						<>
							<div className="h-30percent px-2">
								<CenteredTextWithIcon
									text={`${this.props.data.current_temp} °C`}
									icon={Thermometer}
									imgScale={5}
									textScale={5}
								/>
							</div>
							<hr className="my-0" />
							<div className="h-70percent px-2">
								<span
									className="h-100percent m-0 row"
									style={{ justifyContent: "center", fontSize: "5vh" }}
								>
									<img src={ThermometerArrow} className="my-auto" height={`50vh`} alt="" />
									<DigitPicker
										index={0}
										val={this.state.set_temperature}
										update={this.setState}
										width="6.5vh"
									/>
									<p className="my-auto text-center">.</p>
									<DigitPicker
										index={1}
										val={this.state.set_temperature}
										update={this.setState}
										width="3.5vh"
									/>
									<p className="my-auto text-center">°C</p>
								</span>
							</div>
						</>
					}
					close={() => this.setState({ modal_open: false })}
					onConfirm={() => {
						const temp = this.state.set_temperature;
						apiCall(`/change${this.props.heating ? "Heating" : "Cooling"}Temp/${this.props.index}/${temp}`);
						this.props.reloadData();
					}}
				/>
				<div className={`rounded-lg fill-primary-light h-100percent ${this.horiz ? "" : "row m-0"}`}>
					{!this.horiz && (
						<div className="w-25percent px-2">
							<img
								src={get_icon(this.props.heating, this.props.data.is_on)}
								className="center"
								alt=""
								width="100%"
							/>
						</div>
					)}

					<div className={`h-100percent ${!this.horiz && "row m-0"} w-${this.horiz ? 100 : 75}percent`}>
						<div className={`w-100percent h-${this.horiz ? 30 : 50}percent`}>
							<p
								className={`${this.horiz && "text-center center-vertically"} mb-0 mx-${
									this.horiz ? 2 : 0
								} pt-2`}
								style={{
									fontSize: `${this.room_name_font_size}vh`,
									paddingLeft: this.horiz ? "auto" : `${0.4 * this.temp_icon_size}vh`,
								}}
							>
								{this.props.data.room}
							</p>
						</div>

						<div className={`${this.horiz ? "w-100percent h-70percent" : "w-100percent h-50percent"}`}>
							{this.horiz && (
								<div className="h-40percent pt-2">
									<img
										src={get_icon(this.props.heating, this.props.data.is_on)}
										className="my-auto center-horizontally"
										alt=""
										height="90vh"
									/>
								</div>
							)}

							<div
								className={`${
									this.horiz ? "h-60percent" : "h-50percent row w-100percent m-0 center-vertically"
								}`}
							>
								<div className={`${this.horiz ? "h-35percent px-2" : "w-40percent"}`}>
									<CenteredTextWithIcon
										text={`${this.props.data.current_temp}°C`}
										icon={Thermometer}
										imgScale={this.temp_icon_size}
										textScale={this.temp_font_size}
										forceLeft={!this.horiz}
									/>
								</div>

								<div className={`${this.horiz ? "h-35percent px-2" : "w-40percent"}`}>
									<CenteredTextWithIcon
										text={`${this.props.data.target_temp}°C`}
										icon={ThermometerArrow}
										imgScale={this.temp_icon_size}
										textScale={this.temp_font_size}
										forceLeft={!this.horiz}
									/>
								</div>

								<div className={`${this.horiz ? "h-30percent pb-2 px-2" : "w-20percent"}`}>
									<button
										className="btn center-horizontally h-100percent p-0"
										onClick={() => {
											this.setState({ modal_open: true });
										}}
									>
										<img src={Pencil} alt="" width={this.horiz ? "30vh" : "25vh"} />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RoomDisplay;
