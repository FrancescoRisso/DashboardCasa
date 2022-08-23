/*

description:
	Given a container with fixed dimension, creates a paragraph with the biggest possible font size
	that fits the container.
	Multiple instances can be linked in a group so that they all have the same font size (the minimum
	of all the single ones): to do so, in the parent component import the context, and on mount add a
	call to "this.context.AdaptiveFontSize.registerGroup(name)", defining a unique group name. Then
	render this component with the option group={name}.
	Font size also updates when the window is resized.
	
state:
	- id: a string that uniquely identifies the instance
	- fontSize: the calculated font size (ignored if part of a group)
	
props:
	- text: the text to be displayed
	- HTMLtext (optional): an HTML string whose value is displayed instead of the text. Please provide
		also a text version with just the text, in order to correctly compute the font size
	- className: some classes that can be applied to the container
	- recalc (optional): set it to true, then false to force a recalculation of the font size (useful
		when opening modals)
	- group (optional): the name of the group the instance belongs to
	- icon (optional): an icon to be inserted before the text
	
functions:
	- displayTextWidth: given a string and a font size in the format "fontSize fontFamily", returns
		the width in pixels of that text
	- updateFontSize: computes the current font size, then either updates the state or the group settings
	- componentDidMount: adds the resize eventlistener, inserts the eventual HTMLtext and updates the
		font size
	- componentWillUnmount: removes the resize eventlistener
	- componentDidUpdate: manages the recalc
	
imported into:
	- DateTitle
	- ElectricityItem
	- Forecasts
	- IsOnOff
	- Modal
	- ModalListItem
	- SingleDayForecast
	- Temperature
	
dependences:
	- Context
	
*/

import React from "react";
import Context from "./Context";

let counter = 0;

class AdaptiveFontSize extends React.Component {
	static contextType = Context;

	constructor(props) {
		super(props);
		let thisId = counter;
		counter++;
		this.state = {
			id: `adaptiveFontSize-${thisId}`,
			fontSize: null
		};
	}

	displayTextWidth = (text, font) => {
		let canvas = document.createElement("canvas");
		let context = canvas.getContext("2d");
		context.font = font;
		let metrics = context.measureText(text);
		return metrics.width;
	};

	updateFontSize = () => {
		let p = document.getElementById(this.state.id);
		let rect = p.getBoundingClientRect();
		let h = Math.floor((rect.height * 100) / 133);
		let w = Math.floor(rect.width * 1.25);
		let font = getComputedStyle(p).fontFamily;
		let sizeText;

		sizeText = Math.floor(this.displayTextWidth(this.props.text, `${h}pt ${font}`));
		while (sizeText > (this.props.icon ? w - h : w)) {
			h = Math.floor(h * 0.95);
			sizeText = Math.floor(this.displayTextWidth(this.props.text, `${h}pt ${font}`));
		}

		if (this.props.group) {
			this.context.AdaptiveFontSize.changeFont(this.props.group, this.state.id, h);
			this.setState({ fontSize: this.context.AdaptiveFontSize.groups[this.props.group].fontSize });
		}

		this.setState({ fontSize: h });
	};

	componentDidMount = () => {
		if (this.props.HTMLtext) document.getElementById(this.state.id).children[0].innerHTML = this.props.HTMLtext;
		window.addEventListener("resize", this.updateFontSize);
		setTimeout(this.updateFontSize, 100);
	};

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.updateFontSize);
	};

	componentDidUpdate = (prevProps) => {
		if (prevProps.recalc && !this.props.recalc) setTimeout(this.updateFontSize, 200);
	};

	render() {
		return (
			<div id={this.state.id} className={`${this.props.className} h-100percent`}>
				<p
					className="center-vertically w-100"
					style={{
						fontSize:
							this.props.group && this.context.AdaptiveFontSize.groups[this.props.group]
								? this.context.AdaptiveFontSize.groups[this.props.group].fontSize
								: this.state.fontSize,
						verticalAlign: "middle",
						maxHeight: "100%",
						margin: "0"
					}}
				>
					{this.props.icon ? (
						<>
							<span className=" center-vertically">
								<img
									height={
										this.props.group && this.context.AdaptiveFontSize.groups[this.props.group]
											? this.context.AdaptiveFontSize.groups[this.props.group].fontSize * 1.2
											: this.state.fontSize * 1.2
									}
									src={this.props.icon}
									className="center-vertically pos-abs"
									alt=""
								/>
							</span>
							<img
								className="mr-2"
								width={
									this.props.group && this.context.AdaptiveFontSize.groups[this.props.group]
										? this.context.AdaptiveFontSize.groups[this.props.group].fontSize * 1.2
										: this.state.fontSize * 1.2
								}
								alt=""
							/>
						</>
					) : (
						<></>
					)}
					{this.props.text}
				</p>
			</div>
		);
	}
}

export default AdaptiveFontSize;
