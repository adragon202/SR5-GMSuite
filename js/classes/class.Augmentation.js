/**
 * @file
 * Augmentation Class
 *
 */

/**
 * @class
 * Handles calculations and rendering of Augmentation data
 * 
 * @param {integer} intOwnerID
 *		Identifying Number of Owner. Useful in cross class calculations
 * @param {string} strName
 *		Name for Augmentation
 * @param {integer} intEssence
 * @param {integer} intCapacity
 * @param {string[]} strArrNotes
 *		Array of Notes for Augmentation
 * @param {string[]} strArrMods
 *		Array of Augmentation Names associated with Augmentation
 * @param {string} strSource
 * @param {{}[]} objArrAttrMods
 *		Array of Attribute Modifying Objects with "name" and "value" variables
 * @param {string[]} objArrSkillMods
 *		Array of Skill Modifying Objects with "name" and "value" variables
 *
 * @var {integer} id
 *		Identifying Number of Owner. Useful in cross class calculations
 * @var {string} name
 *		Name for Augmentation
 * @var {integer} essence
 * @var {integer} capacity
 * @var {string[]} notes
 *		Array of Notes for Augmentation
 * @var {string[]} mods
 *		Array of Augmentation Names associated with Augmentation
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
function Augmentation(intOwnerID, strName, intEssence, intCapacity, strArrNotes, strArrMods, strSource, objArrAttrMods, objArrSkillMods)
{
	this.id			= (intOwnerID			!== undefined) ? intOwnerID			: -1;
	this.name		= (strName				!== undefined) ? strName			: "";
	this.essence	= (intEssence			!== undefined) ? intEssence			: 0;
	this.capacity	= (intCapacity			!== undefined) ? intCapacity		: 0;
	this.notes 		= (strArrNotes			!== undefined) ? strArrNotes		: [];
	this.mods 		= (strArrMods			!== undefined) ? strArrMods			: [];
	this.source		= (strSource			!== undefined) ? strSource			: "";
	this.attributemods	= (objArrAttrMods	!== undefined) ? objArrAttrMods		: [];
	this.skillmods	= (objArrSkillMods		!== undefined) ? objArrSkillMods	: [];
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
		this.essence	= (objNew.essence			!== undefined) ? objNew.essence			: 0;
		this.capacity	= (objNew.capacity			!== undefined) ? objNew.capacity		: 0;
		this.notes		= (objNew.notes				!== undefined) ? objNew.notes			: [];
		this.mods		= (objNew.mods				!== undefined) ? objNew.mods			: [];
		this.source		= (objNew.source			!== undefined) ? objNew.source			: "";
		this.attributemods	= (objNew.attributemods	!== undefined) ? objNew.attributemods	: [];
		this.skillmods	= (objNew.skillmods		!== undefined) ? objNew.skillmods		: [];
		this.enabled	= (objNew.enabled			!== undefined) ? objNew.enabled			: [];
		return;
	}//end Augmentation::replace()

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
		var tmpstr	="<table class=\"Augmentation\" id=\"Augmentation" + intId + removeSpecial(this.name) + "\"><tbody><tr>";
			tmpstr		+=	"<th class=\"AugmentationName\" onclick=\"expand(Augmentation" + intId + removeSpecial(this.name) + ")\">" + this.name + "</th>";
			tmpstr		+=	"<td class=\"AugmentationEssence\" onclick=\"expand(Augmentation" + intId + removeSpecial(this.name) + ")\">" + this.essence + "</td>";
			tmpstr		+=	"<td class=\"AugmentationCapacity\" onclick=\"expand(Augmentation" + intId + removeSpecial(this.name) + ")\">[" + this.capacity + "]</td>";
			tmpstr		+=	"<td><input type=\"checkbox\" id=\"Augmentation" + intId + removeSpecial(this.name) + "Toggle\" onclick=\"actchar.Augmentations[" + intId + "].toggle(" + intId + ")\"";
			if (this.enabled) tmpstr += " checked";
			tmpstr		+=	"></td>";
			//Drop Down section
			tmpstr		+=	"</tr><tr class=\"dropdownhidden\" id=\"Augmentation" + intId + removeSpecial(this.name) + "dropdown\" onclick=\"expand(Augmentation" + intId + removeSpecial(this.name) + ")\"><td colspan=\"4\">";
			tmpstr		+=	"Source: " + this.source + "</br>";
			//Draw Mods
			for (var i = 0; i < this.mods.length; i++) {
				tmpstr	+= this.mods[i] + "</br>"
			}
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
			tmpstr		+=	"</td></tr>";
			tmpstr		+=	"</tr></tbody></table>";
		return tmpstr;
	}//end Augmentation::draw()

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
			tmpstr	+=	"<table class=\"Augmentation\" id=\"Augmentation" + intId + "Edit\"><tbody><tr>";
			tmpstr	+=	"<th class=\"AugmentationName\" onclick=\"expand(Augmentation" + intId + "Edit)\" colspan=\"2\"><input type=\"text\" id=\"Augmentation" + intId + "EditName\" value=\"" + this.name + "\"></th>";
			tmpstr	+=	"</tr><tr>"
			tmpstr	+=		"<td class=\"AugmentationEssence\" onclick=\"expand(Augmentation" + intId + "Edit)\"><input type=\"number\" id=\"Augmentation" + intId + "EditEssence\" value=\"" + this.essence + "\"></td>";
			tmpstr	+=		"<td class=\"AugmentationCapacity\" onclick=\"expand(Augmentation" + intId + "Edit)\"><input type=\"number\" id=\"Augmentation" + intId + "EditCapacity\" value=\"" + this.capacity + "\"></td>";
			//Dropdown Section
			tmpstr	+=	"</tr><tr class=\"dropdownhidden\" id=\"Augmentation" + intId + "Editdropdown\"><td colspan=\"2\">";
			tmpstr	+=		"Source:<input type=\"text\" id=\"Augmentation" + intId + "EditSource\" value=\"" + this.source + "\"></br>";
			//Draw Augmentation Modifiers
			tmpstr	+=		"<textarea cols=\"20\" rows=\"4\" id=\"Augmentation" + intId + "EditMods\">";
			for (var i = 0; i < this.mods.length; i++) {
				tmpstr	+= this.mods[i] + "\n"
			}
			tmpstr	+=		"</textarea></br>";
			//Draw Notes
			tmpstr	+=		"<textarea cols=\"20\" rows=\"4\" id=\"Augmentation" + intId + "EditNotes\">";
			for (var i = 0; i < this.notes.length; i++) {
				tmpstr	+= this.notes[i];
				tmpstr	+=	(i != (this.notes.length - 1)) ? "\n" : "";
			}
			tmpstr	+=		"</textarea></br>";
			tmpstr	+=	"</td></tr>";
			tmpstr	+=	"<tr><td colspan=\"2\" id=\"Augmentation" + intId + "EditAppliedMods\">";
			tmpstr	+=		"<button type=\"button\" class=\"GearModButton\"onclick=\"addModifierSlot(Augmentation" + intId + "EditAppliedMods, 'skills')\">+SkillMod+</button>";
			tmpstr	+=		"<button type=\"button\" class=\"GearModButton\"onclick=\"addModifierSlot(Augmentation" + intId + "EditAppliedMods, 'moddables')\">+OtherMod+</button>";
			//Draw Attribute Modifiers
			var x = 0;
			for (var i = 0; i < this.attributemods.length; i++) {
				tmpstr	+=	"<table class=\"Augmentation" + intId + "EditAppliedModsModSlot\"><tbody>";
				tmpstr	+=		"<tr>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearName\" list=\"moddables\" id=\"Augmentation" + intId + "EditAppliedMods" + x + "Name\" value=\"" + this.attributemods[i]["name"] + "\">";
				tmpstr	+=			"</td>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearValue\"type=\"number\" id=\"Augmentation" + intId + "EditAppliedMods" + x + "Value\" value=\"" + this.attributemods[i]["value"] + "\">"
				tmpstr	+=			"</td>";
				tmpstr	+=		"</tr>";
				tmpstr	+=	"</tbody></table>";
				x++;
			}
			//Draw Skill Modifiers
			for (var i = 0; i < this.skillmods.length; i++) {
				tmpstr	+=	"<table class=\"Augmentation" + intId + "EditAppliedModsModSlot\"><tbody>";
				tmpstr	+=		"<tr>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearName\" list=\"skills\" id=\"Augmentation" + intId + "EditAppliedMods" + x + "Name\" value=\"" + this.skillmods[i]["name"] + "\">";
				tmpstr	+=			"</td>";
				tmpstr	+=			"<td>";
				tmpstr	+=				"<input class=\"GearValue\"type=\"number\" id=\"Augmentation" + intId + "EditAppliedMods" + x + "Value\" value=\"" + this.skillmods[i]["value"] + "\">"
				tmpstr	+=			"</td>";
				tmpstr	+=		"</tr>";
				tmpstr	+=	"</tbody></table>";
				x++;
			}
			tmpstr	+=	"</td></tr>";
			tmpstr	+=	"</tbody></table>";
		return tmpstr;
	}//end Augmentation::drawEdit()
	
	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(intId){
		console.log("Updating Augmentation " + intId);
		this.name			= document.getElementById("Augmentation" + intId + "EditName").value;
		this.essence		= document.getElementById("Augmentation" + intId + "EditEssence").value;
		this.capacity		= document.getElementById("Augmentation" + intId + "EditCapacity").value;
		this.mods			= document.getElementById("Augmentation" + intId + "EditMods").value.split('\n');
		this.notes			= document.getElementById("Augmentation" + intId + "EditNotes").value.split('\n');
		this.source			= document.getElementById("Augmentation" + intId + "EditSource").value;
		this.attributemods	= [];
		this.skillmods		= [];
		//Stat Modifiers
		var tmpelem = document.getElementsByClassName("Augmentation" + intId + "EditAppliedModsModSlot");
		for (var i = 0; i < tmpelem.length; i++) {
			var tmparr = {};
			console.log("Getting Augmentation " + intId + " Mod " + i );
			tmparr["name"] = document.getElementById("Augmentation" + intId + "EditAppliedMods" + i + "Name").value;
			tmparr["value"] = parseInt(document.getElementById("Augmentation" + intId + "EditAppliedMods" + i + "Value").value);
			tmparr["value"] = (isNaN(tmparr["value"])) ? 0 : tmparr["value"];
			if(document.getElementById("Augmentation" + intId + "EditAppliedMods" + i + "Name").list.id == "moddables"){
				console.log("Augmentation " + intId + " Mod " + i + " is Moddable");
				if (tmparr["name"] != "") this.attributemods.push(tmparr);
			}else{
				console.log("Augmentation " + intId + " Mod " + i + " is Skill");
				if (tmparr["name"] != "") this.skillmods.push(tmparr);
			}
		}
		return;
	}//end Augmentation::updateFromEdit()

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
		document.getElementById("Augmentation" + intval + removeSpecial(this.name) + "Toggle").checked = this.enabled;
		return;
	}//end Augmentation::toggle()

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
	}//end Augmentation::activate()

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
	}//end Augmentation::deactivate()
}//end Augmentation()
