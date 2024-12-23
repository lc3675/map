function start(component, g) {

	  function createTimeline() {
		const svg = d3.select("#svgBlock");

		// Clear existing content in the SVG
		svg.selectAll("*").remove();

		const container = svg.append("foreignObject")
		  .attr("width", "100%")
		  .attr("height", "100%")
		  .append("xhtml:div")
		  .attr("class", "timeline-container");
	  
		// Load the CSV file
		d3.csv("data/InterviewsTest.csv").then((data) => {
		  const timeline = container.append("div").attr("class", "timeline");
	  
		  // Render each entry as a timeline node
		  data.forEach((d, i) => {
			const node = timeline.append("div").attr("class", "timeline-node");
	  
			// Add a circle to the timeline
			node.append("div").attr("class", "timeline-circle");
	  
			// Add the content
			const content = node.append("div").attr("class", "timeline-content");
	  
			// Add header (Date and Time)
			content.append("div")
			  .attr("class", "timeline-header")
			  .text(`${d.Date}, ${d.Time}`);
	  
			// Add Title and Name
			content.append("div")
			  .attr("class", "timeline-title")
			  .text(`${d.Name} - ${d.Title}`);
	  
			// Add Interview (Truncated)
			const truncatedText = d.Interview.split(" ").slice(0, 20).join(" ") + "...";
			content.append("p")
			  .attr("class", "timeline-text")
			  .text(truncatedText);
	  
			// Add expand/collapse functionality
			const fullText = d.Interview;
			const moreText = content.append("p")
			  .attr("class", "timeline-text more")
			  .text(fullText);
	  
			moreText.style("display", "none"); // Hide full text by default
	  
			content.append("span")
			  .attr("class", "timeline-expand")
			  .text("Read More")
			  .on("click", function () {
				const isExpanded = moreText.style("display") === "block";
				moreText.style("display", isExpanded ? "none" : "block");
				d3.select(this).text(isExpanded ? "Read More" : "Read Less");
				// Recalculate height after expanding/collapsing text
				adjustTimelineHeight();
			  });
		  });
		   // Adjust height dynamically after rendering the timeline
		   adjustTimelineHeight();
		});
	  }

	    // Call the createTimeline function
		  function adjustTimelineHeight() {
			const svg = document.querySelector("#svgBlock");
			const rect = svg.querySelector("rect");
			const timelineContainer = document.querySelector(".timeline-container");
		  
			if (timelineContainer) {
			  const timelineHeight = timelineContainer.scrollHeight;
		  
			  // Set the height of the SVG and rectangle
			  svg.setAttribute("height", timelineHeight);
			  rect.setAttribute("height", timelineHeight);
			  rect.setAttribute("width", "100%");
		  
			  console.log("Adjusted height:", timelineHeight); // Debugging log
			} else {
			  console.warn("Timeline container not found!");
			}
		  }
		  createTimeline();

}


function end(component, g) {
	console.log("end " + component.id + " enter");
	// Clear the SVG content
	d3.select("#svgBlock").selectAll("*").remove();
}

export {start, end};