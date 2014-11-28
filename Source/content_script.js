function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;
	
	if (['input', 'textarea'].indexOf(node.tagName.toLowerCase()) > -1
	    || node.classList.indexOf('ace_editor') > -1) {
		break;
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}



function handleText(textNode){
	var textArray = [{
		originalText: "GNU/Linux",
		updatedText: "Linux OS"
	},{
		originalText: "gnu linux",
		updatedText: "Linux OS"
	}, {
		originalText: "GNU Linux",
		updatedText: "Linux OS"
	}, {
		originalText: "gnu/linux",
		updatedText: "Linux OS",
	}
	];

	for (var enumeration = textArray.length - 1; enumeration >= 0; enumeration--) {
		// console.log(textArray[enumeration]);
		var nodeTextToFix = textNode.nodeValue;
        
        var huntedPhrase = new RegExp(textArray[enumeration].originalText, "g")


		textNode.nodeValue = nodeTextToFix.replace(huntedPhrase, textArray[enumeration].updatedText);
	};
}
walk(document.body);
