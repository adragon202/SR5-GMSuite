/**
 * @file
 * Condition Monitor Class used by Characters
 *
 */

/**
 * @class ConditionMonitor
 *		Handles Initiative, Stun, Physical and Overflow Damage.
 *
 * @param {integer} intOwnerID
 *		Identifier for Character, useful in cross class calculations.
 * @param {Attributes} objAttributes
 *		Attributes to use to calculate Maximums and Initiative
 * @param {integer} intInitiative
 *		Current Initiative
 *
 * @var {integer} id
 *		Identifier for Character, useful in cross class calculations.
 * @var {integer} Initiative
 *		Current Initiative
 * @var {integer} InitiativeBase
 *		Calculated from given Attributes.
 *		Used in Initiative Rolls.
 * @var {string} InitiativeMode
 *		Determined how InitiativeBase is calculated.
 *		Determines value of InitiativeDice
 *		Used in Initiative Rolls.
 * @var {integer} InitiativeMod
 *		Adds to InitiativeBase for Initiative Rolls.
 *		Used in Initiative Rolls.
 * @var {integer} InitiativeDice
 *		Set by InitiativeMode
 *		Used in Initiative Rolls.
 * @var {integer} InitiativeDiceMod
 *		Adds to InitiativeDice for Initiative Rolls.
 *		Used in Initiative Rolls.
 * @var {integer} Stun
 *		Current Damage
 * @var {integer} Physical
 *		Current Damage
 * @var {integer} Overflow
 *		Current Damage
 * @var {integer} Wounds
 *		Calculated based on Current Damage
 * @var {integer} Stun_Max
 *		Calculated from given Attributes
 * @var {integer} Physical_Max
 *		Calculated from given Attributes
 * @var {integer} Overflow_Max
 *		Calculated from given Attributes
 *
 * @function replace()
 * @function draw()
 * @function drawMode()
 * @function drawPhysical()
 * @function drawStun()
 * @function changeMode()
 * @function changePhysical()
 * @function addPhysical()
 * @function remPhysical()
 * @function changeStun()
 * @function addStun()
 * @function remStun()
 * @function recalc_Max()
 * @function calc_Wounds()
 * @function reduceInitiative()
 */
function ConditionMonitor(intOwnerID, objAttributes, intInitiative)
{
	//Object Variables
	this.id					= (intOwnerID	!== undefined) ? intOwnerID		: -1;
	this.Initiative			= (intInitiative!== undefined) ? intInitiative	: 0;
	this.InitiativeMode		= "Physical";
	this.InitiativeMod		= 0;
	this.InitiativeDice		= 1;
	this.InitiativeDiceMod	= 0;
	this.Stun				= 0;
	this.Physical			= 0;
	this.Overflow			= 0;

	//Calculate from objAttributes
	this.InitiativeBase	= 0;
	this.Stun_Max		= 0;
	this.Physical_Max	= 0;
	this.Overflow_Max	= 0;
	//Calculate from Damage
	this.Wounds 		= 0;
	//recalc at bottom

	//Object Methods
	/**
	 * @function replace()
	 * 		Handles loading object with similar variables but no functions into
	 * 		Primary use is when loading character and session files
	 * 
	 * @param {object} objNew
	 * 		Object with similar variables to load
	 */
	this.replace		= function(objNew){
		this.InitiativeMode		= (objNew.InitiativeMode	!== undefined) ? objNew.InitiativeMode		: "Physical";
		this.Initiative			= (objNew.Initiative		!== undefined) ? objNew.Initiative			: 0;
		this.InitiativeBase		= (objNew.InitiativeBase	!== undefined) ? objNew.InitiativeBase		: 0;
		this.InitiativeMod		= (objNew.InitiativeMod		!== undefined) ? objNew.InitiativeMod		: 0;
		this.InitiativeDice		= (objNew.InitiativeDice	!== undefined) ? objNew.InitiativeDice		: 1;
		this.InitiativeDiceMod	= (objNew.InitiativeDiceMod	!== undefined) ? objNew.InitiativeDiceMod	: 0;
		this.Stun				= (objNew.Stun				!== undefined) ? objNew.Stun				: 0;
		this.Stun_Max			= (objNew.Stun_Max			!== undefined) ? objNew.Stun_Max			: 0;
		this.Physical			= (objNew.Physical			!== undefined) ? objNew.Physical			: 0;
		this.Physical_Max		= (objNew.Physical_Max		!== undefined) ? objNew.Physical_Max		: 0;
		this.Overflow			= (objNew.Overflow			!== undefined) ? objNew.Overflow			: 0;
		this.Overflow_Max		= (objNew.Overflow_Max		!== undefined) ? objNew.Overflow_Max		: 0;
		this.Wounds 			= (objNew.Wounds			!== undefined) ? objNew.Wounds				: 0;
		return;
	}//end ConditionMonitor::replace()

	/**
	 * @function draw()
	 * 		Renders the Condition Monitor information in the prepared space on the gui.
	 * 
	 */
	this.draw			= function() {
		this.drawMode();
		this.drawPhysical();
		this.drawStun();
		return;
	}//end ConditionMonitor::draw()

	/**
	 * @function drawMode()
	 * 		Draws the Initiative Calculations
	 * 
	 */
	this.drawMode		= function() {
		document.getElementById("InitiativeMode" + removeSpecial(this.InitiativeMode.toLowerCase())).checked = true;
		document.getElementById("InitiativeBase").innerHTML = "Init = ";
		document.getElementById("InitiativeBase").innerHTML += (this.InitiativeBase + this.InitiativeMod);
		document.getElementById("InitiativeBase").innerHTML += " + ";
		document.getElementById("InitiativeBase").innerHTML += (this.InitiativeDice + this.InitiativeDiceMod);
		document.getElementById("InitiativeBase").innerHTML += "D6";
		return;
	}//end ConditionMonitor::drawMode()

	/**
	 * @function drawPhysical()
	 * 		Renders the Physical Hit Boxes
	 * 
	 */
	this.drawPhysical	= function() {
		for (var i = 1; i < 19; i++) {
			var elem = document.getElementById("physical" + i);
			// Set Maximum
			if (i > (this.Physical_Max + this.Overflow_Max)) {
				elem.getElementsByClassName("healthbox")[0].setAttribute("id", "inactive");
				elem.getElementsByClassName("healthboxX")[0].setAttribute("id", "off");
				continue;
			}
			// Set Overflow
			if (i > this.Physical_Max) {
				elem.getElementsByClassName("healthbox")[0].setAttribute("id", "overflow");
				if (i - this.Physical_Max <= this.Overflow) {
					elem.getElementsByClassName("healthboxX")[0].setAttribute("id", "on");
				}else{
					elem.getElementsByClassName("healthboxX")[0].setAttribute("id", "off");
				}
				continue;
			}
			//If not over max and not overflow, then simply active
			elem.getElementsByClassName("healthbox")[0].setAttribute("id", "active");
			elem.getElementsByClassName("healthboxX")[0].setAttribute("id", "off");
			// Set Physical Damage
			if (i <= this.Physical) {
				elem.getElementsByClassName("healthboxX")[0].setAttribute("id", "on");
				continue;
			}
		}
		return;
	}//end ConditionMonitor::drawPhysical()

	/**
	 * @function drawStun()
	 * 		Renders the Stun Hit Boxes
	 * 
	 */
	this.drawStun		= function() {
		for (var i = 1; i < 12; i++) {
			var elem = document.getElementById("stun" + i);
			// Set Maximum
			if (i > (this.Stun_Max)) {
				elem.getElementsByClassName("healthbox")[0].setAttribute("id", "inactive");
				continue;
			}
			//If not over max, then simply active
			elem.getElementsByClassName("healthbox")[0].setAttribute("id", "active");
			elem.getElementsByClassName("healthboxX")[0].setAttribute("id", "off");
			// Set Stun Damage
			if (i <= this.Stun) {
				elem.getElementsByClassName("healthboxX")[0].setAttribute("id", "on");
				continue;
			}
		}
		return;
	}//end ConditionMonitor::drawStun()

	/**
	 * @function changeMode()
	 * 		Sets the Initiative Mode based on the given string.
	 * 		Calculates the Base Initiative and Initiative Dice after setting the new Initiative mode  
	 *
	 * @param strNewMode
	 *		String value of new mode. Can be one of the following values.
	 *			physical
	 *			matrixcold
	 *			matrixhot
	 *			astral
	 */
	this.changeMode		= function(strNewMode) {
		console.log("Changing Mode from " + this.InitiativeMode + " to " + strNewMode);
		strNewMode = strNewMode.toLowerCase();
		//Set Initiative Mode to Physical
		if (strNewMode == "physical") {
			this.InitiativeMode = "Physical";
			if (this.id == -1 || chars[this.id] === undefined) {
				this.InitiativeBase = 2;
			}else{
				this.InitiativeBase	= chars[this.id].Attributes.Intuition + chars[this.id].Attributes.Reaction;
			}
			this.InitiativeDice = 1;
		//Set Initiative Mode to Matrix Cold
		}else if (strNewMode == "matrixcold") {
			this.InitiativeMode = "Matrix Cold";
			if (this.id == -1 || chars[this.id] === undefined) {
				this.InitiativeBase = 2;
			}else{
				this.InitiativeBase	= chars[this.id].Attributes.Intuition + chars[this.id].Cyberdeck.dataproc;
			}
			this.InitiativeDice = 3;
		//Set Initiative Mode to Matrix Hot
		}else if (strNewMode == "matrixhot") {
			this.InitiativeMode = "Matrix Hot";
			if (this.id == -1 || chars[this.id] === undefined) {
				this.InitiativeBase = 2;
			}else{
				this.InitiativeBase	= chars[this.id].Attributes.Intuition + chars[this.id].Cyberdeck.dataproc;
			}
			this.InitiativeDice = 4;
		//Set Initiative Mode to Astral
		}else if (strNewMode == "astral") {
			this.InitiativeMode = "Astral";
			if (this.id == -1 || chars[this.id] === undefined) {
				this.InitiativeBase = 2;
			}else{
				this.InitiativeBase	= chars[this.id].Attributes.Intuition + chars[this.id].Attributes.Intuition;
			}
			this.InitiativeDice = 2;
		}
		this.drawMode();
		return;
	}//end ConditionMonitor::changeMode()

	/**
	 * @function changePhysical()
	 *		Determines if new value qualifies as damage or heal.
	 *		If the new value is equal to the current value then it qualifies as a heal 
	 *
	 * @param intNewVal
	 *		New Value to set the Physical Damage to
	 */
	this.changePhysical	= function(intNewVal) {
		intNewVal = (isNaN(intNewVal)) ? 0 : intNewVal;
		if(this.Physical + this.Overflow > intNewVal){
			this.remPhysical(this.Physical + this.Overflow - intNewVal);
		}else if(this.Physical + this.Overflow < intNewVal){
			this.addPhysical(intNewVal - this.Physical - this.Overflow);
		}else{ //if(this.Physical == intNewVal)
			this.remPhysical();
		}
		return;
	}//end ConditionMonitor::ChangePhysical()

	/**
	 * @function addPhysical()
	 *		Applies given value as damage. Going into overflow as needed.
	 *		Recalculates Wounds afterwards.
	 * 
	 * @param intDV
	 *		Value to add to Physical
	 */
	this.addPhysical	= function(intDV) {
		if (intDV === undefined) {
			intDV = 1;
		}
		if (this.Physical == this.Physical_Max) {
			this.Overflow = (this.Overflow + intDV > this.Overflow_Max) ? this.Overflow_Max : this.Overflow + intDV;
		}else if(this.Physical + intDV > this.Physical_Max) {
			var over = intDV - (this.Physical_Max - this.Physical);
			this.Physical = this.Physical_Max;
			this.Overflow = (over > this.Overflow_Max) ? this.Overflow_MAX : over;
		}else{
			this.Physical = this.Physical + intDV;
		}
		this.calc_Wounds();
		this.drawPhysical();
		redrawInitiativeList();
		return;
	}//end ConditionMonitor::ChangePhysical()

	/**
	 * @function remPhysical()
	 * 		Removes given value from damage.
	 *		Recalculates Wounds afterwards.
	 *
	 * @param intHeal
	 *		Value to remove from Physical Damage
	 */
	this.remPhysical	= function(intHeal) {
		if (intHeal === undefined) {
			intHeal = 1;
		}
		if (this.Overflow > 0)
		{
			var over = intHeal - this.Overflow;
			this.Overflow = (this.Overflow > intHeal) ? this.Overflow - intHeal : 0;
			//Catch that over isn't negative.
			if(over > 0) this.Physical = (this.Physical > over) ? this.Physical - over : 0;
		}else
		{
			this.Physical = (intHeal < this.Physical) ? this.Physical - intHeal : 0;
		}
		this.calc_Wounds();
		this.drawPhysical();
		redrawInitiativeList();
		return;
	}//end ConditionMonitor::ChangePhysical()

	/**
	 * @function changeStun()
	 *		Determines if new value qualifies as damage or heal.
	 *		If the new value is equal to the current value then it qualifies as a heal 
	 *
	 * @param intNewVal
	 *		New Value to set the Stun Damage to
	 */
	this.changeStun		= function(intNewVal) {
		if(this.Stun > intNewVal){
			this.remStun(this.Stun - intNewVal);
		}else if(this.Stun < intNewVal){
			this.addStun(intNewVal - this.Stun);
		}else{ //if(this.Stun == intNewVal)
			this.remStun();
		}
		redrawInitiativeList();
		return;
	}//end ConditionMonitor::ChangeStun()

	/**
	 * @function addStun()
	 *		Applies given value as Stun Damage. Going into Physical as needed.
	 *		Recalculates Wounds afterwards.
	 * 
	 * @param intDV
	 *		Value to add to Stun Damage
	 */
	this.addStun	= function(intDV) {
		if (intDV === undefined) {
			intDV = 1;
		}
		if (this.Stun == this.Stun_Max) {
			this.addPhysical(intDV);
		}else if(this.Stun + intDV > this.Stun_Max) {
			var over = intDV - (this.Stun_Max - this.Stun);
			this.Stun = this.Stun_Max;
			this.addPhysical(over);
		}else{
			this.Stun = this.Stun + intDV;
		}
		this.calc_Wounds();
		this.drawStun();
		redrawInitiativeList();
		return;
	}//end ConditionMonitor::ChangePhysical()

	/**
	 * @function remStun()
	 * 		Removes given value from damage.
	 *		Recalculates Wounds afterwards.
	 * 
	 * @param
	 *		Value to remove from Stun Damage
	 */
	this.remStun	= function(intHeal) {
		if (intHeal === undefined) {
			intHeal = 1;
		}
		this.Stun = (this.Stun > intHeal) ? this.Stun - intHeal : 0;  
		this.calc_Wounds();
		this.drawStun();
		redrawInitiativeList();
		return;
	}//end ConditionMonitor::ChangePhysical()

	/**
	 * @function recalc_Max()
	 * 		Calculates the Maximum values for condition monitor based on the given attributes
	 *		Generates a default attribute set of 1's if not given.
	 * 
	 * @param objAttributes
	 *		Attributes Object used to calculate Condition Monitor Maximums
	 */
	this.recalc_Max		= function(objAttributes) {
		if(objAttributes === undefined){
			objAttributes	= new Attributes(this.id);
		}
		this.Stun_Max		= 8 + Math.ceil((objAttributes.Willpower / 2));
		this.Physical_Max	= 8 + Math.ceil((objAttributes.Body / 2));
		this.Overflow_Max	= Math.ceil(objAttributes.Body);
		this.changeMode(removeSpecial(this.InitiativeMode));
		return;
	}//end ConditionMonitor::recalc_Max()

	/**
	 * @function calc_Wounds()
	 * 		Calculates Wounds based on damage.
	 *		Updates initiative based on change in Wounds.
	 *
	 */
	this.calc_Wounds 	= function() {
		var oldWounds = this.Wounds;
		//Every third stun and physical adds to wounds
		this.Wounds = Math.floor(this.Physical / 3) + Math.floor(this.Stun / 3);
		//Every extra wound reduces initiative
		if (oldWounds < this.Wounds) this.reduceInitiative(this.Wounds - oldWounds);
		return;
	}//end ConditionMonitor::calc_Wounds()

	/**
	 * @function reduceInitiative()
	 *		reduces the Initiative by the given value.
	 * 
	 * @param intVal
	 *		Amount to reduce initiative by
	 *		Defaults to 1
	 */
	this.reduceInitiative = function(intVal) {
		if (intVal === undefined) intVal = 1;
		this.Initiative = (this.Initiative > intVal) ? this.Initiative - intVal : 0;
		return;
	}//end ConditionMonitor::reduce_Initiative()

	//recalculate initial values after initial setup
	this.recalc_Max(objAttributes);
}//end ConditionMonitor
