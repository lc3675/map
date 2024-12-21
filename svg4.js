/*
Variables should not be used outside of functions unless they are constants.
A component is removed when the user clicks other button so variable values are lost.
If you need to keep the variable values between buttons, you can save them in 
the "component" object.
*/
const delays = [100,400,700,1000];//different delay when switching button click
const KeyDelayIndex = "delayIndex";
const KeyMoveLeft = "moveLeft";
const KeyTimeoutID = "timeoutID";

function start(component, g) {
	console.log("start " + component.id + " enter");
	const c = component.data.circle;
	let circle = g.append("circle")
		.attr("cx", c.cx)
		.attr("cy", c.cy)
		.attr("r", c.r)
		.attr("fill", "blue")
		.data(component.id);
	let delayIndex = component.data[KeyDelayIndex];
	if (!delayIndex) {
		delayIndex = 0;
	}
	let moveLeft = component.data[KeyMoveLeft];
	if (!moveLeft) {
		moveLeft = false;
	}
	component.data[KeyMoveLeft] = moveLeft;//set it before setTimeout()
	const delay = delays[delayIndex];
	const timeoutID = setTimeout(move, delay, component, circle, delay);
	component.data[KeyTimeoutID] = timeoutID;
	delayIndex = (delayIndex + 1) % delays.length;
	component.data[KeyDelayIndex] = delayIndex;
	return;
}

function move(component, circle, delay) {
	const c = component.data.circle;
	let cx = c.cx;
	let moveLeft = component.data[KeyMoveLeft];
	console.log("A: cx=" + cx + ", moveLeft=" + moveLeft + ", c.cx=" + c.cx + ", c.r=" + c.r);
	if (moveLeft) {
		cx -= 5;
		if (cx - c.r < 0) {
			cx = c.r;
			moveLeft = false;
		}
	} else {
	   cx += 5;
	   if (cx + c.r > 300) {
		  cx = 300 - c.r; 
		  moveLeft = true;
	   }	   
	}
	console.log("B: cx=" + cx + ", moveLeft=" + moveLeft + ", c.cx=" + c.cx + ", c.r=" + c.r);
	component.data[KeyMoveLeft] = moveLeft;
	c.cx = cx;
	circle.attr("cx", cx);
	let timeoutID = component.data[KeyTimeoutID];
	clearTimeout(timeoutID);
	timeoutID = setTimeout(move, delay, component, circle, delay);
	component.data[KeyTimeoutID] = timeoutID;
	return;
}

function end(component, g) {
	console.log("end " + component.id + " enter");
	const timeoutID = component.data[KeyTimeoutID];
	clearTimeout(timeoutID);
}

export {start, end};