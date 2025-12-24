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
import Title from "./Title";
import SchedulesButton from "./SchedulesButton";
import apiCall from "../api";
import CyclicAction from "../CyclicAction";
import HeatingStatus from "./HeatingStatus";
import Context from "../Context";
import ErrNullVal from "./ErrNullVal";
import RoomDisplay from "./RoomDisplay";
import SimpleModal from "./SimpleModal";
import Schedule from "./Schedule";
import CenteredTextWithIcon from "./CenteredTextWithIcon";

class HeatingCoolingPage extends React.Component {
	static contextType = Context;

	constructor(props) {
		super(props);
		this.state = {
			heating_status: null,
			schedules_opened: false,
			schedules: null,
		};
	}

	load_status = () => {
		apiCall(this.props.heating ? "/heatingStatus" : "/coolingStatus")
			.then((data) => this.setState({ heating_status: data }))
			.catch((err) => this.setState({ heating_status: "Error" }));
	};

	load_schedules = () => {
		apiCall("/schedules")
			.then((data) => this.setState({ schedules: data }))
			.catch((err) => this.setState({ schedules: "Error" }));
	};

	horiz = this.props.orientation === "horizontal";

	title_height = this.horiz ? 20 : 10;
	rooms_height = 100 - (this.horiz ? 2 : 3) * this.title_height;

	render() {
		return (
			<div className="container-fluid vh-100 py-2">
				<CyclicAction action={this.load_status} firstWait={() => null} time={60 /* Every min */} />

				<div className={`pb-1 h-${this.title_height}percent w-100percent mx-auto`}>
					<div className="w-100percent h-100percent">
						<Title orientation={this.props.orientation} heating={this.props.heating} />
					</div>
				</div>

				{this.horiz ? (
					<div className={`pt-1 h-${this.title_height}percent row w-100percent mx-auto`}>
						<div className="col-6 pl-0 pr-1 h-100percent">
							<HeatingStatus
								orientation={this.props.orientation}
								on={this.state.heating_status}
								heating={this.props.heating}
								repull_data={this.load_status}
							/>
						</div>
						<div className="col-6 pl-1 pr-0 h-100percent">
							<SchedulesButton
								orientation={this.props.orientation}
								open_schedules={() => {
									this.load_schedules();
									this.setState({ schedules_opened: true });
								}}
							/>
						</div>
					</div>
				) : (
					<div className={`pt-1 h-${this.title_height}percent w-100percent mx-auto`}>
						<div className={`w-100percent h-100percent`}>
							<HeatingStatus
								orientation={this.props.orientation}
								on={this.state.heating_status}
								heating={this.props.heating}
								repull_data={this.load_status}
							/>
						</div>
					</div>
				)}

				<div className={`h-${this.rooms_height}percent m-0 pt-2`}>
					<div className={`${this.horiz ? "row" : ""} h-100percent w-100percent m-0`}>
						<ErrNullVal
							val={this.state.heating_status}
							display={
								this.state.heating_status &&
								this.state.heating_status?.rooms_status.map((room_details, index) => (
									<RoomDisplay
										key={index}
										first={index === 0}
										last={index === this.state.heating_status.rooms_status.length - 1}
										data={room_details}
										heating={this.props.heating}
										width={100 / this.state.heating_status.rooms_status.length}
										reloadData={this.load_status}
										index={index}
										orientation={this.props.orientation}
									/>
								))
							}
						/>
					</div>
				</div>

				{!this.horiz && (
					<div className={`pt-2 h-${this.title_height}percent w-100percent mx-auto`}>
						<div className={`w-100percent h-100percent`}>
							<SchedulesButton
								orientation={this.props.orientation}
								open_schedules={() => {
									this.load_schedules();
									this.setState({ schedules_opened: true });
								}}
							/>
						</div>
					</div>
				)}

				<SimpleModal
					visible={this.state.schedules_opened}
					title="Programmazione"
					close={() => this.setState({ schedules_opened: false })}
					orientation={this.props.orientation}
					onConfirm={() => {
						apiCall("/schedules", { method: "POST", body: JSON.stringify(this.state.schedules) });
					}}
					w_horiz={40}
					body={
						<ErrNullVal
							val={this.state.schedules}
							display={
								<div className="h-100percent" style={{ overflowY: "auto" }}>
									{this.state.schedules?.map((schedule, index) => (
										<Schedule
											schedule={schedule}
											heating={this.props.heating}
											orientation={this.props.orientation}
											first={index === 0}
											last={index === this.state.schedules.length}
											update={(new_schedule) =>
												this.setState((prev) => {
													prev.schedules[index] = new_schedule;
													return prev;
												})
											}
											delete={() =>
												this.setState((prev) => {
													prev.schedules = prev.schedules.filter((sch) => sch !== schedule);
													return prev;
												})
											}
											key={index}
										/>
									))}
									<button
										className=" btn w-100percent rounded fill-primary-light h-30percent"
										onClick={() =>
											this.setState((prev) => {
												return {
													schedules: [
														...prev.schedules,
														{
															turn_on: true,
															active: false,
															hour: 0,
															minute: 0,
															paused_once: false,
															schedule: [false, false, false, false, false, false, false],
														},
													],
												};
											})
										}
									>
										<CenteredTextWithIcon text="+" textScale={6} />
									</button>
								</div>
							}
						/>
					}
				/>
			</div>
		);
	}
}

export default HeatingCoolingPage;
