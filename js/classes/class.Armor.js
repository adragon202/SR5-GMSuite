/**
 * @file
 * Armor Class for Characters
 * 
 * Handles Drawing standard and edit formats for Armor
 * May handle calculations and toggling in the future.
 */

/**
 * @class
 * 
 * Default values and input assignment made at top
 * Initial function calls at the bottom
 *
 * @param {integer} intOwnerID
 * 		Character Id that the Armor is assigned to.
 *		Useful with cross class interactions within Character.
 * @param {string} strName
 * 		Name for identifying armor.
 * @param {integer} intRating
 * 		Rating assigned to armor for calculations.
 * @param {string[]} strArrMods
 * 		Modififications to Armor.
 * 
 * @var {integer} id
 *		Character Id that the Armor is assigned to.
 * @var {string} name
 * 		Name for identifying armor.
 * @var {integer} rating
 * 		Rating assigned to armor for calculations.
 * @var {string[]} mods
 * 		Modififications to Armor.
 * 
 * @function replace()
 * @function draw()
 * @function drawEdit()
 * @function updateFromEdit()
 */
function Armor(intOwnerID, strName, intRating, strArrMods)
{
	//variables
	this.id			= (intOwnerID	!== undefined) ? intOwnerID	: -1;
	this.name		= (strName		!== undefined) ? strName	: "";
	this.rating		= (intRating	!== undefined) ? intRating	: 0;
	this.mods 		= (strArrMods	!== undefined) ? strArrMods	: [];
	
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
		this.name		= (objNew.name		!== undefined) ? objNew.name	: "";
		this.rating		= (objNew.rating	!== undefined) ? objNew.rating	: 0;
		this.mods		= (objNew.mods		!== undefined) ? objNew.mods	: [];
		return;
	}//end Armor::replace()

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
		var tmpstr	= "";
			tmpstr		+="<table class=\"Gear\" id=\"Armor" + intId + removeSpecial(this.name) + "\" onclick=\"expand(Armor" + intId + removeSpecial(this.name) + ")\"><tbody><tr>";
			tmpstr		+=	"<th class=\"GearName\">" + this.name + "</th>";
			tmpstr		+=	"<td class=\"GearRating\">Armor:" + this.rating + "</td>";
			tmpstr		+=	"</tr><tr class=\"dropdownhidden\" id=\"Armor" + intId + removeSpecial(this.name) + "dropdown\"><td colspan=\"2\">";
			for (var i = 0; i < this.mods.length; i++) {
				tmpstr	+= this.mods[i] + "</br>";
			}
			tmpstr		+=	"</td></tr>";
			tmpstr		+="</tbody></table>";
		return tmpstr;
	}//end Armor::draw()

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
		var tmpstr	="<table class=\"ArmorEdit\" id=\"Armor" + intId + "\"><tbody><tr>";
			tmpstr	+=	"<th class=\"GearName\" onclick=\"expand(Armor" + intId + ")\">";
			tmpstr	+=	"<input type=\"text\" id=\"Armor" + intId + "EditName\" value=\"" + this.name + "\"</th>";
			tmpstr	+=	"<td class=\"GearRating\">Armor:";
			tmpstr	+=	"<input type=\"number\" id=\"Armor" + intId + "EditRating\" value=\"" + this.rating + "\"</td>";
			tmpstr	+=	"</tr><tr class=\"dropdownhidden\" id=\"Armor" + intId + "dropdown\"><td colspan=\"2\">";
			tmpstr	+=		"<textarea cols=\"20\" rows=\"4\" id=\"Armor" + intId + "EditMods\">";
			for (var i = 0; i < this.mods.length; i++) {
				tmpstr	+= this.mods[i];
				tmpstr	+=	(i != (this.mods.length - 1)) ? "\n" : "";
			}
			tmpstr	+=		"</textarea>";
			tmpstr	+="</td></tr>";
			tmpstr	+="</tr></tbody></table>";
		return tmpstr;
	}//end Armor::drawEdit()

	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(intId){
		this.name	= document.getElementById("Armor" + intId + "EditName").value;
		this.rating	= document.getElementById("Armor" + intId + "EditRating").value;
		this.mods	= document.getElementById("Armor" + intId + "EditMods").value.split('\n');
		return;
	}//end Armor::updateFromEdit()
}//end Armor()
