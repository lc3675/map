/*
Variables should not be used outside of functions unless they are constants.
A component is removed when the user clicks other button so variable values are lost.
If you need to keep the variable values between buttons, you can save them in 
the "component" object.
*/

function start(component, g) {
	console.log("start " + component.id + " enter");
	let circle = g.append("circle")
		.attr("cx", 30)
		.attr("cy", 30)
		.attr("r", 15)
		.attr("fill", "green")
		.data(component.id);
	return;
}

function end(component, g) {
	console.log("end " + component.id + " enter");
}

export {start, end};