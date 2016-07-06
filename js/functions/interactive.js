/**
 * @file
 *		Functions affect the interactivity of the programs elements
 *
 * @function expand()
 */
 
/**
 * @function expand()
 *		Changes class of dropdown elements from hidden to visible
 *
 * @param {DOM Element} strId
 *		parent element to expand
 *		@TODO Change functionality to use string parameter
 */
function expand(strId){
	if(strId[0] === undefined){
		str = strId.id;
	}else{
		str = strId[0].id;
	}
	str = removeSpecial(str);
	console.log("Toggling Dropdown: " + str);
	msgelem = document.getElementById(str + "dropdown");
	if (msgelem.className == "dropdownshow") {
		msgelem.setAttribute("class","dropdownhidden");
	}else {
		msgelem.setAttribute("class","dropdownshow");
	}
	return;
}//end expand()