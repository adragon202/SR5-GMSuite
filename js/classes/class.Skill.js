/**
 * @file
 *	Skill Class
 *
 */

/**
 * @class Skill
 *	Handles drawing and calculations for Skill Data
 *
 * @param {integer} intOwnerID
 * 		Character Id that the Armor is assigned to.
 *		Useful with cross class interactions within Character.
 * @param {string} strName
 *		Name assigned to Skill
 * @param {boolean} boolDefault
 *		If Skill can be defaulted on (Rolled at zero)
 * @param {integer} intRating
 *		Rating assigned to Skill
 * @param {string[]} strArrSpecs
 *		Array of Strings indicating Skills Specializations
 *
 * @var {integer} id
 * 		Character Id that the Armor is assigned to.
 *		Useful with cross class interactions within Character.
 * @var {string} name
 *		Name assigned to Skill
 * @var {boolean} default
 *		If Skill can be defaulted on (Rolled at zero)
 * @var {integer} rating
 *		Rating assigned to Skill
 * @var {integer} ratingmod
 *		Modifier for Rating
 * @var {string[]} spec
 *		Array of Strings indicating Skills Specializations
 *
 * @function replace()
 * @function draw()
 * @function drawEdit()
 * @function updateFromEdit()
 */
function Skill(intOwnerID, strName, boolDefault, intRating, strArrSpecs)
{
	this.id			= (intOwnerID	!== undefined) ? intOwnerID		: -1;
	this.name		= (strName		!== undefined) ? strName		: "";
	this.default 	= (boolDefault	!== undefined) ? boolDefault	: false;
	this.rating		= (intRating	!== undefined || intRating < 0 || intRating > 12) ? intRating : 0;
	this.ratingmod	= 0;
	this.spec 		= (strArrSpecs	!== undefined) ? strArrSpecs	: [];
	
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
		this.default	= (objNew.default	!== undefined) ? objNew.default	: false;
		this.rating		= (objNew.rating	!== undefined || intRating < 0 || intRating > 12) ? objNew.rating : 0;
		this.ratingmod	= (objNew.ratingmod	!== undefined) ? objNew.ratingmod	: 0;
		this.spec		= (objNew.spec		!== undefined) ? objNew.spec	: [];
		return;
	}//end Skill::replace()

	/**
	 * @function draw()
	 * Formats class into an html table.
	 * 
	 * @return {string}
	 *		Html format of table to display class variables.
	 */
	this.draw 		= function(){
		var tmpstr	="<table class=\"Skill\" id=\"" + removeSpecial(this.name) + "\"  onclick=\"expand(" + removeSpecial(this.name) + ")\"><tbody><tr>";
			tmpstr		+=	"<th class=\"SkillName\">" + this.name + "</th>";
			tmpstr		+=	"<td class=\"SkillRating\">" + (this.rating + this.ratingmod) + "/12</td>";
			tmpstr		+=	"</tr><tr class=\"dropdownhidden\" id=\"" + removeSpecial(this.name) + "dropdown\"><td colspan=\"2\">";
			for (var i = 0; i < this.spec.length; i++) {
				tmpstr	+=this.spec[i] + "</br>";
			}
			tmpstr		+="</td></tr>";
			tmpstr		+="</tr></tbody></table>";
		return tmpstr;
	}//end Skill::draw()

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
	this.drawEdit 		= function(intId){
		var tmpstr	="<table class=\"Skill\" id=\"Skill" + intId + "Edit\"><tbody><tr>";
			tmpstr	+=	"<th class=\"SkillName\" onclick=\"expand(Skill" + intId + "Edit)\">";
			tmpstr	+=	"<input class=\"SkillName\" list=\"skills\" id=\"Skill" + intId + "EditName\" value=\"" + this.name + "\" placeholder=\"Name\">";
			tmpstr	+=	"</th>";
			tmpstr	+=	"<td class=\"SkillRating\"><input type=\"number\" id=\"Skill" + intId + "EditRating\" style=\"width:20px;\" value=\"" + this.rating + "\">/12</td>";
			tmpstr	+=	"</tr><tr class=\"dropdownhidden\" id=\"Skill" + intId + "Editdropdown\"><td colspan=\"2\">";
			tmpstr	+=	"<textarea cols=\"20\" rows=\"2\" id=\"Skill" + intId + "EditSpecializations\" placeholder=\"Specializations\">";
			for (var i = 0; i < this.spec.length; i++) {
				tmpstr	+=	this.spec[i];
				tmpstr	+=	(i != (this.spec.length - 1)) ? "\n" : "";
			}
			tmpstr	+=	"</textarea>"
			tmpstr	+="</td></tr>";
			tmpstr	+="</tr></tbody></table>";
		return tmpstr;
	}//end Skill::drawEdit()

	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(intId){
		this.name		= document.getElementById("Skill" + intId + "EditName").value;
		this.default	= (skillsdb[document.getElementById("Skill" + intId + "EditName").value] !== undefined) ? skillsdb[document.getElementById("Skill" + intId + "EditName").value].default : true;
		this.rating		= parseInt(document.getElementById("Skill" + intId + "EditRating").value);
		this.spec		= document.getElementById("Skill" + intId + "EditSpecializations").value.split('\n');
		return;
	}//end Skill::updateFromEdit()
}//end Skill
