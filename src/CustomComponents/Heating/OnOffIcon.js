import HeatingOn from "../../images/heating.svg";
import HeatingOff from "../../images/heating-off.svg";
import CoolingOn from "../../images/cooling.svg";
import CoolingOff from "../../images/cooling-off.svg";

const get_icon = (heating, on) => {
	if (heating && on) return HeatingOn;
	if (heating && !on) return HeatingOff;
	if (!heating && on) return CoolingOn;
	if (!heating && !on) return CoolingOff;
};

export default get_icon;
