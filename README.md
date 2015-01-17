#checkIfNew.js

This small function was built with the intention to watch for additions or subtractions to elements of a tag name in the DOM. It does not notify you if you change an element, or if you replace elements by removing them and adding an element. Since this uses `requestAnimationFrame` for a loop: there is a chance this will fire IF these events take longer than it takes for the browser to fire `requestAnimationFrame` (60fps). Although it does not work by switching DOM nodes that fall before the final node in the list, if you remove an element, and add one to the end, it will be considered changed. So if you take the first instance of a `div` and append it to the end of the document, `checkIfNew` will say the list has changed. eg. 

`document.body.appendChild(document.querySelector("div"))`

will report a change. 

```
var firstDiv = document.querySelector("div");
var switcher = document.querySelector("div:nth-child(2)");
firstDiv.parentNode.insertBefore(document.querySelector(switcher, firstDiv);
```

will NOT report a change.

This is because `checkIfNew` only watches the length, and changing of the final element of a nodeList.

You use it by assigning a tag type (div, img, a, section etc.), and giving it a callback that returns the current array of DOM nodes available on the page every time one is added or removed. 

	```
	var divs = checkIfNew({"tag": "div"}, function(newList) {

	  console.log(newList);

	});
	divs.loopList();
	```

to assign a parent element to use as a scope for your tags you add a "parent" to the first argument's object. For example:

	```
	var container = document.getElementById("container");
	var sectionInContainer = checkIfNew({"tag": "section", "parent": container}, function(change) {

        console.log(change);

      });
	```
will look for changes to all `<section>`s within the parent container with the ID `#container` 


