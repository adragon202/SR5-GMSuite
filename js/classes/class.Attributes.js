/**
 * @file
 * Attributes Class for Characters
 *
 * Handles rendering of stats and calculations
 */

/**
 * @class
 *
 * Default values and input assignment made at top
 * Initial function calls at the bottom
 *
 * @param {integer} intOwnerID
 *		Character Id that the Armor is assigned to.
 *		Useful with cross class interactions within Character.
 * @param {integer} intBody
 *		Characters Body Attribute.
 * @param {integer} intBody_Max
 *		Characters Maximum for the Body Attribute.
 * @param {integer} intAgility
 *		Characters Agility Attribute.
 * @param {integer} intAgility_Max
 *		Characters Maximum for the Agility Attribute.
 * @param {integer} intReaction
 *		Characters Reaction Attribute.
 * @param {integer} intReaction_Max
 *		Characters Maximum for the Reaction Attribute.
 * @param {integer} intStrength
 *		Characters Strength Attribute.
 * @param {integer} intStrength_Max
 *		Characters Maximum for the Strength Attribute.
 * @param {integer} intWillpower
 *		Characters Willpower Attribute.
 * @param {integer} intWillpower_Max
 *		Characters Maximum for the Willpower Attribute.
 * @param {integer} intIntuition
 *		Characters Intuition Attribute.
 * @param {integer} intIntuition_Max
 *		Characters Maximum for the Intuition Attribute.
 * @param {integer} intLogic
 *		Characters Logic Attribute.
 * @param {integer} intLogic_Max
 *		Characters Maximum for the Logic Attribute.
 * @param {integer} intCharisma
 *		Characters Charisma Attribute.
 * @param {integer} intCharisma_Max
 *		Characters Maximum for the Charisma Attribute.
 * @param {integer} intEdge
 *		Characters Edge Attribute.
 * @param {integer} intEdge_Max
 *		Characters Maximum for the Edge Attribute.
 * @param {integer} intEssence
 *		Characters Essence Attribute.
 * @param {integer} intSpecial
 *		Characters Special Attribute (ie Magic or Resonance).
 * @param {integer} intSpecial_Max
 *		Characters Maximum for the Special Attribute (ie Magic or Resonance).
 * @param {string} strSpecial
 *		Name for Special Attribute (ie Magic or Resonance).
 * @param {string} strSpecialResistName
 *		Depending on Special Name, either Drain or Fade
 * @param {string} strSpecialResistAttr
 *		Attribute to assign to Special Resist (either Charisma, Logic or Intuition)
 *
 * @var {integer} ownerid
 *		Character Id that the Armor is assigned to.
 * @var {integer} Body
 *		Characters Body Attribute.
 * @var {integer} Body_Max
 *		Characters Maximum for the Body Attribute.
 * @var {integer} BodyMod
 * @var {integer} Agility
 *		Characters Agility Attribute.
 * @var {integer} Agility_Max
 *		Characters Maximum for the Agility Attribute.
 * @var {integer} AgilityMod
 *		Modifying value for Agility Attribute
 * @var {integer} Reaction
 *		Characters Reaction Attribute.
 * @var {integer} Reaction_Max
 *		Characters Maximum for the Reaction Attribute.
 * @var {integer} ReactionMod
 *		Modifying value for Reaction Attribute
 * @var {integer} Strength
 *		Characters Strength Attribute.
 * @var {integer} Strength_Max
 *		Characters Maximum for the Strength Attribute.
 * @var {integer} StrengthMod
 *		Modifying value for Strength Attribute
 * @var {integer} Willpower
 *		Characters Willpower Attribute.
 * @var {integer} Willpower_Max
 *		Characters Maximum for the Willpower Attribute.
 * @var {integer} WillpowerMod
 *		Modifying value for Willpower Attribute
 * @var {integer} Intuition
 *		Characters Intuition Attribute.
 * @var {integer} Intuition_Max
 *		Characters Maximum for the Intuition Attribute.
 * @var {integer} IntuitionMod
 *		Modifying value for Intuition Attribute
 * @var {integer} Logic
 *		Characters Logic Attribute.
 * @var {integer} Logic_Max
 *		Characters Maximum for the Logic Attribute.
 * @var {integer} LogicMod
 *		Modifying value for Logic Attribute
 * @var {integer} Charisma
 *		Characters Charisma Attribute.
 * @var {integer} Charisma_Max
 *		Characters Maximum for the Charisma Attribute.
 * @var {integer} CharismaMod
 *		Modifying value for Charisma Attribute
 * @var {integer} Edge
 *		Characters Edge Attribute.
 * @var {integer} Edge_Max
 *		Characters Maximum for the Edge Attribute.
 * @var {integer} EdgeMod
 *		Modifying value for Edge Attribute
 * @var {integer} Essence
 *		Characters Essence Attribute.
 * @var {integer} Special
 *		Characters Special Attribute (ie Magic or Resonance).
 * @var {integer} Special_Max
 *		Characters Maximum for the Special Attribute (ie Magic or Resonance).
 * @var {integer} SpecialMod
 *		Modifying value for Special Attribute
 * @var {string} SpecialName
 *		Name for Special Attribute (ie Magic or Resonance).
 * @var {string} SpecialResistName
 *		Depending on Special Name, either Drain or Fade
 * @var {string} SpecialResistAttr
 *		Attribute to assign to Special Resist (either Charisma, Logic or Intuition)
 * @var {integer} SpecialResist
 *		Duplicated value based on SpecialResistAttr
 *
 * @function replace()
 * @function draw()
 * @function drawEdit()
 * @function updateFromEdit()
 * @function updateSpecialResist()
 * @function getattribute()
 * @function getattributeMod()
 * @function getattributeMax()
 * @function setattribute()
 * @function setattributeMod()
 * @function setattributeMax()
 *
 */
function Attributes(intOwnerID, intBody, intBody_Max, intAgility, intAgility_Max, intReaction, intReaction_Max,
	intStrength, intStrength_Max, intWillpower, intWillpower_Max, intIntuition, intIntuition_Max, intLogic, intLogic_Max,
	intCharisma, intCharisma_Max, intEdge, intEdge_Max, intEssence, intSpecial, intSpecial_Max, strSpecial, strSpecialResistName,
	strSpecialResistAttr)
{
	this.id				= (intOwnerID		!== undefined) ? intOwnerID			: -1;
	this.Body			= (intBody			!== undefined) ? intBody			: 1;
	this.Body_Max		= (intBody_Max		!== undefined) ? intBody_Max		: 6;
	this.BodyMod		= 0;
	this.Agility 		= (intAgility		!== undefined) ? intAgility			: 1;
	this.Agility_Max	= (intAgility_Max	!== undefined) ? intAgility_Max		: 6;
	this.AgilityMod		= 0;
	this.Reaction 		= (intReaction		!== undefined) ? intReaction		: 1;
	this.Reaction_Max	= (intReaction_Max	!== undefined) ? intReaction_Max	: 6;
	this.ReactionMod	= 0;
	this.Strength 		= (intStrength		!== undefined) ? intStrength		: 1;
	this.Strength_Max	= (intStrength_Max	!== undefined) ? intStrength_Max	: 6;
	this.StrengthMod	= 0;
	this.Willpower 		= (intWillpower		!== undefined) ? intWillpower		: 1;
	this.Willpower_Max	= (intWillpower_Max	!== undefined) ? intWillpower_Max	: 6;
	this.WillpowerMod	= 0;
	this.Intuition 		= (intIntuition		!== undefined) ? intIntuition		: 1;
	this.Intuition_Max	= (intIntuition_Max	!== undefined) ? intIntuition_Max	: 6;
	this.IntuitionMod	= 0;
	this.Logic 			= (intLogic			!== undefined) ? intLogic			: 1;
	this.Logic_Max		= (intLogic_Max		!== undefined) ? intLogic_Max		: 6;
	this.LogicMod		= 0;
	this.Charisma 		= (intCharisma		!== undefined) ? intCharisma		: 1;
	this.Charisma_Max	= (intCharisma_Max	!== undefined) ? intCharisma_Max	: 6;
	this.CharismaMod	= 0;
	this.Edge 			= (intEdge			!== undefined) ? intEdge			: 1;
	this.Edge_Max		= (intEdge_Max		!== undefined) ? intEdge_Max		: 6;
	this.EdgeMod		= 0;
	this.Essence 		= (intEssence		!== undefined) ? intEssence			: 6;
	this.Special 		= (intSpecial		!== undefined) ? intSpecial			: 1;
	this.Special_Max	= (intSpecial_Max	!== undefined) ? intSpecial_Max		: 6;
	this.SpecialMod		= 0;
	this.SpecialName	= (strSpecial		!== undefined) ? strSpecial			: "NONE"; //Either NONE Magic or Resonance
	this.SpecialResistName = "";
	this.SpecialResistAttr = (strSpecialResistAttr	!== undefined) ? strSpecialResistAttr	: "NONE"; //Either NONE or attribute
	this.SpecialResist	= 0;
	//Evaluate SpecialResist at after find function is declared.

	//Object Methods
	/**
	 * @function
	 * Handles loading object with similar variables but no functions into
	 * Primary use is when loading character and session files
	 * 
	 * @param {object} objNew
	 *		Object with similar variables to load
	 */
	this.replace		= function(objNew){
		this.Body			= (objNew.Body			!== undefined) ? objNew.Body			: 1;
		this.Body_Max		= (objNew.Body_Max		!== undefined) ? objNew.Body_Max		: 6;
		this.BodyMod		= (objNew.BodyMod		!== undefined) ? objNew.BodyMod			: 0;
		this.Agility		= (objNew.Agility		!== undefined) ? objNew.Agility			: 1;
		this.Agility_Max	= (objNew.Agility_Max	!== undefined) ? objNew.Agility_Max		: 6;
		this.AgilityMod		= (objNew.AgilityMod	!== undefined) ? objNew.AgilityMod		: 0;
		this.Reaction		= (objNew.Reaction		!== undefined) ? objNew.Reaction		: 1;
		this.Reaction_Max	= (objNew.Reaction_Max	!== undefined) ? objNew.Reaction_Max	: 6;
		this.ReactionMod	= (objNew.ReactionMod	!== undefined) ? objNew.ReactionMod		: 0;
		this.Strength		= (objNew.Strength		!== undefined) ? objNew.Strength		: 1;
		this.Strength_Max	= (objNew.Strength_Max	!== undefined) ? objNew.Strength_Max	: 6;
		this.StrengthMod	= (objNew.StrengthMod	!== undefined) ? objNew.StrengthMod		: 0;
		this.Willpower		= (objNew.Willpower		!== undefined) ? objNew.Willpower		: 1;
		this.Willpower_Max	= (objNew.Willpower_Max	!== undefined) ? objNew.Willpower_Max	: 6;
		this.WillpowerMod	= (objNew.WillpowerMod	!== undefined) ? objNew.WillpowerMod	: 0;
		this.Intuition		= (objNew.Intuition		!== undefined) ? objNew.Intuition		: 1;
		this.Intuition_Max	= (objNew.Intuition_Max	!== undefined) ? objNew.Intuition_Max	: 6;
		this.IntuitionMod	= (objNew.IntuitionMod	!== undefined) ? objNew.IntuitionMod	: 0;
		this.Logic			= (objNew.Logic			!== undefined) ? objNew.Logic			: 1;
		this.Logic_Max		= (objNew.Logic_Max		!== undefined) ? objNew.Logic_Max		: 6;
		this.LogicMod		= (objNew.LogicMod		!== undefined) ? objNew.LogicMod		: 0;
		this.Charisma		= (objNew.Charisma		!== undefined) ? objNew.Charisma		: 1;
		this.Charisma_Max	= (objNew.Charisma_Max	!== undefined) ? objNew.Charisma_Max	: 6;
		this.CharismaMod	= (objNew.CharismaMod	!== undefined) ? objNew.CharismaMod		: 0;
		this.Edge			= (objNew.Edge			!== undefined) ? objNew.Edge			: 1;
		this.Edge_Max		= (objNew.Edge_Max		!== undefined) ? objNew.Edge_Max		: 6;
		this.EdgeMod		= (objNew.EdgeMod		!== undefined) ? objNew.EdgeMod			: 0;
		this.Essence		= (objNew.Essence		!== undefined) ? objNew.Essence			: 6;
		this.Special		= (objNew.Special		!== undefined) ? objNew.Special			: 1;
		this.Special_Max	= (objNew.Special_Max	!== undefined) ? objNew.Special_Max		: 6;
		this.SpecialMod		= (objNew.SpecialMod	!== undefined) ? objNew.SpecialMod		: 0;
		this.SpecialName	= (objNew.SpecialName	!== undefined) ? objNew.SpecialName		: "NONE";
		this.SpecialResistAttr	= (objNew.SpecialResistAttr	!== undefined) ? objNew.SpecialResistAttr	: "NONE"; //Either NONE or attribute
		this.updateSpecialResist();
		return;
	}//end Attributes::replace()

	/**
	 * @function draw()
	 * Formats class into an html table.
	 * 
	 * @param {integer} intId
	 *		Identifier ensures each draw has a unique set of id's in DOM.
	 * 
	 * @return {string}
	 *		Html format of table to display class variables.
	 */
	this.draw			= function(){
		document.getElementById("AttributeBody").innerHTML = (this.Body + this.BodyMod) + "/" + this.Body_Max
		document.getElementById("AttributeAgility").innerHTML = (this.Agility + this.AgilityMod) + "/" + this.Agility_Max
		document.getElementById("AttributeReaction").innerHTML = (this.Reaction + this.ReactionMod) + "/" + this.Reaction_Max
		document.getElementById("AttributeStrength").innerHTML = (this.Strength + this.StrengthMod) + "/" + this.Strength_Max
		document.getElementById("AttributeWillpower").innerHTML = (this.Willpower + this.WillpowerMod) + "/" + this.Willpower_Max
		document.getElementById("AttributeIntuition").innerHTML = (this.Intuition + this.IntuitionMod) + "/" + this.Intuition_Max
		document.getElementById("AttributeLogic").innerHTML = (this.Logic + this.LogicMod) + "/" + this.Logic_Max
		document.getElementById("AttributeCharisma").innerHTML = (this.Charisma + this.CharismaMod) + "/" + this.Charisma_Max
		document.getElementById("AttributeEssence").innerHTML = this.Essence
		document.getElementById("AttributeEdge").innerHTML = (this.Edge + this.EdgeMod) + "/" + this.Edge_Max
		//Handle special attributes
		document.getElementById("AttributeSpecialLabel").setAttribute("class","hidden");
		document.getElementById("AttributeSpecial").setAttribute("class","hidden");
		document.getElementById("SpecialResistAttributeName").setAttribute("class","hidden");
		document.getElementById("SpecialResistAttribute").setAttribute("class","hidden");
		document.getElementById("SpecialEditResistAttribute").setAttribute("class","hidden");
		if (this.SpecialName != "NONE") {
			document.getElementById("AttributeSpecialLabel").setAttribute("class","visible");
			document.getElementById("AttributeSpecial").setAttribute("class","visible");
			document.getElementById("AttributeSpecialLabel").innerHTML = this.SpecialName.substring(0,3);
			document.getElementById("AttributeSpecial").innerHTML = (this.Special + this.SpecialMod) + "/" + this.Special_Max;
			document.getElementById("SpecialResistAttributeName").setAttribute("class","visible");
			document.getElementById("SpecialResistAttribute").setAttribute("class","visible");
			document.getElementById("SpecialResistAttributeName").innerHTML = this.SpecialResistName + ":";
			document.getElementById("SpecialResistAttribute").innerHTML = this.SpecialResistAttr + "(" + this.SpecialResist + ")";
		}
		return;
	}//end Attributes::draw()

	/**
	 * @function drawEdit()
	 * Formats class into an html table to make object editable.
	 * 
	 * @param {integer} intId
	 *		Identifier ensures each draw has a unique set of id's in DOM.
	 * 
	 * @return {string}
	 *		Html format of table to display class variables for editing.
	 */
	this.drawEdit		= function(){
		document.getElementById("AttributeBody").innerHTML = "<input type=\"number\" id=\"AttributeEditBody\" style=\"width:20px;\" value=\"" + this.Body + "\">";
		document.getElementById("AttributeBody").innerHTML += "/" + "<input type=\"number\" id=\"AttributeEditBodyMax\" style=\"width:20px;\" value=\"" + this.Body_Max + "\">";
		document.getElementById("AttributeAgility").innerHTML = "<input type=\"number\" id=\"AttributeEditAgility\" style=\"width:20px;\" value=\"" + this.Agility + "\">";
		document.getElementById("AttributeAgility").innerHTML += "/" + "<input type=\"number\" id=\"AttributeEditAgilityMax\" style=\"width:20px;\" value=\"" + this.Agility_Max + "\">";
		document.getElementById("AttributeReaction").innerHTML = "<input type=\"number\" id=\"AttributeEditReaction\" style=\"width:20px;\" value=\"" + this.Reaction + "\">";
		document.getElementById("AttributeReaction").innerHTML += "/" + "<input type=\"number\" id=\"AttributeEditReactionMax\" style=\"width:20px;\" value=\"" + this.Reaction_Max + "\">";
		document.getElementById("AttributeStrength").innerHTML = "<input type=\"number\" id=\"AttributeEditStrength\" style=\"width:20px;\" value=\"" + this.Strength + "\">";
		document.getElementById("AttributeStrength").innerHTML += "/" + "<input type=\"number\" id=\"AttributeEditStrengthMax\" style=\"width:20px;\" value=\"" + this.Strength_Max + "\">";
		document.getElementById("AttributeWillpower").innerHTML = "<input type=\"number\" id=\"AttributeEditWillpower\" style=\"width:20px;\" value=\"" + this.Willpower + "\">";
		document.getElementById("AttributeWillpower").innerHTML += "/" + "<input type=\"number\" id=\"AttributeEditWillpowerMax\" style=\"width:20px;\" value=\"" + this.Willpower_Max + "\">";
		document.getElementById("AttributeIntuition").innerHTML = "<input type=\"number\" id=\"AttributeEditIntuition\" style=\"width:20px;\" value=\"" + this.Intuition + "\">";
		document.getElementById("AttributeIntuition").innerHTML += "/" + "<input type=\"number\" id=\"AttributeEditIntuitionMax\" style=\"width:20px;\" value=\"" + this.Intuition_Max + "\">";
		document.getElementById("AttributeLogic").innerHTML = "<input type=\"number\" id=\"AttributeEditLogic\" style=\"width:20px;\" value=\"" + this.Logic + "\">";
		document.getElementById("AttributeLogic").innerHTML += "/" + "<input type=\"number\" id=\"AttributeEditLogicMax\" style=\"width:20px;\" value=\"" + this.Logic_Max + "\">";
		document.getElementById("AttributeCharisma").innerHTML = "<input type=\"number\" id=\"AttributeEditCharisma\" style=\"width:20px;\" value=\"" + this.Charisma + "\">";
		document.getElementById("AttributeCharisma").innerHTML += "/" + "<input type=\"number\" id=\"AttributeEditCharismaMax\" style=\"width:20px;\" value=\"" + this.Charisma_Max + "\">";
		document.getElementById("AttributeEssence").innerHTML = "<input type=\"number\" id=\"AttributeEditEssence\" style=\"width:20px;\" value=\"" + this.Essence + "\">";
		document.getElementById("AttributeEdge").innerHTML = "<input type=\"number\" id=\"AttributeEditEdge\" style=\"width:20px;\" value=\"" + this.Edge + "\">";
		document.getElementById("AttributeEdge").innerHTML += "/" + "<input type=\"number\" id=\"AttributeEditEdgeMax\" style=\"width:20px;\" value=\"" + this.Edge_Max + "\">";
		//Handle special attributes
		document.getElementById("AttributeSpecialLabel").setAttribute("class","hidden");
		document.getElementById("AttributeSpecial").setAttribute("class","hidden");
		document.getElementById("SpecialResistAttributeName").setAttribute("class","hidden");
		document.getElementById("SpecialResistAttribute").setAttribute("class","hidden");
		document.getElementById("SpecialEditResistAttribute").setAttribute("class","hidden");
		document.getElementById("AttributeSpecial").innerHTML = "<input type=\"number\" id=\"AttributeEditSpecial\" style=\"width:20px;\" value=\"" + this.Special + "\">";
		document.getElementById("AttributeSpecial").innerHTML += "/" + "<input type=\"number\" id=\"AttributeEditSpecialMax\" style=\"width:20px;\" value=\"" + this.Special_Max + "\">";
		if (this.SpecialName != "NONE") {
			document.getElementById("AttributeSpecialLabel").setAttribute("class","visible");
			document.getElementById("AttributeSpecial").setAttribute("class","visible");
			document.getElementById("AttributeSpecialLabel").innerHTML = this.SpecialName;
			document.getElementById("SpecialResistAttributeName").setAttribute("class","visible");
			document.getElementById("SpecialEditResistAttribute").setAttribute("class","visible");
			document.getElementById("SpecialResistAttributeName").innerHTML = this.SpecialResistName + ":";
		}
		return;
	}//end Attributes::drawEdit()

	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 *		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(){
		this.Body 			= parseInt(document.getElementById("AttributeEditBody").value);
		this.Body_Max 		= parseInt(document.getElementById("AttributeEditBodyMax").value);
		this.Agility 		= parseInt(document.getElementById("AttributeEditAgility").value);
		this.Agility_Max 	= parseInt(document.getElementById("AttributeEditAgilityMax").value);
		this.Reaction 		= parseInt(document.getElementById("AttributeEditReaction").value);
		this.Reaction_Max 	= parseInt(document.getElementById("AttributeEditReactionMax").value);
		this.Strength 		= parseInt(document.getElementById("AttributeEditStrength").value);
		this.Strength_Max 	= parseInt(document.getElementById("AttributeEditStrengthMax").value);
		this.Willpower 		= parseInt(document.getElementById("AttributeEditWillpower").value);
		this.Willpower_Max 	= parseInt(document.getElementById("AttributeEditWillpowerMax").value);
		this.Intuition 		= parseInt(document.getElementById("AttributeEditIntuition").value);
		this.Intuition_Max 	= parseInt(document.getElementById("AttributeEditIntuitionMax").value);
		this.Logic 			= parseInt(document.getElementById("AttributeEditLogic").value);
		this.Logic_Max 		= parseInt(document.getElementById("AttributeEditLogicMax").value);
		this.Charisma 		= parseInt(document.getElementById("AttributeEditCharisma").value);
		this.Charisma_Max 	= parseInt(document.getElementById("AttributeEditCharismaMax").value);
		this.Essence 		= parseInt(document.getElementById("AttributeEditEssence").value);
		this.Edge 			= parseInt(document.getElementById("AttributeEditEdge").value);
		this.Edge_Max 		= parseInt(document.getElementById("AttributeEditEdgeMax").value);
		this.Special		= parseInt(document.getElementById("AttributeEditSpecial").value);
		this.Special_Max	= parseInt(document.getElementById("AttributeEditSpecialMax").value);
		this.SpecialResistAttr = document.getElementById("SpecialEditResistAttribute").value;
		val = document.getElementById("SpecialEditType").value;
		if (val == "mundane") {
			this.SpecialName	= "NONE";
		}else if (val == "technomancer") {
			this.SpecialName	= "Resonance";
		}else {
			this.SpecialName	= "Magic"
		}
		this.updateSpecialResist();
		return;
	}//end Attributes::updateFromEdit()

	/**
	 * @function updateSpecialResist()
	 * Evaluates Special Resist Name and Value.
	 * 
	 */
	this.updateSpecialResist = function(){
		if (this.SpecialName.toLowerCase() == "magic") {
			this.SpecialResistName = "Drain";
		}else if (this.SpecialName.toLowerCase() == "resonance"){
			this.SpecialResistName = "Fading";
		}
		this.SpecialResist	= this.getattribute(this.SpecialResistAttr) + this.getattributeMod(this.SpecialResistAttr);
		return;
	}//end Attributes::updateSpecialResist()

	/**
	 * @function getattribute()
	 * Gets the value of the requested attribute by string name.
	 * Value is calculated with Base Value and Modifier
	 *
	 * @param {string} strval
	 *		String name of attribute to return
	 * @return {integer}
	 *		Base Value + Modifier
	 */
	this.getattribute	= function(strval){
		strval = strval.toUpperCase();
		if(strval == "BODY")			return this.Body + this.BodyMod;
		if(strval == "AGILITY")			return this.Agility + this.AgilityMod;
		if(strval == "REACTION")		return this.Reaction + this.ReactionMod;
		if(strval == "STRENGTH")		return this.Strength + this.StrengthMod;
		if(strval == "WILLPOWER")		return this.Willpower + this.WillpowerMod;
		if(strval == "INTUITION")		return this.Intuition + this.IntuitionMod;
		if(strval == "LOGIC")			return this.Logic + this.LogicMod;
		if(strval == "CHARISMA")		return this.Charisma + this.CharismaMod;
		if(strval == "EDGE")			return this.Edge + this.EdgeMod;
		if(strval == "ESSENCE")			return this.Essence + this.EssenceMod;
		if(strval == "INITIATIVE")		return actchar.ConMon.InitiativeBase + actchar.ConMon.InitiativeMod;
		if(strval == "INITIATIVE DICE") return actchar.ConMon.InitiativeDice + actchar.ConMon.InitiativeDiceMod;
		if(strval == this.SpecialName.toUpperCase())		return this.Special + this.SpecialMod;
		if(strval == this.SpecialResistName.toUpperCase())	return this.SpecialResist;
		return 0;
	}//end Attributes:getattribute()

	/**
	 * @function getattributeMod()
	 * Gets the modifying value of the requested attribute by string name.
	 *
	 * @param {string} strval
	 *		String name of attribute to return
	 * @return {integer}
	 *		Attribute Modifier
	 */
	this.getattributeMod	= function(strval){
		strval = strval.toUpperCase();
		if (strval == "BODY")				return this.BodyMod;
		if (strval == "AGILITY")			return this.AgilityMod;
		if (strval == "REACTION")			return this.ReactionMod;
		if (strval == "STRENGTH")			return this.StrengthMod;
		if (strval == "WILLPOWER")			return this.WillpowerMod;
		if (strval == "INTUITION")			return this.IntuitionMod;
		if (strval == "LOGIC")				return this.LogicMod;
		if (strval == "CHARISMA")			return this.CharismaMod;
		if (strval == "EDGE")				return this.EdgeMod;
		if (strval == "INITIATIVE")			return actchar.ConMon.InitiativeMod;
		if (strval == "INITIATIVE DICE")	return actchar.ConMon.InitiativeDiceMod;
		if (strval == this.SpecialName.toUpperCase())		return this.SpecialMod;
		if (strval == this.SpecialResistName.toUpperCase())	return this.getattributeMod(this.SpecialResistName);
		return 0;
	}//end Attributes:getattributeMod()

	/**
	 * @function getattributeMax()
	 * Gets the maximum value of the requested attribute by string name.
	 *
	 * @param {string} strval
	 *		String name of attribute to return
	 * @return {integer}
	 *		Attribute Maximum
	 */
	this.getattributeMax	= function(strval){
		strval = strval.toUpperCase();
		if (strval == "BODY")		return this.Body_Max;
		if (strval == "AGILITY")	return this.Agility_Max;
		if (strval == "REACTION")	return this.Reaction_Max;
		if (strval == "STRENGTH")	return this.Strength_Max;
		if (strval == "WILLPOWER")	return this.Willpower_Max;
		if (strval == "INTUITION")	return this.Intuition_Max;
		if (strval == "LOGIC")		return this.Logic_Max;
		if (strval == "CHARISMA")	return this.Charisma_Max;
		if (strval == "EDGE")		return this.Edge_Max;
		if (strval == "ESSENCE")	return this.Essence_Max;
		if (strval == this.SpecialName.toUpperCase())		return this.Special_Max;
		if (strval == this.SpecialResistName.toUpperCase())	return this.getattributeMax(this.SpecialResistName);
		return 0;
	}//end Attributes:getattributeMax()

	/**
	 * @function setattribute()
	 * Sets the Base Value of the requested attribute to the given value
	 * 
	 * @param {string} strval
	 *		String name of attribute to change
	 * @param {integer} intval
	 *		New Value for attribute
	 */
	this.setattribute	= function(strval, intval){
		strval = strval.toUpperCase();
		if (strval == "BODY")		this.Body		= intval;
		if (strval == "AGILITY")	this.Agility	= intval;
		if (strval == "REACTION")	this.Reaction	= intval;
		if (strval == "STRENGTH")	this.Strength	= intval;
		if (strval == "WILLPOWER")	this.Willpower	= intval;
		if (strval == "INTUITION")	this.Intuition	= intval;
		if (strval == "LOGIC")		this.Logic		= intval;
		if (strval == "CHARISMA")	this.Charisma	= intval;
		if (strval == "EDGE")		this.Edge		= intval;
		if (strval == "ESSENCE")	this.Essence	= intval;
		if (strval == this.SpecialName.toUpperCase)			this.Special = intval;
		if (strval == this.SpecialResistName.toUpperCase)	this.setattribute(this.SpecialResistName, intval);
		return;
	}//end Attributes::setattribute()

	/**
	 * @function setattributeMod()
	 * Sets the Modifying Value of the requested attribute to the given value
	 * 
	 * @param {string} strval
	 *		String name of attribute to change
	 * @param {integer} intval
	 *		New Value for attribute
	 */
	this.setattributeMod	= function(strval, intval){
		strval = strval.toUpperCase();
		if (strval == "BODY")				this.BodyMod		= intval;
		if (strval == "AGILITY")			this.AgilityMod		= intval;
		if (strval == "REACTION")			this.ReactionMod	= intval;
		if (strval == "STRENGTH")			this.StrengthMod	= intval;
		if (strval == "WILLPOWER")			this.WillpowerMod	= intval;
		if (strval == "INTUITION")			this.IntuitionMod	= intval;
		if (strval == "LOGIC")				this.LogicMod		= intval;
		if (strval == "CHARISMA")			this.CharismaMod	= intval;
		if (strval == "EDGE")				this.EdgeMod		= intval;
		if (strval == "ESSENCE")			this.EssenceMod		= intval;
		if (strval == "INITIATIVE")			actchar.ConMon.InitiativeMod		= intval;
		if (strval == "INITIATIVE DICE") 	actchar.ConMon.InitiativeDiceMod	= intval;
		if (strval == this.SpecialName.toUpperCase)			this.SpecialMod = intval;
		if (strval == this.SpecialResistName.toUpperCase)	this.setattributeMod(this.SpecialResistName, intval);
		return;
	}//end Attributes::setattributeMod()

	/**
	 * @function setattributeMax()
	 * Sets the Maximum Value of the requested attribute to the given value
	 * 
	 * @param {string} strval
	 *		String name of attribute to change
	 * @param {integer} intval
	 *		New Value for attribute
	 */
	this.setattributeMax	= function(strval, intval){
		strval = strval.toUpperCase();
		if (strval == "BODY")		this.Body_Max		= intval;
		if (strval == "AGILITY")	this.Agility_Max	= intval;
		if (strval == "REACTION")	this.Reaction_Max	= intval;
		if (strval == "STRENGTH")	this.Strength_Max	= intval;
		if (strval == "WILLPOWER")	this.Willpower_Max	= intval;
		if (strval == "INTUITION")	this.Intuition_Max	= intval;
		if (strval == "LOGIC")		this.Logic_Max		= intval;
		if (strval == "CHARISMA")	this.Charisma_Max	= intval;
		if (strval == "EDGE")		this.Edge_Max		= intval;
		if (strval == "ESSENCE")	this.Essence_Max	= intval;
		if (strval == this.SpecialName.toUpperCase)			this.Special_Max = intval;
		if (strval == this.SpecialResistName.toUpperCase)	this.setattributeMax(this.SpecialResistName, intval);
		return;
	}//end Attributes::setattributeMax()

	this.updateSpecialResist();
}//end Attributes
