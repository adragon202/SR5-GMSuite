/**
 * @file
 *	Spell Class
 *
 */

/**
 * @class Spell()
 *	Handles drawing and calculations for Spell Data
 *
 * @param {integer}		intOwnerID
 * 		Character Id that the Armor is assigned to.
 *		Useful with cross class interactions within Character.
 * @param {string}		strName
 *		Name assigned to Skill
 * @param {string}		strCategory
 * @param {string[]}	strArrEffects
 * @param {string}		strType
 * @param {string}		strRange
 * @param {string}		strDamage
 * @param {string}		strDuration
 * @param {integer}		intDrainMod
 * @param {string[]}	strArrNotes
 * @param {string}		strSource
 *
 * @var {integer}	id
 * 		Character Id that the Armor is assigned to.
 *		Useful with cross class interactions within Character.
 * @var {string}	name
 * @var {string}	category
 * @var {string[]}	effects
 * @var {string}	type
 * @var {string}	range
 * @var {string}	damage
 * @var {string}	duration
 * @var {integer}	drainmod
 * @var {string[]}	notes
 * @var {string}	source
 * @var {boolean}	sustained
 *
 * @function replace()
 * @function draw()
 * @function drawStatTable()
 * @function drawEdit()
 * @function drawStatTableEdit()
 * @function updateFromEdit()
 */
function Spell(intOwnerID, strName, strCategory, strArrEffects, strType, strRange, strDamage, strDuration, intDrainMod, strArrNotes, strSource)
{
	this.id			= (intOwnerID		!== undefined) ? intOwnerID		: -1;
	this.name		= (strName			!== undefined) ? strName		: "";
	this.category	= (strCategory		!== undefined) ? strCategory	: "";
	this.effects	= (strArrEffects	!== undefined) ? strArrEffects	: [];
	this.type		= (strType			!== undefined) ? strType		: "";
	this.range		= (strRange			!== undefined) ? strRange		: "";
	this.damage		= (strDamage		!== undefined) ? strDamage		: "";
	this.duration	= (strDuration		!== undefined) ? strDuration	: "";
	this.drainmod	= (intDrainMod		!== undefined) ? intDrainMod	: 0;
	this.notes		= (strArrNotes		!== undefined) ? strArrNotes	: "";
	this.source		= (strSource		!== undefined) ? strSource		: "Core";
	this.sustained	= false;
	
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
		this.name		= (objNew.name		!== undefined) ? objNew.name		: "";
		this.category	= (objNew.category	!== undefined) ? objNew.category	: "";
		this.effects	= (objNew.effects	!== undefined) ? objNew.effects		: [];
		this.type		= (objNew.type		!== undefined) ? objNew.type		: "";
		this.range		= (objNew.range		!== undefined) ? objNew.range		: "";
		this.damage		= (objNew.damage	!== undefined) ? objNew.damage		: "";
		this.duration	= (objNew.duration	!== undefined) ? objNew.duration	: "";
		this.drainmod	= (objNew.drainmod	!== undefined) ? objNew.drainmod	: 0;
		this.notes		= (objNew.notes		!== undefined) ? objNew.notes		: "";
		this.source		= (objNew.source	!== undefined) ? objNew.source		: "Core";
		this.sustained	= (objNew.sustained	!== undefined) ? objNew.sustained	: false;
		return;
	}//end Spell::replace()

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
	this.draw	= function(intId){
		var colspan = 2;
		var tmpstr	=	"<table class=\"Spell\" id=\"Spell" + intId + removeSpecial(this.name) + "\"><tbody><tr>";
			tmpstr	+=			"<th class=\"SpellName\" onclick=\"expand(Spell" + intId + removeSpecial(this.name) + ")\">" + this.name + "</th>";
			//Introduced 
			if (this.duration == "S") {
				tmpstr +=		"<td class=\"ToggleSpell\"><input type=\"checkbox\" name=\"ToggleBox\" id=\"SpellToggle" + intId + removeSpecial(this.name) + "\" onclick=\"toggleSpell(Spell" + intId + removeSpecial(this.name) + ")\"";
				if (this.sustained) {
					tmpstr +=	" checked";
				}
				tmpstr += 		"></td>";
				colspan += 1;
			}
			tmpstr	+=			"<td class=\"SpellCategory\" onclick=\"expand(Spell" + intId + removeSpecial(this.name) + ")\">" + this.category + "</td>";
			tmpstr	+=		"</tr><tr class=\"dropdownhidden\" id=\"Spell" + intId + removeSpecial(this.name) + "dropdown\" onclick=\"expand(Spell" + intId + removeSpecial(this.name) + ")\"><td colspan=\"" + colspan + "\">";
			tmpstr	+=			this.drawStatTable(intId) + "</br>";
			for (var i = 0; i < this.notes.length; i++) {
				tmpstr	+=	this.notes[i] + "</br>";
			}
			tmpstr	+=		"</td></tr>";
			tmpstr	+=	"</tbody></table>";
		return tmpstr;
	}//end Spell::draw()

	/**
	 * @function drawStatTable()
	 * Formats class into an html stat table.
	 * 
	 * @param {integer} intId
	 * 		Identifier ensures each draw has a unique set of id's in DOM.
	 * 
	 * @return {string}
	 *		Html format of table to display class variables.
	 */
	this.drawStatTable	= function(intId){
		var tmpstr	=	"<table class=\"SpellStats\"><tbody>"
			tmpstr	+=		"<caption><strong>("
			for (var i = 0; i < this.effects.length; i++) {
				tmpstr += this.effects[i];
				if (i != this.effects.length - 1) tmpstr += ",";
			}
			tmpstr	+=		")</strong></caption>";
			tmpstr	+=		"<tr>";
			tmpstr	+=			"<th>Type:</th><td>" + this.type + "</td>";
			tmpstr	+=			"<th>Range:</th><td>" + this.range + "</td>";
			tmpstr	+=			"<th>Damage:</th><td>" + this.damage + "</td>";
			tmpstr	+=		"</tr>";
			tmpstr	+=		"<tr>";
			tmpstr	+=			"<th>Duration:</th><td>" + this.duration + "</td>";
			tmpstr	+=			"<th>Drain:</th><td>F";
								if (this.drainmod > 0) tmpstr += "+";
								if (this.drainmod != 0) tmpstr += this.drainmod;
			tmpstr	+=			"</td>";
			tmpstr	+=			"<th>Source:</th><td>" + this.source + "</td>";
			tmpstr	+=		"</tr>";
			tmpstr	+=	"</tbody></table>";
		return tmpstr;
	}//end Spell::drawStatTable()

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
			tmpstr	+=	"<table class=\"Spell\" id=\"Spell" + intId + "Edit\"><tbody><tr>";
			tmpstr	+=			"<th class=\"SpellName\" onclick=\"expand(Spell" + intId + "Edit)\">"
			tmpstr	+=			"<input type=\"text\" id=\"Spell" + intId + "EditName\" value=\"" + this.name + "\" placeholder=\"Name\"></th>";
			tmpstr	+=			"<td class=\"SpellCategory\" onclick=\"expand(Spell" + intId + "Edit)\">"
			tmpstr	+=			"<input type=\"text\" id=\"Spell" + intId + "EditCategory\" value=\"" + this.category + "\" placeholder=\"Category\"></td>";
			//Drop Down Section
			tmpstr	+=		"</tr><tr class=\"dropdownhidden\" id=\"Spell" + intId + "Editdropdown\"><td colspan=\"2\">";
			tmpstr	+=			this.drawStatTableEdit(intId) + "</br>";
			tmpstr	+=			"<textarea cols=\"40\" rows=\"4\" id=\"Spell" + intId + "EditNotes\" placeholder=\"Notes\">";
			for (var i = 0; i < this.notes.length; i++) {
				tmpstr	+=	this.notes[i];
				tmpstr	+=	(i != (this.notes.length - 1)) ? "\n" : "";
			}
			tmpstr	+=			"</textarea>";
			tmpstr	+=		"</td></tr>";
			tmpstr	+=	"</tbody></table>";
		return tmpstr;
	}//end Spell:drawEdit()

	/**
	 * @function drawStatTableEdit()
	 * Formats class stats into an html Stat table to make object editable.
	 * 
	 * @param {integer} intId
	 * 		Identifier ensures each draw has a unique set of id's in DOM.
	 * 
	 * @return {string}
	 *		Html format of table to display class variables for editing.
	 */
	this.drawStatTableEdit = function(intId){
		var tmpstr = "";
			tmpstr	+=	"<table class=\"SpellStats\"><tbody>"
			tmpstr	+=		"<caption><strong>("
			tmpstr	+=		"<textarea cols=\"15\" rows=\"2\" id=\"Spell" + intId + "EditEffects\" placeholder=\"Effects\">";
			for (var i = 0; i < this.effects.length; i++) {
				tmpstr += this.effects[i] + "\n";
			}
			tmpstr	+=		"</textarea>";
			tmpstr	+=		")</strong></caption>";
			tmpstr	+=		"<tr>";
			tmpstr	+=			"<th>Type:</th><td>";
			tmpstr	+=			"<input type=\"text\" id=\"Spell" + intId + "EditType\" style=\"width:20px;\" value=\"" + this.type + "\"></td>";
			tmpstr	+=			"<th>Range:</th><td>";
			tmpstr	+=			"<input type=\"text\" id=\"Spell" + intId + "EditRange\" style=\"width:20px;\" value=\"" + this.range + "\"></td>";
			tmpstr	+=			"<th>Damage:</th><td>";
			tmpstr	+=			"<input type=\"text\" id=\"Spell" + intId + "EditDamage\" style=\"width:20px;\" value=\"" + this.damage + "\"></td>";
			tmpstr	+=		"</tr>";
			tmpstr	+=		"<tr>";
			tmpstr	+=			"<th>Duration:</th><td>";
			tmpstr	+=			"<input type=\"text\" id=\"Spell" + intId + "EditDuration\" style=\"width:20px;\" value=\"" + this.duration + "\"></td>";
			tmpstr	+=			"<th>Drain:</th><td>F+";
			tmpstr	+=			"<input type=\"text\" id=\"Spell" + intId + "EditDrainMod\" style=\"width:20px;\" value=\"" + this.drainmod + "\"></td>";
			tmpstr	+=			"<th>Source:</th><td>";
			tmpstr	+=			"<input type=\"text\" id=\"Spell" + intId + "EditSource\" style=\"width:60px;\" value=\"" + this.source + "\"></td>";
			tmpstr	+=		"</tr>";
			tmpstr	+=	"</tbody></table>";
		return tmpstr;
	}//end Spell::drawStatTableEdit()

	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(intId){
		if (document.getElementById("Spell" + intId + "EditName") == null) return;
		this.name		= document.getElementById("Spell" + intId + "EditName").value;
		this.category	= document.getElementById("Spell" + intId + "EditCategory").value;
		this.effects	= document.getElementById("Spell" + intId + "EditEffects").value.split('\n');
		this.type		= document.getElementById("Spell" + intId + "EditType").value;
		this.range		= document.getElementById("Spell" + intId + "EditRange").value;
		this.damage		= document.getElementById("Spell" + intId + "EditDamage").value;
		this.duration	= document.getElementById("Spell" + intId + "EditDuration").value;
		this.drainmod	= document.getElementById("Spell" + intId + "EditDrainMod").value;
		this.note		= document.getElementById("Spell" + intId + "EditNotes").value.split('\n');
		this.source		= document.getElementById("Spell" + intId + "EditSource").value;
		return;
	}//end Spell::updateFromEdit()
}//end Spell()