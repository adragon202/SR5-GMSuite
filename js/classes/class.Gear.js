/**
 * @file
 *	Gear Class
 *
 */

/**
 * @class
 *
 * @param {integer} intOwnerID
 *		Identifying Number of Owner. Useful in cross class calculations
 * @param {string} strName
 *		Name of Gear
 * @param {integer} intValue
 *		Value associated with Gear
 *		Could be quantity or Rating
 * @param {string[]} strArrNotes
 *		Array of Notes for Augmentation
 * @param {object[]} strArrAttrMods
 *		Array of Attribute Modifying Objects with "name" and "value" variables
 * @param {object[]} strArrSkillMods
 *		Array of Skill Modifying Objects with "name" and "value" variables
 *
 * @var {integer} id
 *		Identifying Number of Owner. Useful in cross class calculations
 * @var {string} name
 *		Name of Gear
 * @var {integer} value
 *		Value associated with Gear
 *		Could be quantity or Rating
 * @var {string[]} notes
 *		Array of Notes for Augmentation
 * @var {object[]} attributemods
 *		Array of Attribute Modifying Objects with "name" and "value" variables
 * @var {object[]} skillmods
 *		Array of Skill Modifying Objects with "name" and "value" variables
 * @var {boolean} enabled
 *		Flag for activating or deactivating modifiers
 *
 * @function replace()
 * @function draw()
 * @function drawEdit()
 * @function updateFromEdit()
 * @function toggle()
 * @function activate()
 * @function deactivate()
 */
function Gear(intOwnerID, strName, intValue, strArrNotes, strArrAttrMods, strArrSkillMods)
{
	this.id				= (intOwnerID		!== undefined) ? intOwnerID			: -1;
	this.name			= (strName			!== undefined) ? strName			: "";
	this.value			= (intValue			!== undefined) ? intValue			: 0;
	this.notes 			= (strArrNotes		!== undefined) ? strArrNotes		: [];
	this.attributemods	= (strArrAttrMods	!== undefined) ? strArrAttrMods		: [];
	this.skillmods		= (strArrSkillMods	!== undefined) ? strArrSkillMods	: [];
	this.enabled		= false;
	
	//Object Methods
	/**
	 * @function replace()
	 * Handles loading object with similar variables but no functions into
	 * Primary use is when loading character and session files
	 * 
	 * @param {object} objNew
	 * 		Object with similar variables to load
	 */
	this.replace	= function(objNew){
		this.name		= (objNew.name				!== undefined) ? objNew.name			: "";
		this.value		= (objNew.value				!== undefined) ? objNew.value			: 0;
		this.notes		= (objNew.notes				!== undefined) ? objNew.notes			: [];
		this.attributemods	= (objNew.attributemods	!== undefined) ? objNew.attributemods	: [];
		this.skillmods	= (objNew.skillmods			!== undefined) ? objNew.skillmods		: [];
		this.enabled	= (objNew.enabled			!== undefined) ? objNew.enabled			: [];
		return;
	}//end Gear::replace()

	/**
	 * @function draw()
	 * Formats class into an html table.
	 * 
	 * @param {integer} intId
	 * 		Identifier ensures each draw has a unique set of id's in DOM.
	 * 
	 * @return {string}
	 *		Html format of table to display class variables.
	 */
	this.draw		= function(intId){
		var tmpstr	="<table class=\"Gear\" id=\"Gear" + intId + removeSpecial(this.name) + "\"><tbody><tr>";
			tmpstr		+=	"<th class=\"GearName\" onclick=\"expand(Gear" + intId + removeSpecial(this.name) + ")\">" + this.name + "</th>";
			tmpstr		+=	"<td class=\"GearRating\" onclick=\"expand(Gear" + intId + removeSpecial(this.name) + ")\">";
			tmpstr		+=	(this.value != 0) ? this.value : "";
			tmpstr		+=	"</td>";
			tmpstr		+=	"<td><input type=\"checkbox\" id=\"Gear" + intId + removeSpecial(this.name) + "Toggle\" onclick=\"actchar.Gear[" + intId + "].toggle(" + intId + ")\"";
			if (this.enabled) tmpstr += " checked";
			tmpstr		+=	"></td>";
			//Drop Down section
			tmpstr		+=	"</tr><tr class=\"dropdownhidden\" id=\"Gear" + intId + removeSpecial(this.name) + "dropdown\" onclick=\"expand(Gear" + intId + removeSpecial(this.name) + ")\"><td colspan=\"2\">";
			//Draw Notes
			for (var i = 0; i < this.notes.length; i++) {
				tmpstr	+= this.notes[i] + "</br>"
			}
			//Draw Attributes Modifiers
			for (var i = 0; i < this.attributemods.length; i++) {
				tmpstr	+= this.attributemods[i]["name"] + "(" + this.attributemods[i]["value"] + ")" + "</br>"
			}
			//Draw Skill Modifiers
			for (var i = 0; i < this.skillmods.length; i++) {
				tmpstr	+= this.skillmods[i]["name"] + "(" + this.skillmods[i]["value"] + ")" + "</br>"
			}
			tmpstr		+="</td></tr>";
			tmpstr		+="</tr></tbody></table>";
		return tmpstr;
	}//end Gear::draw()

	/**
	 * @function drawEdit()
	 * Formats class into an html table to make object editable.
	 * 
	 * @param {integer} intId
	 * 		Identifier ensures each draw has a unique set of id's in DOM.
	 * 
	 * @return {string}
	 *		Html format of table to display class variables for editing.
	 */
	this.drawEdit		= function(intId){
		var tmpstr	=	"<table class=\"GearEdit\" id =\"Gear" + intId + "Edit\"><tbody>";
			tmpstr	+=		"<tr onclick=\"expand(Gear" + intId + "Edit)\"><td>";
			tmpstr	+=			"<input type=\"text\" class=\"GearName\" id=\"Gear" + intId + "EditName\" placeholder=\"Name\" value=\"" + this.name + "\">";
			tmpstr	+=		"</td><td>";
			tmpstr	+=			"<input type=\"text\" class=\"GearValue\" id=\"Gear" + intId + "EditValue\" placeholder=\"Value\" value=\"" + this.value + "\">";
			tmpstr	+=		"</td></tr>";
			//Drop Down Section
			tmpstr	+=		"<tr class=\"dropdownhidden\" id=\"Gear" + intId + "Editdropdown\"><td colspan=\"2\">";
			//Draw Notes
			tmpstr	+=			"<textarea cols=\"20\" rows=\"4\" id=\"Gear" + intId + "EditNotes\">";
			for (var i = 0; i < this.notes.length; i++) {
				tmpstr	+=	this.notes[i];
				tmpstr	+=	(i != (this.notes.length - 1)) ? "\n" : "";
			}
			tmpstr	+=			"</textarea>";
			tmpstr	+=		"</td></tr>";
			tmpstr	+=		"<tr><td colspan=\"2\" id=\"Gear" + intId + "EditAppliedMods\">";
			tmpstr	+=			"<button type=\"button\" class=\"GearModButton\"onclick=\"addModifierSlot(Gear" + intId + "EditAppliedMods, 'skills')\">+SkillMod+</button>";
			tmpstr	+=			"<button type=\"button\" class=\"GearModButton\"onclick=\"addModifierSlot(Gear" + intId + "EditAppliedMods, 'moddables')\">+OtherMod+</button>";
			//Draw Attribute Modifiers
			var x = 0;
			for (var i = 0; i < this.attributemods.length; i++) {
				tmpstr	+=	"<table class=\"Gear" + intId + "EditAppliedModsModSlot\"><tbody>";
				tmpstr	+=		"<tr>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearName\" list=\"moddables\" id=\"Gear" + intId + "EditAppliedMods" + x + "Name\" value=\"" + this.attributemods[i]["name"] + "\">";
				tmpstr	+=			"</td>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearValue\"type=\"number\" id=\"Gear" + intId + "EditAppliedMods" + x + "Value\" value=\"" + this.attributemods[i]["value"] + "\">"
				tmpstr	+=			"</td>";
				tmpstr	+=		"</tr>";
				tmpstr	+=	"</tbody></table>";
				x++;
			}
			//Draw Skill Modifiers
			for (var i = 0; i < this.skillmods.length; i++) {
				tmpstr	+=	"<table class=\"Gear" + intId + "EditAppliedModsModSlot\"><tbody>";
				tmpstr	+=		"<tr>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearName\" list=\"skills\" id=\"Gear" + intId + "EditAppliedMods" + x + "Name\" value=\"" + this.skillmods[i]["name"] + "\">";
				tmpstr	+=			"</td>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearValue\"type=\"number\" id=\"Gear" + intId + "EditAppliedMods" + x + "Value\" value=\"" + this.skillmods[i]["value"] + "\">"
				tmpstr	+=			"</td>";
				tmpstr	+=		"</tr>";
				tmpstr	+=	"</tbody></table>";
				x++;
			}
			tmpstr	+=		"</td></tr>";
			tmpstr	+=	"</tbody></table>";
		return tmpstr;
	}//end Gear::drawEdit()

	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(intId){
		this.name	= document.getElementById("Gear" + intId + "EditName").value;
		this.value	= parseInt(document.getElementById("Gear" + intId + "EditValue").value);
		this.value	= (isNaN(this.value)) ? 0 : this.value;
		this.notes	= document.getElementById("Gear" + intId + "EditNotes").value.split('\n');
		//Stat Modifiers
		var tmpelem = document.getElementsByClassName("Gear" + intId + "EditAppliedMods" + "ModSlot");
		for (var i = 0; i < tmpelem.length; i++) {
			var tmparr = {};
			tmparr["name"] = document.getElementById("Gear" + intId + "EditAppliedMods" + i + "Name").value;
			tmparr["value"] = parseInt(document.getElementById("Gear" + intId + "EditAppliedMods" + i + "Value").value);
			tmparr["value"] = (isNaN(tmparr["value"])) ? 0 : tmparr["value"];
			//Evaluate Modifiers as Skill or Attribute
			if(document.getElementById("Gear" + intId + "EditAppliedMods" + i + "Name").list.id == "moddables"){
				if (tmparr["name"] != "") this.attributemods.push(tmparr);
			}else{
				if (tmparr["name"] != "") this.skillmods.push(tmparr);
			}
		}
		return;
	}//end Gear::updateFromEdit()

	/**
	 * @function toggle()
	 * Evaluates current status of Modifiers Enabled flag and activates or deactivates them.
	 *
	 * @param intval
	 *		Element in Characters Augmentation Array to toggle as checked.
	 */
	this.toggle		= function(intval){
		if (this.enabled) {
			this.deactivate();
		}else{
			this.activate();
		}
		document.getElementById("Gear" + intval + removeSpecial(this.name) + "Toggle").checked = this.enabled;
		return;
	}//end Gear::toggle()

	/**
	 * @function activate()
	 * Sends modifiers off to be activated and sets flag
	 *
	 */
	this.activate	= function(){
		if (this.enabled) return;
		activateMods(this.attributemods, this.skillmods);
		this.enabled = true;
		return;
	}//end Gear::activate()

	/**
	 * @function deactivate()
	 * Sends modifiers off to be deactivated and unsets flag
	 *
	 */
	this.deactivate = function(){
		if (!this.enabled) return;
		deactivateMods(this.attributemods, this.skillmods);
		this.enabled = false;
		return;
	}//end Gear::deactivate()
}//end Gear
