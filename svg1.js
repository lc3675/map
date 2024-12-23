/*
Variables should not be used outside of functions unless they are constants.
A component is removed when the user clicks other button so variable values are lost.
If you need to keep the variable values between buttons, you can save them in 
the "component" object.
*/

function start(component, g) {
	// Creates a Masonry Layout with Text.

	function createMasonryLayout() {
		const container = d3.select("#svgBlock") // Use svgBlock as the container
		  .append("foreignObject") // Add foreignObject to embed HTML
		  .attr("width", "100%")
		  .attr("height", "100%")
		  .append("xhtml:div") // Embed a div for masonry layout
		  .attr("class", "masonry"); // Add masonry CSS class
	  
		// Load data from CSV
		d3.csv("data/InterviewsTest.csv").then(data => {
			// For each row in the CSV, create a box
			data.forEach(d => {
			  // Truncate the text to 100 words
			  const truncatedText = d.Interview.split(" ").slice(0, 50).join(" ") + " ...";
	  
			  // Create a masonry box
			  const box = container.append("div")
				.attr("class", "masonry-box"); // Apply masonry box style
	  
			  // Add Date, Time, and Title as a subheading
			  box.append("div")
				.attr("class", "masonry-header")
				.html(`<strong>${d.Date} ${d.Time}</strong><br><em>${d.Title}</em>`)
				.style("border-bottom", "1px solid #ccc")
				.style("margin-bottom", "10px")
				.style("padding-bottom", "5px");
	  
			  // Add the truncated text
			  box.append("p")
				.attr("class", "masonry-text")
				.text(truncatedText);
			});

			// Adjust SVG and rectangle height after the masonry layout is populated
			setTimeout(() => {
				const masonryHeight = container.node().scrollHeight; // Get the height of the masonry div
				svg.attr("height", masonryHeight); // Set the SVG height
				svg.select("rect").attr("height", masonryHeight); // Adjust the rectangle height
			}, 100); // Slight delay to ensure layout has rendered

		  });
		}
	  
	  // Call the function to create the masonry layout
	  createMasonryLayout();

}

function end(component, g) {
	console.log("end " + component.id + " enter");
	  // Clear the SVG content
	  d3.select("#svgBlock").selectAll("*").remove();
}

export {start, end};