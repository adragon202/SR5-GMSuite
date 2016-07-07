/**
 * @file
 *	Power Class
 *
 */

/**
 * @class Power()
 *	Handles Calculations and rendering of Power Data
 *
 * @param {integer} intOwnerID
 *		Identifying Number of Owner. Useful in cross class calculations
 * @param {string} strName
 *		Name for Power
 * @param {string[]} strArrNotes
 *		Array of Notes for Power
 * @param {string} strSource
 * @param {{}[]} objArrAttrMods
 *		Array of Attribute Modifying Objects with "name" and "value" variables
 * @param {string[]} objArrSkillMods
 *		Array of Skill Modifying Objects with "name" and "value" variables
 *
 * @var {integer} id
 *		Identifying Number of Owner. Useful in cross class calculations
 * @var {string} name
 *		Name for Power
 * @var {string[]} notes
 *		Array of Notes for Power
 * @var {string} source
 * @var {{}[]} attributemods
 *		Array of Attribute Modifying Objects with "name" and "value" variables
 * @var {string[]} skillmods
 *		Array of Skill Modifying Objects with "name" and "value" variables
 * @var {boolean} enabled
 *		Flag for if attribute and skill modifiers are active or inactive
 *
 * @function replace()
 * @function draw()
 * @function drawEdit()
 * @function updateFromEdit()
 * @function toggle()
 * @function activate()
 * @function deactivate()
 */
function Power(intOwnerID, strName, intRating, strArrNotes, strSource, strArrAttrMods, strArrSkillMods)
{
	this.id			= (intOwnerID			!== undefined) ? intOwnerID			: -1;
	this.name		= (strName				!== undefined) ? strName			: "";
	this.rating		= (intRating			!== undefined) ? intRating			: 0;
	this.notes		= (strArrNotes			!== undefined) ? strArrNotes		: [];
	this.source		= (strSource			!== undefined) ? strSource			: "";
	this.attributemods	= (strArrAttrMods	!== undefined) ? strArrAttrMods		: [];
	this.skillmods	= (strArrSkillMods		!== undefined) ? strArrSkillMods	: [];
	this.enabled	= false;
	
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
		this.rating		= (objNew.rating			!== undefined) ? objNew.rating			: 0;
		this.notes		= (objNew.notes				!== undefined) ? objNew.notes			: [];
		this.source		= (objNew.source			!== undefined) ? objNew.source			: "";
		this.attributemods	= (objNew.attributemods	!== undefined) ? objNew.attributemods	: [];
		this.skillmods	= (objNew.skillmods			!== undefined) ? objNew.skillmods		: [];
		this.enabled	= (objNew.enabled			!== undefined) ? objNew.enabled			: [];
		return;
	}//end Power::replace()

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
	this.draw	= function(intid){
		var colspan = 2;
		var tmpstr	="<table class=\"Power\" id=\"Power" + intid + removeSpecial(this.name) + "\"><tbody><tr>";
			tmpstr		+=	"<th class=\"PowerName\" onclick=\"expand(Power" + intid + removeSpecial(this.name) + ")\">" + this.name + "</th>";
			if (this.rating != 0){
				tmpstr		+=	"<td class=\"PowerRating\" onclick=\"expand(Power" + intid + removeSpecial(this.name) + ")\">" + this.rating + "</td>";
				colspan += 1;
			}
			tmpstr		+=	"<td><input type=\"checkbox\" id=\"Power" + intid + removeSpecial(this.name) + "Toggle\" onclick=\"actchar.Powers[" + intid + "].toggle(" + intid + ")\"";
			if (this.enabled) tmpstr += " checked";
			tmpstr		+=	"></td>";
			//Drop Down Section
			tmpstr		+=	"</tr><tr class=\"dropdownhidden\" id=\"Power" + intid + removeSpecial(this.name) + "dropdown\" onclick=\"expand(Power" + intid + removeSpecial(this.name) + ")\"><td colspan=\"" + colspan + "\">";
			tmpstr		+=	"Source: " + this.source + "</br>";
			//Draw Notes
			for (var i = 0; i < this.notes.length; i++) {
				tmpstr		+=	this.notes[i] + "</br>";
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
	}//end Power::draw()

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
	this.drawEdit	= function(intId){
		var tmpstr	= "";
			tmpstr	="<table class=\"Power\" id=\"Power" + intId + "Edit\"><tbody><tr>";
			tmpstr	+=		"<th class=\"PowerName\" onclick=\"expand(Power" + intId + "Edit)\">";
			tmpstr	+=		"<input type=\"text\" id=\"Power" + intId + "EditName\" value=\"" + this.name + "\" placeholder=\"Name\"></th>";
			tmpstr	+=		"<td class=\"PowerRating\" onclick=\"expand(Power" + intId + "Edit)\"><input type=\"text\" id=\"Power" + intId + "EditRating\"" + this.rating + "></td>";
			//Drop Down Section
			tmpstr	+=	"</tr><tr class=\"dropdownhidden\" id=\"Power" + intId + "Editdropdown\"><td colspan=\"2\">";
			tmpstr	+=		"Source: <input type\"text\" id=\"Power" + intId + "EditSource\" value=\"" + this.source + "\" placeholder=\"Source\"></br>";
			tmpstr	+=		"<textarea cols=\"20\" rows=\"4\" id=\"Power" + intId + "EditNotes\" placeholder=\"Notes\">";
			for (var i = 0; i < this.notes.length; i++) {
				tmpstr	+=	this.notes[i];
				tmpstr	+=	(i != (this.notes.length - 1)) ? "\n" : "";
			}
			tmpstr	+=		"</textarea>"
			tmpstr	+=	"</td></tr>";
			tmpstr	+=	"<tr><td colspan=\"2\" id=\"Power" + intId + "EditAppliedMods\">";
			tmpstr	+=		"<button type=\"button\" class=\"GearModButton\"onclick=\"addModifierSlot(Power" + intId + "EditAppliedMods, 'skills')\">+SkillMod+</button>";
			tmpstr	+=		"<button type=\"button\" class=\"GearModButton\"onclick=\"addModifierSlot(Power" + intId + "EditAppliedMods, 'moddables')\">+OtherMod+</button>";
			//Draw Attribute Modifiers
			var x = 0;
			for (var i = 0; i < this.attributemods.length; i++) {
				tmpstr	+=	"<table class=\"Power" + intId + "EditAppliedModsModSlot\"><tbody>";
				tmpstr	+=		"<tr>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearName\" list=\"moddables\" id=\"Power" + intId + "EditAppliedMods" + x + "Name\" value=\"" + this.attributemods[i]["name"] + "\">";
				tmpstr	+=			"</td>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearValue\"type=\"number\" id=\"Power" + intId + "EditAppliedMods" + x + "Value\" value=\"" + this.attributemods[i]["value"] + "\">"
				tmpstr	+=			"</td>";
				tmpstr	+=		"</tr>";
				tmpstr	+=	"</tbody></table>";
				x++;
			}
			//Draw Skill Modifiers
			for (var i = 0; i < this.skillmods.length; i++) {
				tmpstr	+=	"<table class=\"Power" + intId + "EditAppliedModsModSlot\"><tbody>";
				tmpstr	+=		"<tr>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearName\" list=\"skills\" id=\"Power" + intId + "EditAppliedMods" + x + "Name\" value=\"" + this.skillmods[i]["name"] + "\">";
				tmpstr	+=			"</td>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearValue\"type=\"number\" id=\"Power" + intId + "EditAppliedMods" + x + "Value\" value=\"" + this.skillmods[i]["value"] + "\">"
				tmpstr	+=			"</td>";
				tmpstr	+=		"</tr>";
				tmpstr	+=	"</tbody></table>";
				x++;
			}
			tmpstr	+=	"</td></tr>";
			tmpstr	+="</tbody></table>";
		return tmpstr;
	}//end Power::drawEdit();

	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(intId){
		this.name	= document.getElementById("Power" + intId + "EditName").value;
		this.rating	= document.getElementById("Power" + intId + "EditRating").value;
		this.notes	= document.getElementById("Power" + intId + "EditNotes").value.split('\n');
		this.source	= document.getElementById("Power" + intId + "EditSource").value;
		//Stat Modifiers
		var tmpelem = document.getElementsByClassName("Power" + intId + "EditAppliedMods" + "ModSlot");
		this.attributemods	= [];
		this.skillmods		= [];
		for (var i = 0; i < tmpelem.length; i++) {
			var tmparr = {};
			tmparr["name"] = document.getElementById("Power" + intId + "EditAppliedMods" + i + "Name").value;
			tmparr["value"] = parseInt(document.getElementById("Power" + intId + "EditAppliedMods" + i + "Value").value);
			tmparr["value"] = (isNaN(tmparr["value"])) ? 0 : tmparr["value"];
			if(document.getElementById("Power" + intId + "EditAppliedMods" + i + "Name").list.id == "moddables"){
				if (tmparr["name"] != "") this.attributemods.push(tmparr);
			}else{
				if (tmparr["name"] != "") this.skillmods.push(tmparr);
			}
		}
		return;
	}//end Power::updateFromEdit()

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
		document.getElementById("Power" + intval + removeSpecial(this.name) + "Toggle").checked = this.enabled;
		return;
	}//end Power::toggle()

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
	}//end Power::activate()

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
	}//end Power::deactivate()
}//end Power()
