/**
 * @file
 *		Quality Class
 *
 */

/**
 * @class Quality()
 *	Handles Calculations and rendering of Quality Data
 *
 * @param {integer} intOwnerID
 *		Identifying Number of Owner. Useful in cross class calculations
 * @param {string} strName
 *		Name for Quality
 * @param {string[]} strArrNotes
 *		Array of Notes for Quality
 * @param {string} strSource
 * @param {{}[]} objArrAttrMods
 *		Array of Attribute Modifying Objects with "name" and "value" variables
 * @param {string[]} objArrSkillMods
 *		Array of Skill Modifying Objects with "name" and "value" variables
 *
 * @var {integer} id
 *		Identifying Number of Owner. Useful in cross class calculations
 * @var {string} name
 *		Name for Quality
 * @var {string[]} notes
 *		Array of Notes for Quality
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
function Quality(intOwnerID, strName, intRating, strArrNotes, strSource, strArrAttrMods, strArrSkillMods)
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
	}//end Quality::replace()

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
		var colspan = 2;
		var tmpstr	="<table class=\"Quality\" id=\"Quality" + intId + removeSpecial(this.name) + "\"><tbody><tr>";
			tmpstr		+=	"<th class=\"QualityName\" onclick=\"expand(Quality" + intId + removeSpecial(this.name) + ")\">" + this.name + "</th>"
			if (this.rating != 0){
				tmpstr		+=	"<td class=\"QualityRating\" onclick=\"expand(Quality" + intId + removeSpecial(this.name) + ")\">" + this.rating + "</td>";
				colspan += 1;
			}
			tmpstr		+=	"<td><input type=\"checkbox\" id=\"Quality" + intId + removeSpecial(this.name) + "Toggle\" onclick=\"actchar.Qualities[" + intId + "].toggle(" + intId + ")\"";
			if (this.enabled) tmpstr += " checked";
			tmpstr		+=	"></td>";
			//Drop Down Section
			tmpstr		+=	"</tr><tr class=\"dropdownhidden\" id=\"Quality" + intId + removeSpecial(this.name) + "dropdown\" onclick=\"expand(Quality" + intId + removeSpecial(this.name) + ")\"><td colspan=\"" + colspan + "\">";
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
	}//end Quality::draw()

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
		var tmpstr = "";
			tmpstr	= "<table class=\"Quality\" id=\"Quality" + intId + "Edit\"><tbody><tr>";
			tmpstr	+=		"<th class=\"QualityName\" onclick=\"expand(Quality" + intId + "Edit)\"><input type=\"text\" id=\"Quality" + intId + "EditName\" value=\"" + this.name + "\"></th>";
			tmpstr	+=		"<td class=\"QualityRating\" onclick=\"expand(Quality" + intId + "Edit)\"><input type=\"number\" id=\"Quality" + intId + "EditRating\" value=\"" + this.rating + "\"></td>";
			//Drop Down Section
			tmpstr	+=	"</tr><tr class=\"dropdownhidden\" id=\"Quality" + intId + "Editdropdown\"><td colspan=\"2\">";
			tmpstr	+=		"Source: <input type=\"text\" id=\"Quality" + intId + "EditSource\" value=\"" + this.source + "\"></br>";
			tmpstr	+=		"<textarea cols=\"20\" rows=\"4\" id=\"Quality" + intId + "EditNotes\">";
			for (var i = 0; i < this.notes.length; i++) {
				tmpstr	+=	this.notes[i];
				tmpstr	+=	(i != (this.notes.length - 1)) ? "\n" : "";
			}
			tmpstr	+=		"</textarea>";
			tmpstr	+=	"</td></tr>";
			tmpstr	+=	"<tr><td colspan=\"2\" id=\"Quality" + intId + "EditAppliedMods\">";
			tmpstr	+=		"<button type=\"button\" class=\"GearModButton\"onclick=\"addModifierSlot(Quality" + intId + "EditAppliedMods, 'skills')\">+SkillMod+</button>";
			tmpstr	+=		"<button type=\"button\" class=\"GearModButton\"onclick=\"addModifierSlot(Quality" + intId + "EditAppliedMods, 'moddables')\">+OtherMod+</button>";
			//Draw Attribute Modifiers
			var x = 0;
			for (var i = 0; i < this.attributemods.length; i++) {
				tmpstr	+=	"<table class=\"Quality" + intId + "EditAppliedModsModSlot\"><tbody>";
				tmpstr	+=		"<tr>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearName\" list=\"moddables\" id=\"Quality" + intId + "EditAppliedMods" + x + "Name\" value=\"" + this.attributemods[i]["name"] + "\">";
				tmpstr	+=			"</td>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearValue\"type=\"number\" id=\"Quality" + intId + "EditAppliedMods" + x + "Value\" value=\"" + this.attributemods[i]["value"] + "\">"
				tmpstr	+=			"</td>";
				tmpstr	+=		"</tr>";
				tmpstr	+=	"</tbody></table>";
				x++;
			}
			//Draw Skill Modifiers
			for (var i = 0; i < this.skillmods.length; i++) {
				tmpstr	+=	"<table class=\"Quality" + intId + "EditAppliedModsModSlot\"><tbody>";
				tmpstr	+=		"<tr>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearName\" list=\"skills\" id=\"Quality" + intId + "EditAppliedMods" + x + "Name\" value=\"" + this.skillmods[i]["name"] + "\">";
				tmpstr	+=			"</td>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearValue\"type=\"number\" id=\"Quality" + intId + "EditAppliedMods" + x + "Value\" value=\"" + this.skillmods[i]["value"] + "\">"
				tmpstr	+=			"</td>";
				tmpstr	+=		"</tr>";
				tmpstr	+=	"</tbody></table>";
				x++;
			}
			tmpstr	+=	"</td></tr>";
			tmpstr	+="</tbody></table>";
		return tmpstr;
	}//end Quality::drawEdit()

	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(intId){
		this.name	= document.getElementById("Quality" + intId + "EditName").value;
		this.rating	= document.getElementById("Quality" + intId + "EditRating").value;
		this.notes	= document.getElementById("Quality" + intId + "EditNotes").value.split('\n');
		this.source	= document.getElementById("Quality" + intId + "EditSource").value;
		//Stat Modifiers
		var tmpelem = document.getElementsByClassName("Quality" + intId + "EditAppliedMods" + "ModSlot");
		for (var i = 0; i < tmpelem.length; i++) {
			var tmparr = {};
			tmparr["name"] = document.getElementById("Quality" + intId + "EditAppliedMods" + i + "Name").value;
			tmparr["value"] = parseInt(document.getElementById("Quality" + intId + "EditAppliedMods" + i + "Value").value);
			tmparr["value"] = (isNaN(tmparr["value"])) ? 0 : tmparr["value"];
			if(document.getElementById("Quality" + intId + "EditAppliedMods" + i + "Name").list.id == "moddables"){
				if (tmparr["name"] != "") this.attributemods.push(tmparr);
			}else{
				if (tmparr["name"] != "") this.skillmods.push(tmparr);
			}
		}
		return;
	}//end Quality::updateFromEdit()

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
		document.getElementById("Quality" + intval + removeSpecial(this.name) + "Toggle").checked = this.enabled;
		return;
	}//end Quality::toggle()

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
	}//end Quality::activate()

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
	}//end Quality::deactivate()
}//end Quality
