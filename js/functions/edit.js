/**
 * @file
 *		Contains functions specifically used when editing a character sheet
 *
 * @function addModifierSlot()
 * @function setCharacterSpecial()
 * @function toggleEditButtons()
 */

/**
 * @function addModifierSlot()
 *		Adds a slot to a gear item for modifers to be applied when that gear item is activated. 
 *
 * @param {string} strid
 *		Gear identifier to ensure that the new slot is placed with the correct gear.
 *		i.e. Gear0, Augmentation3, Spell2 and so on.
 * @param {string} strlist
 *		List to use for creating Moddable Slot (either skills or moddables)
 */
function addModifierSlot(strid, strlist)
{
	//extract name of string
	if(strid[0] === undefined){
		str = strid.id;
	}else{
		str = strid[0].id;
	}
	str = removeSpecial(str);
	//Get Existing Slots
	var elem = document.getElementsByClassName(str + "ModSlot");
	var set = [];
	for (var i = 0; i < elem.length; i++) {
		var tmparr = {};
		tmparr["name"] = document.getElementById(str + i + "Name").value;
		tmparr["value"] = document.getElementById(str + i + "Value").value;
		tmparr["type"] = document.getElementById(str + i + "Name").list;
		set.push(tmparr);
	}
	//Add New Slot
	var tmpstr	= "";
		tmpstr	+=	"<table class=\"" + str + "ModSlot\"><tbody>";
		tmpstr	+=		"<tr>";
		tmpstr	+=			"<td>";
		tmpstr	+=				"<input class=\"GearName\" list=\"" + strlist + "\" id=\"" + str + set.length + "Name\">";
		tmpstr	+=			"</td>";
		tmpstr	+=			"<td>";
		tmpstr	+=				"<input class=\"GearValue\"type=\"number\" id=\"" + str + set.length + "Value\" value=\"0\">"
		tmpstr	+=			"</td>";
		tmpstr	+=		"</tr>";
		tmpstr	+=	"</tbody></table>";
	document.getElementById(str).innerHTML += tmpstr;
	//Restore (otherwise all slots will be left empty)
	for (var i = 0; i < set.length; i++) {
		document.getElementById(str + i + "Name").value = set[i]["name"];
		document.getElementById(str + i + "Value").value = set[i]["value"];
	}
	return;
}//end addModifierSlot()

/**
 * @function setCharacterSpecial()
 *		Set the Special Attribute of the Characters Attribute Array based on the input from "SpecialEditType"
 *		Either Magical, Technomancing or Mundane 
 *
 */
function setCharacterSpecial()
{
	document.getElementById("SpecialEditResistAttribute").setAttribute("class","visible");
	document.getElementById("SpecialResistAttributeName").setAttribute("class","visible");
	document.getElementById("AttributeSpecialLabel").setAttribute("class","visible");
	document.getElementById("AttributeSpecial").setAttribute("class","visible");
	val = document.getElementById("SpecialEditType").value;
	if (val == "magician" || val == "aspectedmagician" || val == "mysticadept" || val == "adept") {
		console.log("Setting Special Attribute to Magic");
		document.getElementById("AttributeSpecialLabel").innerHTML = "Mag";
		document.getElementById("SpecialResistAttributeName").innerHTML = "Drain:";
	}else if (val == "technomancer") {
		console.log("Setting Special Attribute to Resonance");
		document.getElementById("AttributeSpecialLabel").innerHTML = "Res";
		document.getElementById("SpecialResistAttributeName").innerHTML = "Fade:";
	}else{
		document.getElementById("SpecialEditResistAttribute").setAttribute("class","hidden");
		document.getElementById("SpecialResistAttributeName").setAttribute("class","hidden");
		document.getElementById("AttributeSpecialLabel").setAttribute("class","hidden");
		document.getElementById("AttributeSpecial").setAttribute("class","hidden");
	}
	actchar.updateFromEdit();
	return;
}//end setNewCharacterSpecial()

/**
 * @function toggleEditButtons()
 * 		Toggles the Edit Buttons and elements on the Character Sheet on and off.
 *
 * @param {boolean} boolActive
 *		State to toggle to (true means on)
 */
function toggleEditButtons(boolActive){
	if (boolActive) {
		document.getElementById("EditCharacterButton").style.visiblity = "hidden";
		document.getElementById("EditCharacterButton").style.display = "none";
		document.getElementById("UpdateCharacterButton").style.visiblity = "initial";
		document.getElementById("UpdateCharacterButton").style.display = "initial";
		document.getElementById("AddArmorButton").style.visibility = "initial";
		document.getElementById("AddArmorButton").style.display = "initial";
		document.getElementById("AddWeaponsButton").style.visibility = "initial";
		document.getElementById("AddWeaponsButton").style.display = "initial";
		document.getElementById("AddSpellsButton").style.visibility = "initial";
		document.getElementById("AddSpellsButton").style.display = "initial";
		document.getElementById("AddSkillsButton").style.visibility = "initial";
		document.getElementById("AddSkillsButton").style.display = "initial";
		document.getElementById("AddSkillGroupsButton").style.visibility = "initial";
		document.getElementById("AddSkillGroupsButton").style.display = "initial";
		document.getElementById("AddGearButton").style.visibility = "initial";
		document.getElementById("AddGearButton").style.display = "initial";
		document.getElementById("AddAugmentationsButton").style.visibility = "initial";
		document.getElementById("AddAugmentationsButton").style.display = "initial";
		document.getElementById("AddQualitiesButton").style.visibility = "initial";
		document.getElementById("AddQualitiesButton").style.display = "initial";
		document.getElementById("AddPowersButton").style.visibility = "initial";
		document.getElementById("AddPowersButton").style.display = "initial";
		document.getElementById("SpecialEditType").style.visibility = "initial";
		document.getElementById("SpecialEditType").style.display = "initial";
	}else {
		document.getElementById("EditCharacterButton").style.visiblity = "initial";
		document.getElementById("EditCharacterButton").style.display = "initial";
		document.getElementById("UpdateCharacterButton").style.visiblity = "hidden";
		document.getElementById("UpdateCharacterButton").style.display = "none";
		document.getElementById("AddArmorButton").style.visibility = "hidden";
		document.getElementById("AddArmorButton").style.display = "none";
		document.getElementById("AddWeaponsButton").style.visibility = "hidden";
		document.getElementById("AddWeaponsButton").style.display = "none";
		document.getElementById("AddSpellsButton").style.visibility = "hidden";
		document.getElementById("AddSpellsButton").style.display = "none";
		document.getElementById("AddSkillsButton").style.visibility = "hidden";
		document.getElementById("AddSkillsButton").style.display = "none";
		document.getElementById("AddSkillGroupsButton").style.visibility = "hidden";
		document.getElementById("AddSkillGroupsButton").style.display = "none";
		document.getElementById("AddGearButton").style.visibility = "hidden";
		document.getElementById("AddGearButton").style.display = "none";
		document.getElementById("AddAugmentationsButton").style.visibility = "hidden";
		document.getElementById("AddAugmentationsButton").style.display = "none";
		document.getElementById("AddQualitiesButton").style.visibility = "hidden";
		document.getElementById("AddQualitiesButton").style.display = "none";
		document.getElementById("AddPowersButton").style.visibility = "hidden";
		document.getElementById("AddPowersButton").style.display = "none";
		document.getElementById("SpecialEditType").style.visibility = "hidden";
		document.getElementById("SpecialEditType").style.display = "none";
	}
	return;
}//end toggleEditButtons()
