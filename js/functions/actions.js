/**
 * @file
 *		These Functions handle the Actions database
 *		Functions exist to add/remove actions, and roll Action
 *
 * @global {boolean} ACTIONSCLEANINGMODE
 *		Flags if Actions are being cleaned.
 *		In Cleaning Mode All Actions are rendered and have the remove button
 *
 * @function toggleActionsClean()
 * @function redrawActionList()
 * @function drawAction()
 * @function openActionForm()
 * @function closeActionForm()
 * @function addActionAttribute()
 * @function addActionSkill()
 * @function addAction()
 * @function removeAction()
 * @function rollAction()
 */

var ACTIONSCLEANINGMODE = false;

/**
 * @function toggleActionsClean()
 *		Toggles the global Cleaning Mode flag and redraws the Actions appropriately 
 *
 */
function toggleActionsClean(){
	ACTIONSCLEANINGMODE = !ACTIONSCLEANINGMODE;
	redrawActionList();
	return;
}//end toggleActionsClean()

/**
 * @function redrawActionList()
 *		Draws each action in ActionList div
 * 
 */
function redrawActionList(){
	elem = document.getElementById("ActionList");
	elem.innerHTML = "";
	for (var key in actionsdb) {
		elem.innerHTML += drawAction(key);
	}
	return;
}//end redrawActionList()

/**
 * @function drawAction()
 *		Assembles Action into an HTML formatted table in a string
 *
 * @param {string} strActionName
 *		key for action to draw
 * 
 * @return {string}
 *		HTML formatted table
 */
function drawAction(strActionName){
	var objAction = actionsdb[strActionName];
	if (objAction === undefined) {return ""};
	var dice = actchar.getActionPool(objAction);
	if ((dice.size == 0 || (dice.limit == 0 && (objAction.has_limit || objAction.limit_prompt))) && !ACTIONSCLEANINGMODE) {return ""};
	var tmpstr = "";
		tmpstr	+=	"<table id=\"Action" + removeSpecial(strActionName) + "\" class=\"Action\"><tbody>";
		tmpstr	+=		"<tr>";
		tmpstr	+=			"<th>" + strActionName + "</th>";
		tmpstr	+=			"<td><button type=\"button\" class=\"ActionRollButton\" onclick=\"rollAction(\'" + strActionName + "\')\">Roll</button></td>";
		tmpstr	+=		"</tr>";
		tmpstr	+=		"<tr>";
		tmpstr	+=			"<td colspan=\"2\">";
		//Assemble Text Based version of Dice Pool
							if (objAction.has_fixed) {
								tmpstr	+=	objAction.size;
							}else {
								if (objAction.attributes !== undefined) {
									for (var i = 0; i < objAction.attributes.length; i++) {
										tmpstr	+= objAction.attributes[i];
										tmpstr	+= (i != objAction.attributes.length - 1) ? "+" : "";
									}
								}
								if (objAction.skills !== undefined) {
									tmpstr	+=	(objAction.skills.length > 0) ? "+" : "";
									for (var i = 0; i < objAction.skills.length; i++) {
										tmpstr	+= objAction.skills[i];
										tmpstr	+= (i != objAction.skills.length - 1) ? "+" : "";
									}
								}
							}
							if (objAction.has_limit_fixed) {
								tmpstr	+=	"[" + objAction.limit_fixed + "]";
							}else if (objAction.has_limit) {
								tmpstr	+=	"[" + objAction.limit + "]";
							}
							if (objAction.has_threshold) {
								tmpstr	+=	"(" + objAction.threshold;
								if (objAction.has_interval) {
									tmpstr	+=	", " + objAction.interval;
								}
								tmpstr	+=	")";
							}
							if (objAction.has_opposed) {
								tmpstr	+=	" vs ";
								if (objAction.opposed_attributes !== undefined) {
									for (var i = 0; i < objAction.opposed_attributes.length; i++) {
										tmpstr	+= objAction.opposed_attributes[i];
										tmpstr	+= (i != objAction.opposed_attributes.length - 1) ? "+" : "";
									}
								}
								if (objAction.opposed_skills !== undefined) {
									tmpstr	+=	(objAction.opposed_skills.length > 0) ? "+" : "";
									for (var i = 0; i < objAction.opposed_skills.length; i++) {
										tmpstr	+= objAction.opposed_skills[i];
										tmpstr	+= (i != objAction.opposed_skills.length - 1) ? "+" : "";
									}
								}
							}
		tmpstr	+=			"</td>";
		tmpstr	+=		"</tr>";
		tmpstr	+=		"<tr>";
		//Assemble Characters Specific Dice Pool for this Action
		tmpstr	+=			"<td>" + dice.size;
		tmpstr	+=			"+<input type=\"text\" id=\"Action" + removeSpecial(strActionName) + "Modifier\" value=\"" + actchar.ConMon.Wounds + "\" style=\"width:20px\">";
							if (objAction.limit_prompt) {
								tmpstr	+=	"[";
								tmpstr	+=	"<input type=\"text\" id=\"Action" + removeSpecial(strActionName) + "Limit\" value=\"0\" style=\"width:20px\">"
								tmpstr	+=	"]";
							}else if (objAction.has_limit) {
								tmpstr	+=	"[" + dice.limit + "]";
							}
							if (objAction.has_threshold) {
								tmpstr	+=	"(" + dice.threshold;
								if (objAction.has_interval) {
									tmpstr	+=	", " + objAction.interval;
								}
								tmpstr	+=	")";
							}
		tmpstr	+=			"</td>";
		//If in Cleaning Mode add remove button
		tmpstr	+=			"<td><button type=\"button\" ";
							if (ACTIONSCLEANINGMODE) {
								tmpstr	+=	"class=\"visible\"  ";
							}else {
								tmpstr	+=	"class=\"hidden\"  ";
							}
		tmpstr	+=			"id=\"Action" + removeSpecial(strActionName) + "Remove\" onclick=\"removeAction(\'" + strActionName + "\')\">X</button></td>";
		tmpstr	+=		"</tr>";
		tmpstr	+=	"</tbody></table>";
	return tmpstr;
}//end drawAction()

/**
 * @function openActionForm()
 *		Opens the New Action Form and resets its values
 *		Form is in a div and has a fixed location in the middle of the display
 *
 */
function openActionForm(){
	document.getElementById("ActionFormName").value						= "";
	document.getElementById("ActionFormHasOpposed").checked				= false;
	document.getElementById("ActionFormOpposedHasFixedSize").checked	= false;
	document.getElementById("ActionFormOpposedHasFixedLimit").checked	= false;
	document.getElementById("ActionFormHasFixedSize").checked			= false;
	document.getElementById("ActionFormHasFixedLimit").checked			= false;
	document.getElementById("ActionFormHasFixedThreshold").checked		= false;
	document.getElementById("ActionFormFixedSize").value				= 0;
	document.getElementById("ActionFormLimit").value					= "";
	document.getElementById("ActionFormLimitPrompt").checked			= false;
	document.getElementById("ActionFormFixedLimit").value				= 0;
	document.getElementById("ActionFormFixedThreshold").value			= 0;
	document.getElementById("ActionFormInterval").value					= 0;
	document.getElementById("ActionFormOpposedFixedSize").value			= 0;
	document.getElementById("ActionFormOpposedLimit").value				= "";
	document.getElementById("ActionFormOpposedLimitPrompt").value		= "";
	document.getElementById("ActionFormOpposedLimit").value				= 0;
	document.getElementById("ActionFormAttributesList").innerHTML		= "";
	document.getElementById("ActionFormSkillsList").innerHTML			= "";
	document.getElementById("ActionFormOpposedAttributesList").innerHTML= "";
	document.getElementById("ActionFormOpposedSkillsList").innerHTML	= "";
	document.getElementById('NewActionForm').style.display='block';
	document.getElementById('fade').style.display='block'
	return;
}//end openActionForm()

/**
 * @function closeActionForm()
 *		Closes the New Action Form
 *		Form is in a div and has a fixed location in the middle of the display
 *
 */
function closeActionForm(){
	document.getElementById('NewActionForm').style.display='none';
	document.getElementById('fade').style.display='none'
	return;
}//end closeActionForm()

/**
 * @function addActionAttribute()
 *		Adds a new Action Attribute to the New Action Form
 *
 * @param {string} strVal
 *		if "Opposed", then new Action Attribute is added to the Opposed section of the Form
 */
function addActionAttribute(strVal){
	strVal = (strVal !== undefined) ? "Opposed" : "";
	var list = document.getElementById("ActionForm" + strVal + "AttributesList");
	//Backup listed items
	var listelem = document.getElementsByClassName("ActionForm" + strVal + "AttributesListItem");
	var listitems = [];
	for (var i = 0; i < listelem.length; i++) {
		listitems.push(listelem[i].value);
	}
	//Add New Item
	var tmpstr	= "";
		tmpstr	+=	"<input type=\"list\" list=\"attributes\" ";
		tmpstr	+=		"class=\"ActionForm" + strVal + "AttributesListItem\" ";
		tmpstr	+=		"id=\"ActionForm" + listitems.length + strVal + "Attribute\" ";
		tmpstr	+=		"placeholder=\"Attribute\">";
	list.innerHTML += tmpstr;
	//Restore backed up items
	for (var i = 0; i < listitems.length; i++) {
		listelem[i].value = listitems[i];
	}
	return;
}//end addActionAttribute()

/**
 * @function addActionSkill()
 *		Adds a new Action Skill to the New Action Form
 *
 * @param {string} strVal
 *		if "Opposed", then new Action Skill is added to the Opposed section of the Form
 */
function addActionSkill(strVal){
	strVal = (strVal !== undefined) ? "Opposed" : "";
	var list = document.getElementById("ActionForm" + strVal + "SkillsList");
	//Backup listed items
	var listelem = document.getElementsByClassName("ActionForm" + strVal + "SkillsListItem");
	var listitems = [];
	for (var i = 0; i < listelem.length; i++) {
		listitems.push(listelem[i].value);
	}
	//Add New Item
	var tmpstr	= "";
		tmpstr	+=	"<input type=\"list\" list=\"skills\" ";
		tmpstr	+=		"class=\"ActionForm" + strVal + "SkillsListItem\" ";
		tmpstr	+=		"id=\"ActionForm" + listitems.length + strVal + "Skill\" ";
		tmpstr	+=		"placeholder=\"Skill\">";
	list.innerHTML += tmpstr;
	//Restore backed up items
	for (var i = 0; i < listitems.length; i++) {
		listelem[i].value = listitems[i];
	}
	return;
}//end addActionSkill()

/**
 * @function addAction()
 *		Parses New Action Form to assemble a new Action, then adds that Action to the database object.
 *		Saves Actions to database file if in Node Js
 * 
 */
function addAction(){
	closeActionForm();
	//Get Values from Form
	var strName 				= document.getElementById("ActionFormName").value
	var has_opposed				= document.getElementById("ActionFormHasOpposed").checked;
	var has_opposed_fixed		= document.getElementById("ActionFormOpposedHasFixedSize").checked;
	var has_opposed_limit_fixed	= document.getElementById("ActionFormOpposedHasFixedLimit").checked;
	var has_fixed				= document.getElementById("ActionFormHasFixedSize").checked;
	var has_limit_fixed			= document.getElementById("ActionFormHasFixedLimit").checked;
	var has_threshold			= document.getElementById("ActionFormHasFixedThreshold").checked;
	var	size					= parseInt(document.getElementById("ActionFormFixedSize").value);
	var limit					= document.getElementById("ActionFormLimit").value;
	var limit_prompt			= document.getElementById("ActionFormLimitPrompt").checked;
	var limit_fixed				= parseInt(document.getElementById("ActionFormFixedLimit").value);
	var threshold				= parseInt(document.getElementById("ActionFormFixedThreshold").value);
	var interval				= parseInt(document.getElementById("ActionFormInterval").value);
	var opposed_size_fixed		= parseInt(document.getElementById("ActionFormOpposedFixedSize").value);
	var opposed_limit			= document.getElementById("ActionFormOpposedLimit").value;
	var opposed_limit_prompt	= document.getElementById("ActionFormOpposedLimitPrompt").value;
	var opposed_limit_fixed		= parseInt(document.getElementById("ActionFormOpposedLimit").value);
	//Get Attributes
	var listelem = document.getElementsByClassName("ActionFormAttributesListItem");
	var attributes = [];
	for (var i = 0; i < listelem.length; i++) {
		if(listelem[i].value != "") attributes.push(listelem[i].value);
	}
	//Get Skills
	var listelem = document.getElementsByClassName("ActionFormSkillsListItem");
	var skills = [];
	for (var i = 0; i < listelem.length; i++) {
		if(listelem[i].value != "") skills.push(listelem[i].value);
	}
	//Get Opposed Attributes
	var listelem = document.getElementsByClassName("ActionFormOpposedAttributesListItem");
	var opposed_attributes = [];
	for (var i = 0; i < listelem.length; i++) {
		if(listelem[i].value != "") opposed_attributes.push(listelem[i].value);
	}
	//Get Opposed Skills
	var listelem = document.getElementsByClassName("ActionFormOpposedSkillsListItem");
	var opposed_skills = [];
	for (var i = 0; i < listelem.length; i++) {
		if(listelem[i].value != "") opposed_skills.push(listelem[i].value);
	}
	//Validate Form
	if (strName == "") {return}
	//Add Form to Database
	actionsdb[strName] = {};
	actionsdb[strName]["attributes"]				= attributes;
	actionsdb[strName]["skills"]					= skills;
	actionsdb[strName]["size"]						= (isNaN(size)) ? 0: size;
	actionsdb[strName]["limit"]						= limit;
	actionsdb[strName]["limit_prompt"]				= limit_prompt;
	actionsdb[strName]["limit_fixed"]				= (isNaN(limit_fixed)) ? 0: limit_fixed;
	actionsdb[strName]["threshold"]					= (isNaN(threshold)) ? 0: threshold;
	actionsdb[strName]["interval"]					= (isNaN(interval)) ? 0: interval;
	actionsdb[strName]["opposed_attributes"]		= opposed_attributes;
	actionsdb[strName]["opposed_skills"]			= opposed_skills;
	actionsdb[strName]["opposed_size_fixed"]		= (isNaN(opposed_size_fixed)) ? 0: opposed_size_fixed;
	actionsdb[strName]["opposed_limit"]				= opposed_limit;
	actionsdb[strName]["opposed_limit_prompt"]		= opposed_limit_prompt;
	actionsdb[strName]["opposed_limit_fixed"]		= (isNaN(opposed_limit_fixed)) ? 0: opposed_limit_fixed;
	actionsdb[strName]["has_interval"]				= (!isNaN(interval) && interval != 0);
	actionsdb[strName]["has_fixed"]					= has_fixed;
	actionsdb[strName]["has_limit"]					= (limit != "");
	actionsdb[strName]["has_limit_fixed"]			= has_limit_fixed;
	actionsdb[strName]["has_threshold"]				= has_threshold;
	actionsdb[strName]["has_opposed"]				= has_opposed;
	actionsdb[strName]["has_opposed_fixed"]			= has_opposed_fixed;
	actionsdb[strName]["has_opposed_limit_fixed"]	= has_opposed_limit_fixed;
	//Save Database
	if(isNodeJs()){
		var fs = require('fs');

		fs.writeFile("./lib/actions.dat", JSON.stringify(actionsdb,null,"\t"), function(err) {
			if(err) {
				return window.alert("Err Saving File\n" + err);
			}
			redrawActionList();
			return window.alert("New Action Saved");
		}); 
		return;
	}
	//Update ActionList
	redrawActionList();
	return;
}//end addAction()

/**
 * @function removeAction()
 *		Removes an action from the database object.
 *		Removals aren't done in database file until a new action is added.
 *
 * @param {string} strVal
 *		Name of Action to remove
 */
function removeAction(strVal){
	if (strVal === undefined || strVal == "") return;
	delete actionsdb[strVal];
	redrawActionList();
	return;
}//end removeAction()

/**
 * @function rollAction()
 *		Rolls the Action using the Manual Dice Roll functions
 *
 * @param {string} strActionName
 *		Name of Action to roll
 */
function rollAction(strActionName){
	var objAction = actionsdb[strActionName];
	if (objAction === undefined) {return ""};
	var dice = actchar.getActionPool(objAction);
	console.log(document.getElementById("Action" + removeSpecial(strActionName) + "Modifier"))
	if (document.getElementById("Action" + removeSpecial(strActionName) + "Modifier") != null){
		var modifier = parseInt(document.getElementById("Action" + removeSpecial(strActionName) + "Modifier").value);
		if (isNaN(modifier)) modifier = 0;
	}
	if(objAction.limit_prompt){
		dice.limit = parseInt(document.getElementById("Action" + removeSpecial(strActionName) + "Limit").value);
		if (isNaN(dice.limit)) dice.limit = 0;
	}
	resetManualRoll();
	document.getElementById("ManualDiceRollSize").value = dice.size + modifier;
	document.getElementById("ManualDiceRollLimit").value = dice.limit;
	document.getElementById("ManualDiceRollThreshold").value = dice.threshold;
	document.getElementById("ManualDiceRollExtended").checked = objAction.has_interval;
	manualRoll();
	return;
}//end rollAction()