/**
 * @file
 *		Contains functions relating to Modifiers of character attributes
 *
 * @function activateMods()
 * @function deactivateMods()
 */
 
/**
 * @function activateMods()
 *		Applies the given Attribute and Skill Modifiers to the active character
 * 
 * @param {object[]} objArrAttr
 *		Array of objects containing "name" string variable and "value" integer variable.
 * @param {object[]} objArrSkills
 *		Array of objects containing "name" string variable and "value" integer variable.
 */
function activateMods(objArrAttr, objArrSkills){
	console.log("Activating Modifiers");
	var tmpval = 0;
	//Attributes
	for (var i = objArrAttr.length - 1; i >= 0; i--) {
		console.log("Activating Attribute Modifier " + objArrAttr[i]["name"] + "(" + objArrAttr[i]["value"] + ")");
		tmpval = actchar.Attributes.getattributeMod(objArrAttr[i]["name"]) + objArrAttr[i]["value"];
		actchar.Attributes.setattributeMod(objArrAttr[i]["name"], tmpval);
	}
	//Skills
	for (var i = objArrSkills.length - 1; i >= 0; i--) {
		console.log("Activating Skill Modifier " + objArrSkills[i]["name"] + "(" + objArrSkills[i]["value"] + ")");
		tmpval = actchar.getSkillMod(objArrSkills[i]["name"]) + objArrSkills[i]["value"];
		actchar.setSkillMod(objArrSkills[i]["name"], tmpval);
	}
	actchar.update();
	actchar.draw();
	redrawInitiativeList();
	return;
}//end activateMods

/**
 * @function deactivateMods()
 *		Removes the given Attribute and Skill Modifiers from the active character
 * 
 * @param {object[]} objArrAttr
 *		Array of objects containing "name" string variable and "value" integer variable.
 * @param {object[]} objArrSkills
 *		Array of objects containing "name" string variable and "value" integer variable.
 */
function deactivateMods(objArrAttr, objArrSkills){
	console.log("Deactivating Modifiers");
	//Attributes
	for (var i = objArrAttr.length - 1; i >= 0; i--) {
		console.log("Deactivating Attribute Modifier " + objArrAttr[i]["name"] + "(" + objArrAttr[i]["value"] + ")");
		var tmpval = actchar.Attributes.getattributeMod(objArrAttr[i]["name"]) - objArrAttr[i]["value"];
		actchar.Attributes.setattributeMod(objArrAttr[i]["name"], tmpval);
	}
	//Skills
	for (var i = objArrSkills.length - 1; i >= 0; i--) {
		console.log("Deactivating Skill Modifier " + objArrSkills[i]["name"] + "(" + objArrSkills[i]["value"] + ")");
		var tmpval = actchar.getSkillMod(objArrSkills[i]["name"]) - objArrSkills[i]["value"];
		actchar.setSkillMod(objArrSkills[i]["name"], tmpval);
	}
	actchar.update();
	actchar.draw();
	redrawInitiativeList();
	return;
}//end deactivateMods()
