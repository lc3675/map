/*
Masonry Box
*/

function start(component, g) {
    // Creates a Masonry Layout with Text.
    function createMasonryLayout() {
        const svg = d3.select("#svgBlock");

        // Clear existing content in the SVG
        svg.selectAll("*").remove();

        // Create a container for the masonry layout
        const container = svg.append("foreignObject")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("xhtml:div") // Embed a div for masonry layout
            .attr("class", "masonry"); // Add masonry CSS class

        // Load data from CSV
        d3.csv("data/InterviewsTest.csv").then((data) => {
            // For each row in the CSV, create a box
            data.forEach((d) => {
                // Truncate the text to 30 words
                const truncatedText = d.Interview.split(" ").slice(0, 30).join(" ") + " ...";
                const fullText = d.Interview;

                // Create a masonry box
                const box = container.append("div")
                    .attr("class", "masonry-box") // Apply masonry box style
                    .style("padding", "10px"); // Add padding for content

                // Add Date, Time, and Title as a subheading
                box.append("div")
                    .attr("class", "masonry-header")
                    .html(`<strong>${d.Date} ${d.Time}</strong><br><em>${d.Title}</em>`)
                    .style("border-bottom", "1px solid #ccc")
                    .style("margin-bottom", "10px")
                    .style("padding-bottom", "5px");

                // Add the truncated text
                const textBox = box.append("p")
                    .attr("class", "masonry-text")
                    .text(truncatedText);

                // Add Read More/Read Less button
                const toggleButton = box.append("button")
                    .attr("class", "masonry-toggle")
                    .text("Read More")
                    .on("click", function () {
                        const isExpanded = textBox.text() === fullText;
                        textBox.text(isExpanded ? truncatedText : fullText);
                        d3.select(this).text(isExpanded ? "Read More" : "Read Less");

                        // Dynamically adjust box height
                        adjustBoxHeight(box, textBox.node());
                        adjustMasonryHeight(); // Update overall layout height
                    });

                // Dynamically adjust the height of the box based on the text
                adjustBoxHeight(box, textBox.node());
            });

            // Adjust height dynamically after the masonry layout is populated
            adjustMasonryHeight();
        }).catch((error) => {
            console.error("Error loading CSV data:", error);
        });
    }

    // Function to dynamically adjust each box height
    function adjustBoxHeight(box, textElement) {
        // Ensure the textElement is valid
        if (!textElement) {
            console.warn("Text element not found for box adjustment!");
            return;
        }

        // Get the height of the text content
        const textHeight = textElement.scrollHeight;

        // Apply the calculated height to the masonry box
        box.style("height", `${textHeight + 40}px`); // Add padding if needed
    }

    // Function to adjust the rectangle height dynamically
    function adjustMasonryHeight() {
        const svg = document.querySelector("#svgBlock");
        const rect = svg.querySelector("rect");
        const masonryContainer = document.querySelector(".masonry");

        if (masonryContainer) {
            const masonryHeight = masonryContainer.scrollHeight;

            // Set the height of the SVG and rectangle
            svg.setAttribute("height", masonryHeight);
            rect.setAttribute("height", masonryHeight);
            rect.setAttribute("width", "100%");

            console.log("Adjusted masonry height:", masonryHeight); // Debugging
        } else {
            console.warn("Masonry container not found!");
        }
    }

    // Call the function to create the masonry layout
    createMasonryLayout();
}

function end(component, g) {
    console.log("end " + component.id + " enter");
    // Clear the SVG content
    d3.select("#svgBlock").selectAll("*").remove();
}

export { start, end };