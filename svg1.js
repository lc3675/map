/*
Variables should not be used outside of functions unless they are constants.
A component is removed when the user clicks other button so variable values are lost.
If you need to keep the variable values between buttons, you can save them in 
the "component" object.
*/

function start(component, g) {

	console.log("start " + component.id + " enter");
	// Creates a Masonry Layout with Text.

	function createMasonryLayout() {
		const container = d3.select("#svgBlock") // Use svgBlock as the container
		  .append("foreignObject") // Add foreignObject to embed HTML
		  .attr("width", "100%")
		  .attr("height", "100%")
		  .append("xhtml:div") // Embed a div for masonry layout
		  .attr("class", "masonry"); // Add masonry CSS class
	  
		// Load data from CSV
		d3.csv("data.csv").then(data => {
		  // For each row in the CSV, create a box
		  data.forEach(d => {
			container.append("div")
			  .attr("class", "masonry-box") // Apply masonry box style
			  .text(d.text); // Populate with text content from CSV
		  });
		});
	  }
	  
	  // Call the function to create the masonry layout
	  createMasonryLayout();

	return;

}

function end(component, g) {
	console.log("end " + component.id + " enter");
}

export {start, end};