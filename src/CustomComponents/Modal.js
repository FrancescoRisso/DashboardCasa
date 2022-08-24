/*

description:
	A modal
	
props:
	- id: the id of the Modal (a string or a number)
	- title: the title to be displayed
	- values: an array of {"label", "value"} that holds the data, or "Error", or null if data
		is not loaded yet
	- recalc: briefly set to true when modal is opened, in order to refresh the
		AdaptiveFontSize-s
	- unit: the unit of the data in display

functions:
	- componentDidMount: registers the AdaptiveFontSize group
	
imported into:
	- Electricity
	- IsOnOff
	- Temperature
	
dependences:
	- AdaptiveFontSize
	- ModalList
	- Context
	- useIsVisible
	
*/

import React from "react";
import AdaptiveFontSize from "./AdaptiveFontSize";
import ModalList from "./ModalList";
import Context from "./Context";

class Modal extends React.Component {
	static contextType = Context;

	componentDidMount = () => {
		this.context.AdaptiveFontSize.registerGroup(`modal-${this.props.id}`);
	};

	render() {
		return (
			<div
				className="modal fade"
				id={`modal-${this.props.id}`}
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div className="modal-content h-100percent">
						<div className="modal-body">
							<div className="fill-primary rounded-lg white-text h-12percent">
								<AdaptiveFontSize
									className="text-center"
									text={this.props.title}
									recalc={this.props.recalc}
								/>
							</div>
							<div className="spacer h-3percent"></div>
							<div className="h-70percent">
								{this.props.values && this.props.values !== "Error" ? (
									this.props.values.length < 6 || this.props.alwaysVertical ? (
										<ModalList
											values={this.props.values}
											recalc={this.props.recalc}
											unit={this.props.unit}
											fontSizeGroup={`modal-${this.props.id}`}
										/>
									) : this.props.values.length % 2 === 0 ? (
										<div className="row h-100percent m-0">
											<div className="col-6 pl-0 pr-1">
												<ModalList
													values={this.props.values.filter((el, index) => index % 2 === 0)}
													recalc={this.props.recalc}
													unit={this.props.unit}
													fontSizeGroup={`modal-${this.props.id}`}
												/>
											</div>
											<div className="col-6 pr-0 pl-1 h-100percent">
												<ModalList
													values={this.props.values.filter((el, index) => index % 2 !== 0)}
													recalc={this.props.recalc}
													unit={this.props.unit}
													fontSizeGroup={`modal-${this.props.id}`}
												/>
											</div>
										</div>
									) : (
										<>
											<div
												className="row m-0"
												style={{
													height: `${Math.floor(
														(Math.floor(this.props.values.length / 2) * 100) /
															Math.ceil(this.props.values.length / 2)
													)}%`
												}}
											>
												<div className="col-6 pl-0 pr-1">
													<ModalList
														values={this.props.values.filter(
															(el, index) =>
																index % 2 === 0 &&
																index + 1 !== this.props.values.length
														)}
														recalc={this.props.recalc}
														unit={this.props.unit}
														fontSizeGroup={`modal-${this.props.id}`}
													/>
												</div>
												<div className="col-6 pr-0 pl-1">
													<ModalList
														values={this.props.values.filter(
															(el, index, array) => index % 2 !== 0
														)}
														recalc={this.props.recalc}
														unit={this.props.unit}
														fontSizeGroup={`modal-${this.props.id}`}
													/>
												</div>
											</div>
											<div
												style={{
													height: `${100 / Math.ceil(this.props.values.length / 2)}%`
												}}
											>
												<ModalList
													values={[this.props.values.at(-1)]}
													recalc={this.props.recalc}
													unit={this.props.unit}
													fontSizeGroup={`modal-${this.props.id}`}
													centerSmaller={true}
												/>
											</div>
										</>
									)
								) : (
									<p className="center text-center">Si è verificato un errore</p>
								)}
							</div>

							<div className="spacer h-3percent"></div>
							<button
								type="button"
								className="btn btn-primary text-center w-100 py-0 h-12percent"
								data-dismiss="modal"
							>
								<AdaptiveFontSize
									className="text-center"
									text="Chiudi"
									recalc={this.props.recalc}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;
