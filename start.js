const holder={
	"buttonBlockId":"buttons",
	"textBlockId":"textContent",
	"gBlockId":"gBlock",
	"svg":null,
	"data":null
};

async function start() {
	holder.svg = d3.select("#svgblock");
	holder.data = await d3.json("data.json");
	holder.data.selected["js"] = null;
	addButtons(holder.data.components);
	loadContent(holder.data.selected.id);

 	  // Adjust the rectangle height after loading
 	  adjustRectHeight();
 	 // Add a resize event listener to ensure dynamic adjustments
 	 window.addEventListener("resize", adjustRectHeight);
	 // Create the masonry layout
 	 createMasonryLayout();
	createTimeline();
 return;
}

function addButtons(components) {
	const ul = document.getElementById(holder.buttonBlockId);
	components.forEach((ele) => { 
		let b = createButton(ele);
		ul.appendChild(b);
	})
	return;
}

function createButton(ele) {
  const b = document.createElement("button");
  b.setAttribute("id", ele.id); //Use this to add attributes such as id, class, styles, or even event listeners like onclick
  b.setAttribute("type", "button"); 
  b.setAttribute("class", "buttonblock"); 
  b.innerHTML = "<li>" + ele.title + "</li>"; //Make sure to add button text if you don't want an empty button!!
  b.addEventListener("click", function(event){
		loadContent(ele.id);
	});
  return b;
}

function adjustRectHeight() {
	const aside = document.querySelector(".aside"); // Select the aside element
	const svg = document.querySelector("#svgBlock"); // Select the SVG element
	const rect = svg.querySelector("rect"); // Select the rectangle inside the SVG
  
	// Get the computed height of the aside element
	const asideHeight = aside.offsetHeight;
  
	// If the aside has a height, update the SVG and rect
	if (asideHeight > 0) {
		// Set the height of the SVG
		svg.setAttribute("height", asideHeight);

		// Set the rectangle dimensions
		rect.setAttribute("width", "100%");
		rect.setAttribute("height", asideHeight);
	} else {
		console.warn("Aside height is 0. Make sure the aside element is properly styled.");
	}
  }


function loadContent(id) {
	loadHtmlContent(id);
	loadJsContent(id);
	return;
}

async function loadJsContent(id) {
	const g = emptyG();
	let comp = findComponent(holder.data.selected.id);//old component
	if (exists(holder.data.selected.js)) {
		holder.data.selected.js.end(comp, g);
		deleteSelectedJs();
	}
	holder.data.selected.id = id;//new id
	comp = findComponent(id);
	let path = getFullPath(comp.svgPath) + "?t=" + Date.now();
	holder.data.selected.js = await import(path);
	//get "rect" element parameter and add it to comp like comp["rect"] = {} 
	//or pass to start()
	//holder.data.selected.js.start(comp, rect, g);
	holder.data.selected.js.start(comp, g);
	return;
}

function getFullPath(path) {
	let status = path.startsWith("/");
	if (!status) {
		let ind = window.location.pathname.lastIndexOf("/");
		let dir = window.location.pathname.substring(0, ind + 1);
		status = path.startsWith("./");
		if (status) {
			path = dir + path.substring(2);
		} else {
			path = dir + path;
		}
	}
	console.log(path);
	return path;
}


function emptyG() {
	console.log("emptyG()");
	const g = holder.svg.select("#" + holder.gBlockId);
	g.selectAll("*").remove();
	return g;
}

function exists(data) {
  return data !== undefined && data !== null;
}

async function loadHtmlContent(id) {
	const path = findComponent(id).contentPath
	const text = await d3.text(path);
	const div = document.getElementById(holder.textBlockId);
	div.innerHTML = text;
	return;
}

function findComponent(id) {
	return holder.data.components.find((element) => element.id == id);
}

async function deleteSelectedJs() {
	holder.data.selected.js = null;// Clear reference
	const cache = await caches.open("my-cache");
	const comp = findComponent(holder.data.selected.id);
	const path = comp.svgPath;
	await cache.delete(path);
	return;
}				
