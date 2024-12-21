1. create a public directory, here named as "map" that web public documents
2. Store thge attached files in email to "/map". 
3. copy all files "*.js_html" to "*.js" and get the files as below, or rename their extension from ".js_html" to ".js". Get the files as below:

map/readme.txt 		//this file
map/data.json		//define all component resources and the first component to display.
map/start.html		//home HTML page, first page
map/start.js		//main JavaScript code. started by onload="start()", drive component loading and unloading for each button
map/content0.html	//component 0 text content
map/content1.html	//component 1 text content
map/content2.html	//component 2 text content
map/content3.html	//component 3 text content
map/content4.html	//component 4 text content
map/svg0.js			//component 0 SVG JavaScript
map/svg1.js			//component 1 SVG JavaScript
map/svg2.js			//component 2 SVG JavaScript
map/svg3.js			//component 3 SVG JavaScript
map/svg4.js			//component 4 SVG JavaScript

"*.js_html" are not used in the project. Because files with ".js" can not be sent in email, just use the extension
".js_html" to get around the restriction.

4. Start HTTP server and access the URL:

http://127.0.0.1:8080/map/start.html

Click buttons and it shows different content and a circle in different colors.

If you modify any file and reload the page, you will get the new content. It means the each button component
is dynamically reloaded. 

5. The home page contains 4 components and they are dynamically loaded and disaplayed when click the button. 
The old component is unloaded. The components are configured in file data.json.

You can add a new component or remove the component by modifing data.json. The code has no change. For example,
if you delete the following block in file data.json, "Taxonomies" button will disappear on the refreshed page.
   {
     "id":"c2",
     "title":"Taxonomies",
	 "contentPath":"content2.html",
	 "svgPath":"svg2.js"
   },

To add a new block, a. create HTML file, b. create csv JavaScript file, 3. add the JSON block with title and a unique id to data.json, 4. refresh the page. 

But the following blcok must point to the existing id and it defines the first component to display when the page is loaded.
 "selected": {
	"id":"c0"
 },

6. Each component consists of five parts: id, title, button, HTML description, and SVG.
The id is unique in data.json.
The title is used to display button.
The button is displayed in <ul id="buttons"></ul>. When it is clicked, call the JS function loadContent() in start.js, 
	load HTML content, load SVG JavaScript, and call the JS function start(component, svg) in svgX.js.
The HTML description content is in file named as a contentX.html, whose path is identified with "contentPath" in component in data.json. 
The SVG is a JavaScript file named as a pattern svgX.js, whose path is identified with "svgPath" in component in data.json. 


7. The button block is located in page as below: 
<ul id="buttons" class="horizontal-list"></ul>
"buttonBlockId":"buttons" in start.js

8. The HTML description block is located in page as below: 
<div id="textContent" class="block-a">
</div>
"textBlockId":"textContent" start.js

9. The SVG block is located in page as below: 
<g id="gBlock">
</g>
"gBlockId":"gBlock" in start.js

10. Each svg.js must prived start() and end() functions.
start() is used to display the component SVG.
end() is used to clean up the component and/or data if needed. Usually leave it empty.
