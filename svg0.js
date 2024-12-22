/*
Variables should not be used outside of functions unless they are constants.
A component is removed when the user clicks other button so variable values are lost.
If you need to keep the variable values between buttons, you can save them in 
the "component" object.
*/

function start(component, g) {

/*edit anything from this point onwards*/
	function createScatterplot() {
		const svg = d3.select("#svgBlock"); // Select the SVG element
		const width = svg.node().getBoundingClientRect().width; // Get SVG width
		const height = svg.node().getBoundingClientRect().height; // Get SVG height

		// Sample data
		const data = [
			{ x: 10, y: 20 },
			{ x: 40, y: 80 },
			{ x: 60, y: 40 },
			{ x: 90, y: 70 },
			{ x: 120, y: 50 }
		];


		// Define margins
		const margin = { top: 20, right: 20, bottom: 20, left: 20 };
		const plotWidth = width - margin.left - margin.right;
		const plotHeight = height - margin.top - margin.bottom;

		// Calculate dynamic x and y domains based on data
		const xExtent = d3.extent(data, d => d.x); // [minX, maxX]
		const yExtent = d3.extent(data, d => d.y); // [minY, maxY]

		// Add some padding to the domain
		const xPadding = (xExtent[1] - xExtent[0]) * 0.1; // 10% padding
		const yPadding = (yExtent[1] - yExtent[0]) * 0.1;

		// Define dynamic scales
		const xScale = d3.scaleLinear()
			.domain([xExtent[0] - xPadding, xExtent[1] + xPadding]) // Input domain with padding
			.range([margin.left, plotWidth + margin.left]); // Output range

		const yScale = d3.scaleLinear()
			.domain([yExtent[0] - yPadding, yExtent[1] + yPadding]) // Input domain with padding
			.range([plotHeight + margin.top, margin.top]); // Inverted range for SVG

		// Add circles for each data point
		svg.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", d => xScale(d.x)) // Position x
			.attr("cy", d => yScale(d.y)) // Position y
			.attr("r", 5) // Radius
			.attr("fill", "blue"); // Circle color

		// Add axes (optional, for clarity)
		const xAxis = d3.axisBottom(xScale);
		const yAxis = d3.axisLeft(yScale);

		// Append x-axis
		svg.append("g")
			.attr("transform", `translate(0, ${plotHeight + margin.top})`)
			.call(xAxis);

		// Append y-axis
		svg.append("g")
			.attr("transform", `translate(${margin.left}, 0)`)
			.call(yAxis);
		}

		// Call the function to create the scatterplot
		createScatterplot();


	/*do not edit anything below this point*/
}

function end(component, g) {
	console.log("end " + component.id + " enter");
}

export {start, end};