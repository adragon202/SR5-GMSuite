/**
 * @file
 *	Weapon Class
 * 
 * @class Weapon()
 * @class WeaponStats()
 *
 */

/**
 * @class Weapon()
 *	Handles drawing and calculations for Weapon Data
 *
 * @param {integer}		intOwnerID
 * 		Character Id that the Armor is assigned to.
 *		Useful with cross class interactions within Character.
 * @param {string}		strName
 * @param {string}		strType
 * @param {WeaponStats}	objStats
 * @param {object[]}	strArrMods
 * @param {object[]}	strArrNotes
 *
 * @var {integer}		id
 * 		Character Id that the Armor is assigned to.
 *		Useful with cross class interactions within Character.
 * @var {string}		name
 * @var {string}		type
 * @var {WeaponStats}	stats
 * @var {object[]}		mods
 * @var {object[]}		notes
 *
 * @function replace()
 * @function draw()
 * @function drawEdit()
 * @function updateFromEdit()
 */
function Weapon(intOwnerID, strName, strType, objStats, strArrMods, strArrNotes)
{
	this.id		= (intOwnerID	!== undefined) ? intOwnerID	: -1;
	this.name	= (strName		!== undefined) ? strName	: "";
	this.type	= (strType		!== undefined) ? strType	: "";
	this.stats 	= (objStats		!== undefined) ? objStats	: new WeaponStats();
	this.mods	= (strArrMods	!== undefined) ? strArrMods	: [];
	this.notes	= (strArrNotes	!== undefined) ? strArrNotes: [];
	
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
		this.name		= (objNew.name !== undefined) ? objNew.name 	: "";
		this.type		= (objNew.type !== undefined) ? objNew.type 	: "";
		this.stats.replace(objNew.stats);
		this.mods		= (objNew.mods !== undefined) ? objNew.mods 	: [];
		this.notes		= (objNew.notes !== undefined) ? objNew.notes	: [];
		return;
	}//end Weapon::replace()

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
		var tmpstr	="<table class=\"Weapon\" id=\"Weapon" + intId + removeSpecial(this.name) + "\" onclick=\"expand(Weapon" + intId + removeSpecial(this.name) + ")\"><tbody><tr>";
			tmpstr		+=	"<th class=\"WeaponName\">" + this.name + "</th>";
			tmpstr		+=	"<td class=\"WeaponType\">" + this.type + "</td>";
			tmpstr		+=	"</tr><tr class=\"dropdownhidden\" id=\"Weapon" + intId + removeSpecial(this.name) + "dropdown\"><td colspan=\"2\">";
			tmpstr 		+=	this.stats.draw(intId);
			for (var i = 0; i < this.mods.length; i++) {
				tmpstr	+=	"</br>" + this.mods[i];
			}
			for (var i = 0; i < this.notes.length; i++) {
				tmpstr	+=	"</br>" + this.notes[i];
			}
			tmpstr		+=	"</td></tr>";
			tmpstr		+="</tr></tbody></table>";
		return tmpstr;
	}//end Weapon::draw()
	
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
			tmpstr	+=	"<table class=\"WeaponEdit\" id=\"Weapon" + intId + "\"><tbody><tr>";
			tmpstr	+=		"<th class=\"WeaponName\" onclick=\"expand(Weapon" + intId + ")\">";
			tmpstr	+=		"<input type=\"text\" id=\"Weapon" + intId + "EditName\" placeholder=\"Name\" value=\"" + this.name + "\"></th>";
			tmpstr	+=		"<td class=\"WeaponType\">";
			tmpstr	+=		"<input type=\"text\" id=\"Weapon" + intId + "EditType\" placeholder=\"Type\" value=\"" + this.type + "\"></td>";
			tmpstr	+=		"</tr><tr class=\"dropdownhidden\" id=\"Weapon" + intId + "dropdown\"><td colspan=\"2\">";
			tmpstr 	+=		this.stats.drawEdit(intId);
			tmpstr	+=		"<textarea cols=\"20\" rows=\"4\" id=\"Weapon" + intId + "EditMods\" placeholder=\"Modifications\">";
			for (var i = 0; i < this.mods.length; i++) {
				tmpstr	+=	this.mods[i];
				tmpstr	+=	(i != (this.mods.length - 1)) ? "\n" : "";
			}
			tmpstr	+=		"</textarea>"
			tmpstr	+=		"<textarea cols=\"20\" rows=\"4\" id=\"Weapon" + intId + "EditNotes\" placeholder=\"Notes\">";
			for (var i = 0; i < this.notes.length; i++) {
				tmpstr	+=	this.notes[i];
				tmpstr	+=	(i != (this.notes.length - 1)) ? "\n" : "";
			}
			tmpstr	+=		"</textarea>"
			tmpstr	+=		"</td></tr>";
			tmpstr	+="</tr></tbody></table>";
		return tmpstr;
	}//end Weapon::drawEdit()

	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(intId){
		this.name	= document.getElementById("Weapon" + intId + "EditName").value;
		this.type	= document.getElementById("Weapon" + intId + "EditType").value;
		this.mods	= document.getElementById("Weapon" + intId + "EditMods").value.split('\n');
		this.notes	= document.getElementById("Weapon" + intId + "EditNotes").value.split('\n');
		this.stats.updateFromEdit(intId);
		return;
	}//end Weapon::updateFromEdit()
}//end Weapon()

/**
 * @class WeaponStats()
 *	Handles drawing and calculations for Weapon Attributes
 *
 * @param {string}	strAccuracy
 * @param {integer}	intReach
 * @param {string}	strDV
 * @param {integer}	intAP
 * @param {string}	strMode
 * @param {integer}	intRC
 * @param {string}	strAmmo
 * @param {string}	strAvailability
 * @param {integer}	intCost
 * @param {string}	strSource
 *
 * @var {string}	accuracy
 * @var {integer}	reach
 * @var {string}	dv
 * @var {integer}	ap
 * @var {string}	mode
 * @var {integer}	rc
 * @var {string}	ammo
 * @var {string}	availability
 * @var {integer}	cost
 * @var {string}	source
 *
 * @function replace()
 * @function draw()
 * @function drawEdit()
 * @function updateFromEdit()
 */
function WeaponStats(strAccuracy, intReach, strDV, intAP, strMode, intRC, strAmmo, strAvailability, intCost, strSource)
{
	this.accuracy		= (strAccuracy		!== undefined) ? strAccuracy		: "";
	this.reach			= (intReach			!== undefined) ? intReach			: 0;
	this.dv				= (strDV			!== undefined) ? strDV				: "";
	this.ap				= (intAP			!== undefined) ? intAP				: 0;
	this.mode			= (strMode			!== undefined) ? strMode			: "";
	this.rc				= (intRC			!== undefined) ? intRC				: 0;
	this.ammo			= (strAmmo			!== undefined) ? strAmmo			: "";
	this.availability	= (strAvailability	!== undefined) ? strAvailability	: "";
	this.cost			= (intCost			!== undefined) ? intCost			: 0;
	this.source			= (strSource		!== undefined) ? strSource			: "";
	
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
		this.accuracy		= (objNew.accuracy		!== undefined) ? objNew.accuracy		: "";
		this.reach			= (objNew.reach			!== undefined) ? objNew.reach			: 0;
		this.dv				= (objNew.dv			!== undefined) ? objNew.dv				: "";
		this.ap				= (objNew.ap			!== undefined) ? objNew.ap				: 0;
		this.mode			= (objNew.mode			!== undefined) ? objNew.mode			: "";
		this.rc				= (objNew.rc			!== undefined) ? objNew.rc				: 0;
		this.ammo			= (objNew.ammo			!== undefined) ? objNew.ammo			: "";
		this.availability	= (objNew.availability	!== undefined) ? objNew.availability	: "";
		this.cost			= (objNew.cost			!== undefined) ? objNew.cost			: 0;
		this.source			= (objNew.source		!== undefined) ? objNew.source			: "";
		return;
	}//end WeaponStats::replace()

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
	this.draw			= function(intId){
		var tmpstr	="<table class=\"WeaponStats\"><tbody>";
			tmpstr		+=	"<tr>";
			tmpstr		+=	(this.accuracy		!= "")	? "<th>ACC</th>"	: "";
			tmpstr		+=	(this.reach			!= 0)	? "<th>REACH</th>"	: "";
			tmpstr		+=	(this.dv			!= "")	? "<th>DV</th>"		: "";
			tmpstr		+=	(this.ap			!= 0)	? "<th>AP</th>"		: "";
			tmpstr		+=	(this.mode			!= "")	? "<th>MODE</th>"	: "";
			tmpstr		+=	(this.rc			!= 0)	? "<th>RC</th>"		: "";
			tmpstr		+=	(this.ammo			!= "")	? "<th>AMMO</th>"	: "";
			tmpstr		+=	(this.availability	!= "")	? "<th>AVAIL</th>"	: "";
			tmpstr		+=	(this.cost			!= 0)	? "<th>COST</th>"	: "";
			tmpstr		+=	(this.source		!= "Core")	? "<th>SOURCE</th>"	: "";
			tmpstr		+=	"</tr>";
			tmpstr		+=	"<tr>";
			tmpstr		+=	(this.accuracy		!= "")	? "<th>" + this.accuracy + "</th>"		: "";
			tmpstr		+=	(this.reach			!= 0)	? "<th>" + this.reach + "</th>"			: "";
			tmpstr		+=	(this.dv			!= "")	? "<th>" + this.dv + "</th>"			: "";
			tmpstr		+=	(this.ap			!= 0)	? "<th>" + this.ap + "</th>"			: "";
			tmpstr		+=	(this.mode			!= "")	? "<th>" + this.mode + "</th>"			: "";
			tmpstr		+=	(this.rc			!= 0)	? "<th>" + this.rc + "</th>"			: "";
			tmpstr		+=	(this.ammo			!= "")	? "<th>" + this.ammo + "</th>"			: "";
			tmpstr		+=	(this.availability	!= "")	? "<th>" + this.availability + "</th>"	: "";
			tmpstr		+=	(this.cost			!= 0)		? "<th>" + this.cost + "&yen;</th>"	: "";
			tmpstr		+=	(this.source		!= "Core")	? "<th>" + this.source + "</th>"	: "";
			tmpstr		+=	"</tr>";
			tmpstr		+="</tbody></table>";
		return tmpstr;
	}//end WeaponStats::draw()

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
	this.drawEdit			= function(intId){
		var tmpstr	="<table class=\"WeaponStats\"><tbody>";
			tmpstr	+=	"<tr>";
			tmpstr	+=	"<th>ACC</th>";
			tmpstr	+=	"<th>REACH</th>";
			tmpstr	+=	"<th>DV</th>";
			tmpstr	+=	"<th>AP</th>";
			tmpstr	+=	"<th>MODE</th>";
			tmpstr	+=	"<th>RC</th>";
			tmpstr	+=	"<th>AMMO</th>";
			tmpstr	+=	"<th>AVAIL</th>";
			tmpstr	+=	"<th>COST</th>";
			tmpstr	+=	"<th>SOURCE</th>";
			tmpstr	+=	"</tr>";
			tmpstr	+=	"<tr>";
			tmpstr	+=	"<th><input type=\"text\" class=\"GearValue\" id=\"Weapon" + intId + "EditAccuracy\" value=\"" + this.accuracy + "\"></th>";
			tmpstr	+=	"<th><input type=\"text\" class=\"GearValue\" id=\"Weapon" + intId + "EditReach\" value=\"" + this.reach + "\"></th>";
			tmpstr	+=	"<th><input type=\"text\" class=\"GearValue\" id=\"Weapon" + intId + "EditDv\" value=\"" + this.dv + "\"></th>";
			tmpstr	+=	"<th><input type=\"text\" class=\"GearValue\" id=\"Weapon" + intId + "EditAp\" value=\"" + this.ap + "\"></th>";
			tmpstr	+=	"<th><input type=\"text\" class=\"GearValue\" id=\"Weapon" + intId + "EditMode\" value=\"" + this.mode + "\"></th>";
			tmpstr	+=	"<th><input type=\"text\" class=\"GearValue\" id=\"Weapon" + intId + "EditRc\" value=\"" + this.rc + "\"></th>";
			tmpstr	+=	"<th><input type=\"text\" class=\"GearValue\" id=\"Weapon" + intId + "EditAmmo\" value=\"" + this.ammo + "\"></th>";
			tmpstr	+=	"<th><input type=\"text\" class=\"GearValue\" id=\"Weapon" + intId + "EditAvailability\" value=\"" + this.availability + "\"></th>";
			tmpstr	+=	"<th><input type=\"text\" class=\"GearValue\" id=\"Weapon" + intId + "EditCost\" value=\"" + this.cost + "\">&yen;</th>";
			tmpstr	+=	"<th><input type=\"text\" class=\"GearValue\" id=\"Weapon" + intId + "EditSource\" value=\"" + this.source + "\"></th>";
			tmpstr	+=	"</tr>";
			tmpstr	+="</tbody></table>";
		return tmpstr;
	}//end WeaponStats::drawEdit()
	
	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(intId){
		this.accuracy		= document.getElementById("Weapon" + intId + "EditAccuracy").value;
		this.reach			= document.getElementById("Weapon" + intId + "EditReach").value;
		this.dv				= document.getElementById("Weapon" + intId + "EditDv").value;
		this.ap				= document.getElementById("Weapon" + intId + "EditAp").value;
		this.mode			= document.getElementById("Weapon" + intId + "EditMode").value;
		this.rc				= document.getElementById("Weapon" + intId + "EditRc").value;
		this.ammo			= document.getElementById("Weapon" + intId + "EditAmmo").value;
		this.availability	= document.getElementById("Weapon" + intId + "EditAvailability").value;
		this.cost			= document.getElementById("Weapon" + intId + "EditCost").value;
		this.source			= document.getElementById("Weapon" + intId + "EditSource").value;
		return;
	}//end WeaponStats::updateFromEdit()
}//end WeaponStats()
