/**
 * @file
 *	Various functions that are needed but are hard to categorize
 *
 * @function removeSpecial()
 * @function backuplog()
 * @function toggleSpell()
 * @function isNodeJs()
 * @function redrawDataLists()
 */
 
/**
 * @function removeSpecial()
 *		Removes Special Characters from String that don't work in Element ID's
 *		Removes Spaces, Parenthesis, commas, and periods
 *
 * @param {string} strIn
 *		String to remove characters from
 * @return 
 *		Cleaned String
 */
function removeSpecial(strIn){
	return strIn.replace(/\s/g, '').replace('(', '').replace(')', '').replace(',', '').replace('.', '');
}

/**
 * @function backuplog()
 *		Logs elements to backup log area for when console isn't accessible
 *
 * @param {string} strIn
 *		String to send to backup log
 */
function backuplog(strIn){
	elem = document.getElementById("backupconsole");
	elem.innerHTML += "</br>" + strIn;
	return;
}//end backuplog()

/**
 * @function toggleSpell()
 *		Toggles sustained variable in Spell Element of Active Character
 *
 * @param {DOM Element} strId
 *		Element contaiing Spell Name to toggle
 */
function toggleSpell(strId){
	//extract name of string
	var str = "";
	if(strId[0] === undefined){
		str = strId.getElementsByClassName("SpellName")[0].innerHTML;
	}else{
		str = strId[0].getElementsByClassName("SpellName")[0].innerHTML;
	}
	str;
	console.log("Toggling " + str + " from:");
	for (var i = actchar.Spells.length - 1; i >= 0; i--) {
		if (actchar.Spells[i].name == str){
			console.log("Toggling Found " + str);
			actchar.Spells[i].sustained = document.getElementById("SpellToggle" + i + removeSpecial(str)).checked;
			chars[actchar.id].Spells[i].sustained = document.getElementById("SpellToggle" + i + removeSpecial(str)).checked;
			return;
		}
	}
	console.log("Toggling Not Found " + str);
	return;
}//end toggleSpell()

/**
 * @function isNodeJs()
 *		Determines if the environment is in some variant of NodeJS
 *
 * @return {boolean}
 *		true if NodeJS, false otherwise
 */
function isNodeJs(){
	try {
		return (typeof require('nw.gui') !== undefined);
	}catch(e){
		return false;
	}
}//end isNodeJs()

/**
 * @function redrawDataLists()
 *		Draws Data Lists elements from loaded databases
 *
 */
function redrawDataLists(){
	elem = document.getElementById("skills");
	elem.innerHTML = "";
	//skills
	for (var key in skillsdb) {
		elem.innerHTML += "<option value=\"" + key + "\">";
	}
	//skillgroups
	elem = document.getElementById("skillgroups");
	elem.innerHTML = "";
	for (var key in skillgroupsdb) {
		elem.innerHTML += "<option value=\"" + key + "\">";
	}
	return;
}//end redrawDataLists()
