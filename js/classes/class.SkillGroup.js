/**
 * @file
 *	SkillGroup Class
 *
 */

/**
 * @class SkillGroup
 *	Handles drawing and calculations for SkillGroup Data
 *
 * @param {integer}		intOwnerID
 * 		Character Id that the Armor is assigned to.
 *		Useful with cross class interactions within Character.
 * @param {string}		strName
 *		Name assigned to SkillGroup
 * @param {integer}		intRating
 *		Rating assigned to SkillGroup
 * @param {string[]}	strArrSkills
 *		Array of Strings indicating SkillGroups Skills
 *
 * @var {integer}	id
 * 		Character Id that the Armor is assigned to.
 *		Useful with cross class interactions within Character.
 * @var {string}	name
 *		Name assigned to SkillGroup
 * @var {integer}	rating
 *		Rating assigned to SkillGroup
 * @var {integer}	ratingmod
 *		Modifier for Rating
 * @var {string[]}	skills
 *		Array of strings indicating Skills associated with SkillGroup
 *

 */
function SkillGroup(intOwnerID, strName, intRating, strArrSkills)
{
	this.id			= (intOwnerID !== undefined) ? intOwnerID : -1;
	this.name		= (strName !== undefined) ? strName : "";
	this.rating		= (intRating !== undefined || intRating < 0 || intRating > 12) ? intRating : 0;
	this.ratingmod	= 0;
	this.skills 	= (strArrSkills !== undefined) ? strArrSkills : [];
	
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
		this.name		= (objNew.name !== undefined) ? objNew.name : "";
		this.rating		= (objNew.rating !== undefined || intRating < 0 || intRating > 12) ? objNew.rating : 0;
		this.ratingmod	= (objNew.ratingmod	!== undefined) ? objNew.ratingmod	: 0;
		this.skills		= (objNew.skills !== undefined) ? objNew.skills : [];
		return;
	}//end SkillGroup::replace()

	/**
	 * @function contains()
	 * 
	 * @param
	 * @return
	 */
	this.contains	= function(strval){
		for (var i = skills.length - 1; i >= 0; i--) {
			if (skills[i].toLowerCase() == strval.toLowerCase()) return true;
		}
		return false;
	}//end SkillGroup::contains();

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
	this.draw		= function(){
		var tmpstr	="<table class=\"SkillGroup\" id=\"" + removeSpecial(this.name) + "\" onclick=\"expand(" + removeSpecial(this.name) + ")\"><tbody><tr>"
			tmpstr	+=	"<th class=\"SkillGroupName\">" + this.name + "</th>"
			tmpstr	+=	"<td class=\"SkillGroupRating\">" + (this.rating + this.ratingmod) + "/12</td>"
			tmpstr	+=	"</tr><tr class=\"dropdownhidden\" id=\"" + removeSpecial(this.name) + "dropdown\"><td colspan=\"2\">";
			for (var i = 0; i < this.skills.length; i++) {
				tmpstr	+= this.skills[i] + "</br>";
			}
			tmpstr	+="</td></tr>";
			tmpstr	+="</tr></tbody></table>";
		return tmpstr;
	}//end SkillGroup:draw()

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
		var tmpstr	="<table class=\"SkillGroup\" id=\"SkillGroup" + intId + "Edit\"><tbody><tr>"
			tmpstr	+=	"<th class=\"SkillGroupName\" onclick=\"expand(SkillGroup" + intId + "Edit)\">";
			tmpstr	+=	"<input class=\"SkillName\" list=\"skillgroups\" id=\"SkillGroup" + intId + "EditName\" value=\"" + this.name + "\"></th>"
			tmpstr	+=	"<td class=\"SkillGroupRating\"><input type=\"number\" id=\"SkillGroup" + intId + "EditRating\" style=\"width:20px;\" value=\"" + this.rating + "\">/12</td>"
			tmpstr	+=	"</tr><tr class=\"dropdownhidden\" id=\"SkillGroup" + intId + "Editdropdown\"><td colspan=\"2\">";
			for (var i = 0; i < this.skills.length; i++) {
				tmpstr	+= this.skills[i] + "</br>";
			}
			tmpstr	+="</td></tr>";
			tmpstr	+="</tr></tbody></table>";
		return tmpstr;
	}//end SkillGroup::drawEdit()

	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(intId){
		this.name	= document.getElementById("SkillGroup" + intId + "EditName").value;
		this.rating	= parseInt(document.getElementById("SkillGroup" + intId + "EditRating").value);
		this.skills	= (skillgroupsdb[document.getElementById("SkillGroup" + intId + "EditName").value] !== undefined) ? skillgroupsdb[document.getElementById("SkillGroup" + intId + "EditName").value].skills : [];
		return;
	}//end SkillGroup::updateFromEdit()
}//end SkillGroup
