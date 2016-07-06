/**
 * @file
 *	Limits Class
 *
 */

/**
 * @class Limits
 *		Calculated Limits for a character.
 *
 * @param {Attributes} objAttr
 *		Attributes to use for calculations.
 *
 * @var {integer} Physical
 *		Calculated based on Given Physical Attributes, including Modifiers
 * @var {integer} Mental
 *		Calculated based on Given Mental Attributes, including Modifiers
 * @var {integer} Social
 *		Calculated based on Given Social Attributes, including Modifiers
 * @var {integer} Walking
 *		Calculated based on Given Agility, including Modifiers
 * @var {integer} Running
 *		Calculated based on Given Agility, including Modifiers
 *
 * @function draw
 * @function recalc
 * @function getLimit
 */
function Limits(objAttr)
{
	this.Physical	= 0;
	this.Mental		= 0;
	this.Social		= 0;
	this.Walking	= 0;
	this.Running	= 0;
	//recalc at end

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
	this.draw 		= function(){
		document.getElementById("LimitPhysical").innerHTML	= this.Physical;
		document.getElementById("LimitMental").innerHTML	= this.Mental;
		document.getElementById("LimitSocial").innerHTML	= this.Social;
		document.getElementById("LimitWalking").innerHTML	= this.Walking;
		document.getElementById("LimitRunning").innerHTML	= this.Running;
		return;
	}//end Limits::draw()

	/**
	 * @function recalc()
	 *		Calculates the limits with the given Attributes
	 * 
	 * @param {Attributes} objAttr
	 * 		Attributes used to calculate the limits
	 */
	this.recalc 	= function(objAttr){
		if (objAttr === undefined) {
			objAttr = new Attributes();
		}
		this.Mental		= Math.ceil(((objAttr.Logic + objAttr.LogicMod) * 2 + (objAttr.Intuition + objAttr.IntuitionMod) + (objAttr.Willpower + objAttr.WillpowerMod))/3);
		this.Physical	= Math.ceil(((objAttr.Strength + objAttr.StrengthMod) * 2 + (objAttr.Body + objAttr.BodyMod) + (objAttr.Reaction + objAttr.ReactionMod))/3);
		this.Social		= Math.ceil(((objAttr.Charisma + objAttr.CharismaMod) * 2 + (objAttr.Willpower + objAttr.WillpowerMod) + objAttr.Essence)/3);
		this.Walking	= (objAttr.Agility + objAttr.AgilityMod) * 2;
		this.Running	= (objAttr.Agility + objAttr.AgilityMod) * 4;
		return;
	}//end Limits::recalc()
	
	/**
	 * @function getLimit()
	 *		Returns the value of the requested limit
	 * 
	 * @param {string} strVal
	 *		name of limit to return
	 *
	 * @return
	 *		value of requested limit
	 *		defaults to 0 if not found.
	 */
	this.getLimit	= function(strVal){
		strVal = strVal.toLowerCase()
		if (strVal == "physical")	return this.Physical;
		if (strVal == "mental")		return this.Mental;
		if (strVal == "social")		return this.Social;
		if (strVal == "astral")		return (this.Mental > this.Social) ? this.Mental : this.Social;
		if (strVal == "walking")	return this.Walking;
		if (strVal == "running")	return this.Running;
		return 0;
	}//end Limits::getLimit()
	//Calculate Limits.
	this.recalc(objAttr);
}//end Limits
