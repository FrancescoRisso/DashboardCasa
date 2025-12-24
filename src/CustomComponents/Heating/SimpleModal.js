/*

description:
	
	
state:
	- 
	
props:
	- visible: bool
	- title: str
	- body: JSX
	- onConfirm: () => void
	- close: () => void
	- orientation: "horizontal" | "vertical"
	- w_horiz (optional): int
	- w_vert (optional): int
	
functions:
	- 
	
imported into:
	- 
	
dependences:
	- 
	
*/

import React from "react";

class SimpleModal extends React.Component {
	horiz = this.props.orientation === "horizontal";

	w_horiz = this.props.w_horiz ?? 50;
	w_vert = this.props.w_vert ?? 90;

	w_perc = this.horiz ? this.w_horiz : this.w_vert;
	h_perc = this.horiz ? 70 : 70;
	top = (100 - this.h_perc) / 2;
	left = (100 - this.w_perc) / 2;

	title_font_size = this.horiz ? 7 : 4;
	buttons_font_size = this.horiz ? 5 : 3;

	header_height = this.horiz ? 20 : 15;
	buttons_height = this.horiz ? 20 : 15;
	body_height = 100 - this.header_height - this.buttons_height;

	render() {
		if (!this.props.visible) return <></>;
		return (
			<div
				style={{
					position: "fixed",
					zIndex: 1,
					left: 0,
					top: 0,
					width: "100%",
					height: "100%",
					overflow: "auto",
					backgroundColor: "rgba(0,0,0,.4)",
				}}
			>
				<div
					className="rounded p-3"
					style={{
						backgroundColor: "#fff",
						height: `${this.h_perc}%`,
						width: `${this.w_perc}%`,
						left: `${this.left}%`,
						top: `${this.top}%`,
						position: "absolute",
					}}
				>
					<div className={`h-${this.header_height}percent white-text pb-1`}>
						<div className="h-100percent rounded fill-primary">
							<p
								style={{ fontSize: `${this.title_font_size}vh` }}
								className="center-vertically mb-0 text-center"
							>
								{this.props.title}
							</p>
						</div>
					</div>

					<div className={`h-${this.body_height}percent py-1`}>{this.props.body}</div>

					<div className={`h-${this.buttons_height}percent white-text pb-1 row m-0`}>
						<div className="h-100percent w-50percent pr-1">
							<button
								className="btn btn-danger h-100percent w-100percent"
								style={{ fontSize: `${this.buttons_font_size}vh` }}
								onClick={this.props.close}
							>
								Annulla
							</button>
						</div>
						<div className="h-100percent w-50percent pl-1">
							<button
								className="btn btn-success h-100percent w-100percent"
								style={{ fontSize: `${this.buttons_font_size}vh` }}
								onClick={() => {
									this.props.onConfirm();
									this.props.close();
								}}
							>
								Conferma
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SimpleModal;
