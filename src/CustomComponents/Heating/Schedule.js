/*

description:
	
	
state:
	- 
	
props:
	- schedule: { turn_on: bool, active: bool, hour: int, minute: int, paused_once: bool, schedule: [bool x7] }
	- first: bool
	- last: bool
	- heating: bool
	- orientation: "horizontal" | "vertical"
	- update: (new_schedule) => void
	- delete: () => void
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";
import get_icon from "./OnOffIcon";
import CenteredTextWithIcon from "./CenteredTextWithIcon";
import Day from "./Day";
import Trash from "../../images/trash.svg";

const pad = (num) => (num < 10 ? `0${num}` : num);

class Schedule extends React.Component {
	constructor(props) {
		super(props);
		this.setState = this.setState.bind(this);

		this.state = {
			turn_on: this.props.schedule.turn_on,
			active: this.props.schedule.active,
			hour: this.props.schedule.hour,
			minute: this.props.schedule.minute,
			paused_once: this.props.schedule.paused_once,
			schedule: this.props.schedule.schedule,
			disabled_now: false,
		};
	}

	componentDidUpdate = (_, prevState) => {
		if (JSON.stringify(prevState) === JSON.stringify(this.state)) return;
		this.props.update({
			turn_on: this.state.turn_on,
			active: this.state.active,
			hour: this.state.hour,
			minute: this.state.minute,
			paused_once: this.state.paused_once,
			schedule: this.state.schedule,
		});
	};

	horiz = this.props.orientation === "horizontal";

	margin = `mt-${this.props.first ? 0 : 2} mb-2`;

	icon_w = 25;
	switch_w = 16;
	days_w = 100 - this.icon_w - this.switch_w;

	render() {
		const extra_bit = this.state.paused_once || this.state.disabled_now;

		return (
			<div className={`rounded fill-primary-light px-3 py-2 ${this.margin} h-${extra_bit ? 60 : 40}percent`}>
				<div className={`row w-100percent h-${extra_bit ? 66 : 100}percent m-0`}>
					<button
						className={`h-100percent btn`}
						style={{ width: `${this.icon_w}%` }}
						onClick={() =>
							this.setState((prev) => {
								return { turn_on: !prev.turn_on };
							})
						}
					>
						<CenteredTextWithIcon
							text={this.state.turn_on ? "Accendi" : "Spegni"}
							icon={get_icon(this.props.heating, this.state.turn_on)}
							imgScale={this.horiz ? 3.75 : 4.5}
							textScale={this.horiz ? 3 : 2.5}
						/>
					</button>
					<div className={`h-100percent`} style={{ width: `${this.days_w}%` }}>
						<div className={`w-100percent h-${this.horiz ? 50 : 60}percent px-3`}>
							<div
								className={`w-100percent h-${this.horiz ? 100 : 50}percent`}
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								{(this.horiz ? [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 3]).map((day) => (
									<Day
										day={day}
										key={day}
										on={this.state.schedule}
										invert={() =>
											this.setState((prev) => {
												return {
													schedule: prev.schedule.map((val, index) =>
														index === day ? !val : val,
													),
												};
											})
										}
										orientation={this.props.orientation}
									/>
								))}
							</div>
							{!this.horiz && (
								<div
									className={`w-100percent h-50}percent`}
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<span></span>
									<span></span>
									{[4, 5, 6].map((day) => (
										<Day
											day={day}
											key={day}
											on={this.state.schedule}
											update={this.setState}
											orientation={this.props.orientation}
										/>
									))}
									<span></span>
									<span></span>
								</div>
							)}
						</div>
						<div className={`w-100percent h-${this.horiz ? 50 : 40}percent px-3 pt-2`}>
							<input
								type="time"
								className="h-100percent w-100percent rounded px-1 fill-primary-light"
								style={{ fontSize: "3vh" }}
								value={`${pad(this.state.hour)}:${pad(this.state.minute)}`}
								onInput={(ev) =>
									this.setState({
										hour: parseInt(ev.target.value.split(":")[0]),
										minute: parseInt(ev.target.value.split(":")[1]),
									})
								}
							/>
						</div>
					</div>
					<div className={`h-100percent`} style={{ width: `${this.switch_w}%` }}>
						<div className="h-50percent">
							<div className="center-vertically">
								<label className="switch my-auto center-horizontally">
									<input
										type="checkbox"
										checked={this.state.active}
										onChange={() =>
											this.setState((prevState) => {
												if (prevState.active) return { active: false, disabled_now: true };
												else return { active: true, disabled_now: false, paused_once: false };
											})
										}
									/>
									<span className="slider round" />
								</label>
							</div>
						</div>
						<div className="h-50percent">
							<button className="btn center-vertically p-0" onClick={this.props.delete}>
								<img src={Trash} alt="" width="80%" />
							</button>
						</div>
					</div>
				</div>
				{extra_bit && (
					<div className={`w-100percent h-33percent`}>
						<button
							className={`btn border rounded-pill fill-primary-light center py-2 px-3 ${
								this.state.paused_once && "not-hoverable"
							}`}
							onClick={() =>
								this.state.disabled_now && this.setState({ disabled_now: false, paused_once: true })
							}
						>
							{this.state.paused_once
								? "Si riattiva dopo aver saltato un'esecuzione"
								: "Riattivare dopo che salta una volta?"}
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default Schedule;
