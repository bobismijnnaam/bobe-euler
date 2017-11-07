/*
 * Dynamic Table of Contents script
 * by Matt Whitlock <http://www.whitsoftdev.com/> <<<<< THANKS MATT! This is brilliant!
 */

/*  in HTML page:

<head>
<script src="tocgen.js" type="text/javascript"></script>
<link rel=stylesheet type="text/css" href="tocgen.css">
</head>

<body onload="generateTOC(document.getElementById('toc'));">
<div id="toc"></div>

*/

function createLink(href, innerHTML,classes) {
	var a = document.createElement("a");
	a.setAttribute("href", href);
	if(classes&&classes!="")a.className+=" "+classes;
	a.innerHTML = innerHTML;
	return a;
}

function generateTOC(toc,sectLabelsQ) {
    if(arguments.length<2)sectLabelQ=false
	var i2 = 0, i3 = 0, i4 = 0;
	toc = toc.appendChild(document.createElement("ul"));
	for (var i = 0; i < document.body.childNodes.length; ++i) {
		var node = document.body.childNodes[i];
		var tagName = node.nodeName.toLowerCase();
		var classes=node.className;
		if (tagName == "h4") {
			++i4;
			if (i4 == 1) toc.lastChild.lastChild.lastChild.appendChild(document.createElement("ul"));
			var section = i2 + "." + i3 + "." + i4;
			if(sectLabelsQ)node.insertBefore(document.createTextNode(section ), node.firstChild);
			node.id = "section" + section;
			toc.lastChild.lastChild.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML,classes));
		}
		else if (tagName == "h3") {
			++i3, i4 = 0;
			if (i3 == 1) toc.lastChild.appendChild(document.createElement("ul"));
			var section = i2 + "." + i3;
			if(sectLabelsQ)node.insertBefore(document.createTextNode(section ), node.firstChild);
			node.id = "section" + section;
			toc.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML,classes));
		}
		else if (tagName == "h2") {
			++i2, i3 = 0, i4 = 0;
			var section = i2;
			if(sectLabelsQ)node.insertBefore(document.createTextNode(section ), node.firstChild);
			node.id = "section" + section;
			toc.appendChild(h2item = document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML,classes));
		}
	}
}
