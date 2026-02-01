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
	- larger

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

	computeColData = () => {
		if ([null, "Error"].includes(this.props.values))
			return { fields: [], leftColData: [], rightColData: [], extraColData: [] };

		if (this.props.energyModal) {
			const fields = Object.keys(this.props.values).sort();

			const allEvenFields = fields.filter((_, index) => index % 2 === 0);
			const oddFields = fields.filter((_, index) => index % 2 === 1);

			const extraField =
				allEvenFields.length === oddFields.length ? null : allEvenFields[allEvenFields.length - 1];
			const evenFields = allEvenFields.filter((field) => field !== extraField);

			const formatDataRecord = (field) => {
				return {
					label: field,
					value: this.props.values[field],
					unit: field === "Stato di carica della batteria" ? " %" : " kW",
				};
			};

			const leftColData = evenFields.map(formatDataRecord);
			const rightColData = oddFields.map(formatDataRecord);
			const allData = fields.map(formatDataRecord);

			const extraColData = (extraField && [formatDataRecord(extraField)]) || [];

			return { fields, allData, leftColData, rightColData, extraColData };
		} else {
			const rightColData = [];
			const extraColData = [];
			const leftColData = [];
			const allData = this.props.values;
			const fields = Object.keys(this.props.values);

			return { fields, allData, leftColData, rightColData, extraColData };
		}
	};

	render() {
		const { fields, allData, leftColData, rightColData, extraColData } = this.computeColData();

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
									unit={this.props.unit}
								/>
							</div>
							<div className="spacer h-3percent"></div>
							<div className="h-70percent">
								{this.props.values && this.props.values !== "Error" ? (
									fields.length < 6 || this.props.alwaysVertical ? (
										<ModalList larger={this.props.larger} values={allData} unit={this.props.unit} />
									) : fields.length % 2 === 0 ? (
										<div className="row h-100percent m-0">
											<div className="col-6 pl-0 pr-1">
												<ModalList
													larger={this.props.larger}
													values={leftColData}
													unit={this.props.unit}
												/>
											</div>
											<div className="col-6 pr-0 pl-1 h-100percent">
												<ModalList
													larger={this.props.larger}
													values={rightColData}
													unit={this.props.unit}
												/>
											</div>
										</div>
									) : (
										<>
											<div
												className="row m-0"
												style={{
													height: `${Math.floor(
														(Math.floor(Object.keys(this.props.values).length / 2) * 100) /
															Math.ceil(Object.keys(this.props.values).length / 2),
													)}%`,
												}}
											>
												<div className="col-6 pl-0 pr-1">
													<ModalList
														larger={this.props.larger}
														values={leftColData}
														unit={this.props.unit}
													/>
												</div>
												<div className="col-6 pr-0 pl-1">
													<ModalList
														larger={this.props.larger}
														values={rightColData}
														unit={this.props.unit}
													/>
												</div>
											</div>
											<div
												style={{
													height: `${100 / Math.ceil(Object.keys(this.props.values).length / 2)}%`,
												}}
											>
												<ModalList
													larger={this.props.larger}
													values={extraColData}
													centerSmaller={true}
													unit={this.props.unit}
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
								<AdaptiveFontSize className="text-center" text="Chiudi" recalc={this.props.recalc} />
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;
