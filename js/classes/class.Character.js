/**
 * @file
 *
 *
 */

/**
 * @class Character()
 *
 * @param {integer}			intID
 *		Unique ID for Character, based on placement in current sessions char[]
 * @param {string}			strName
 * @param {string}			strOwner
 * @param {boolean}			boolPlayer
 * @param {string}			strMetatype
 * @param {string}			strSpecial
 * @param {Attributes}		objAttr
 * @param {Skill[]}			arrSkills
 * @param {SkillGroup[]}	arrSkillGroups
 * @param {Gear[]}			arrGear
 * @param {Armor[]}			arrArmor
 * @param {Weapon[]}		arrWeapons
 * @param {Augmentation[]}	arrAugmentations
 * @param {Quality[]}		arrQualities
 * @param {Power[]}			arrPowers
 * @param {Spell[]}			arrSpells
 * @param {Cyberdeck}		objCyberdeck
 *
 * @var {integer}			id
 *		Unique ID for Character, based on placement in current sessions char[]
 * @var {string}			Name
 * @var {string}			Owner
 * @var {boolean}			Player
 * @var {string}			Metatype
 * @var {string}			Special
 * @var {Attributes}		Attributes
 * @var {Skill[]}			Skills
 * @var {SkillGroup[]}		SkillGroups
 * @var {Gear[]}			Gear
 * @var {Armor[]}			Armor
 * @var {Weapon[]}			Weapons
 * @var {Augmentation[]}	Augmentations
 * @var {Quality[]}			Qualities
 * @var {Power[]}			Powers
 * @var {Spell[]}			Spells
 * @var {Cyberdeck}			Cyberdeck
 * @var {ConditionMonitor}	ConMon
 * @var {Limits}			Limits
 *
 * @function replace()
 * @function drawInitiativeBox()
 * @function draw()
 * @function drawTitle()
 * @function drawSkills()
 * @function drawSkillGroups()
 * @function drawGear()
 * @function drawArmor()
 * @function drawWeapons()
 * @function drawAugmentations()
 * @function drawQualities()
 * @function drawPowers()
 * @function drawSpells()
 * @function drawEdit()
 * @function drawEditTitle()
 * @function drawEditSkills()
 * @function drawEditSkillGroups()
 * @function drawEditGear()
 * @function drawEditArmor()
 * @function drawEditWeapons()
 * @function drawEditAugmentations()
 * @function drawEditQualities()
 * @function drawEditPowers()
 * @function drawEditSpells() 
 * @function addArmor()
 * @function addWeapon()
 * @function addSpell()
 * @function addSkill()
 * @function addSkillGroup()
 * @function addGear()
 * @function addAugmentation()
 * @function addQuality()
 * @function addPower()
 *
 * @function updateFromEdit()
 * @function updateBaseFromEdit()
 * @function updateAttributesFromEdit()
 * @function updateCyberdeckFromEdit()
 * @function updateArmorFromEdit()
 * @function updateWeaponFromEdit()
 * @function updateSpellFromEdit()
 * @function updateSkillFromEdit()
 * @function updateSkillGroupFromEdit()
 * @function updateGearFromEdit()
 * @function updateAugmentationFromEdit()
 * @function updateQualityFromEdit()
 * @function updatePowerFromEdit()
 * @function trimArmor()
 * @function trimWeapon()
 * @function trimSpell()
 * @function trimSkill()
 * @function trimSkillGroup()
 * @function trimGear()
 * @function trimAugmentation()
 * @function trimQuality()
 * @function trimPower()
 *
 * @function update()
 * @function updateId()
 * @function save()
 * @function load()
 * @function getJSON()
 *
 * @function getSkillIndex()
 * @function getSkillGroupIndex()
 * @function getSkillGroupIndexbySkill()
 * @function getSkill()
 * @function getSkillRating()
 * @function getSkillMod()
 * @function setSkillRating()
 * @function setSkillGroupRating()
 * @function setSkillMod()
 * @function setSkillGroupMod()
 *
 * @function rollInitiative()
 * @function getActionPool()
 */
function Character(intID, strName, strOwner, boolPlayer, strMetatype, strSpecial, objAttr,
	arrSkills, arrSkillGroups, arrGear, arrArmor, arrWeapons, arrAugmentations, arrQualities, arrPowers, arrSpells,
	objCyberdeck){
	//Object Variables
	this.id				= (intID !== undefined) ? intID : -1;
	this.Armor 			= (arrArmor !== undefined) ? arrArmor : [];
	this.Attributes		= (objAttr !== undefined) ? objAttr : new Attributes(this.id);
	this.Augmentations 	= (arrAugmentations !== undefined) ? arrAugmentations : [];
	this.Cyberdeck		= (objCyberdeck !== undefined) ? objCyberdeck : new Cyberdeck(this.id);
	this.Gear 			= (arrGear !== undefined) ? arrGear : [];
	this.Metatype		= (strMetatype !== undefined) ? strMetatype : "";
	this.Name			= (strName !== undefined) ? strName : "";
	this.Owner			= (strOwner !== undefined) ? strOwner : "GM";
	this.Player			= (boolPlayer !== undefined) ? boolPlayer : false;
	this.Powers 		= (arrPowers !== undefined) ? arrPowers : [];
	this.Qualities 		= (arrQualities !== undefined) ? arrQualities : [];
	this.SkillGroups	= (arrSkillGroups !== undefined) ? arrSkillGroups : [];
	this.Skills			= (arrSkills !== undefined) ? arrSkills : [];
	this.Special		= (strSpecial !== undefined) ? strSpecial : "mundane";
	this.Spells 		= (arrSpells !== undefined) ? arrSpells : [];
	this.Weapons 		= (arrWeapons !== undefined) ? arrWeapons : [];
	//Calculated
	this.ConMon			= new ConditionMonitor(this.id, this.Attributes);
	this.Limits 		= new Limits(this.Attributes);

	//Object Methods
	/**
	 * @function replace()
	 * Handles loading object with similar variables but no functions into
	 * Primary use is when loading character and session files
	 * 
	 * @param {object} objNew
	 * 		Object with similar variables to load
	 */
	this.replace 		= function(objNew) {
		//Replace basic variables
		this.Name			= (objNew.Name !== undefined) ? objNew.Name : "";
		this.Owner			= (objNew.Owner !== undefined) ? objNew.Owner : "GM";
		this.Player			= (objNew.Player !== undefined) ? objNew.Player : false;
		this.Metatype		= (objNew.Metatype !== undefined) ? objNew.Metatype : "";
		this.Special		= (objNew.Special !== undefined) ? objNew.Special : "mundane";
		this.ConMon.replace(objNew.ConMon);
		this.Attributes.replace(objNew.Attributes);
		this.Cyberdeck.replace(objNew.Cyberdeck);

		//Replace Arrays
		this.Skills = [];
		if (objNew.Skills !== undefined){
			for (var i = 0; i < objNew.Skills.length; i++) {
				this.Skills[i] = new Skill(this.id);
				this.Skills[i].replace(objNew.Skills[i]);
			}
		}
		this.SkillGroups = [];
		if (objNew.SkillGroups !== undefined){
			for (var i = 0; i < objNew.SkillGroups.length; i++) {
				this.SkillGroups[i] = new SkillGroup(this.id);
				this.SkillGroups[i].replace(objNew.SkillGroups[i]);
			}
		}
		this.Gear = [];
		if (objNew.Gear !== undefined){
			for (var i = 0; i < objNew.Gear.length; i++) {
				this.Gear[i] = new Gear(this.id);
				this.Gear[i].replace(objNew.Gear[i]);
			}
		}
		this.Armor = [];
		if (objNew.Armor !== undefined){
			for (var i = 0; i < objNew.Armor.length; i++) {
				this.Armor[i] = new Armor(this.id);
				this.Armor[i].replace(objNew.Armor[i]);
			}
		}
		this.Weapons = [];
		if (objNew.Weapons !== undefined){
			for (var i = 0; i < objNew.Weapons.length; i++) {
				this.Weapons[i] = new Weapon(this.id);
				this.Weapons[i].replace(objNew.Weapons[i]);
			}
		}
		this.Augmentations = [];
		if (objNew.Augmentations !== undefined){
			for (var i = 0; i < objNew.Augmentations.length; i++) {
				this.Augmentations[i] = new Augmentation(this.id);
				this.Augmentations[i].replace(objNew.Augmentations[i]);
			}
		}
		this.Qualities = [];
		if (objNew.Qualities !== undefined){
			for (var i = 0; i < objNew.Qualities.length; i++) {
				this.Qualities[i] = new Quality(this.id);
				this.Qualities[i].replace(objNew.Qualities[i]);
			}
		}
		this.Powers = [];
		if (objNew.Powers !== undefined){
			for (var i = 0; i < objNew.Powers.length; i++) {
				this.Powers[i] = new Power(this.id);
				this.Powers[i].replace(objNew.Powers[i]);
			}
		}
		this.Spells = [];
		if (objNew.Spells !== undefined){
			for (var i = 0; i < objNew.Spells.length; i++) {
				this.Spells[i] = new Spell(this.id);
				this.Spells[i].replace(objNew.Spells[i]);
			}
		}
		//Update Character calculations and display
		this.update();
		redrawInitiativeList();
		return;
	}//end Character::replace()

	/**
	 * @function drawInitiativeBox()
	 *		Renders Character as html table for displaying Condition 
	 *
	 * @return {string}
	 *		HTML formatted table
	 */
	this.drawInitiativeBox	= function() {
		var listelem = document.getElementById("InitiativeList");
		// var tmpstr = listelem.innerHTML;
		var tmpstr =	"<table class=\"CharacterInitiative\" id=\""
		if(this.id == actchar.id){
			tmpstr += "active"
		}else{
			tmpstr += this.id
		}
		tmpstr +=			"\"><tbody>";
		tmpstr +=		"<tr>";
		tmpstr +=			"<th onclick=\"changeActive(" + this.id + ")\">";
		tmpstr +=				"(" + this.Owner + ") " + this.Name + "";
		tmpstr +=			"</th>";
		tmpstr +=			"<td class=\"Initiative\" onclick=\"setInitiative(" + this.id + ")\">";
		tmpstr +=				this.ConMon.Initiative + "";
		tmpstr +=			"</td>";
		tmpstr +=		"</tr>";
		tmpstr +=		"<tr onclick=\"changeActive(" + this.id + ")\">";
		tmpstr +=			"<td>";
		tmpstr +=				"P:" + this.ConMon.Physical + "/" + this.ConMon.Physical_Max;
		tmpstr +=						" (" + this.ConMon.Overflow + "/" + this.ConMon.Overflow_Max + ")";
		tmpstr +=						"S:" + this.ConMon.Stun + "/" + this.ConMon.Stun_Max;
		tmpstr +=			"</td>";
		tmpstr +=			"<td>";
		tmpstr +=				"<button type=\"button\" onclick=\"removeCharacter(" + this.id + ")\">X</button>";
		tmpstr +=			"</td>";
		tmpstr +=		"</tr>";
		tmpstr +=	"</tbody></table>";
		listelem.innerHTML += tmpstr;
		return;
	}//end Character::drawInitiativeBox()

	/**
	 * @function draw()
	 *		Renders Character in Active Character Sheet
	 *		Each component of the Character Sheet is rendered with its own function
	 *
	 */
	this.draw			= function() {
		toggleEditButtons(false);
		this.drawTitle();
		this.ConMon.draw();
		this.Attributes.draw();
		this.Cyberdeck.draw();
		this.Limits.draw();
		this.drawSkills();
		this.drawSkillGroups();
		this.drawGear();
		this.drawArmor();
		this.drawWeapons();
		this.drawAugmentations();
		this.drawQualities();
		this.drawPowers();
		this.drawSpells();
		redrawActionList();
		return;
	}//end Character::draw()

	/**
	 * @function drawTitle()
	 * 
	 */
	this.drawTitle		= function() {
		document.getElementById("Name").innerHTML = this.Name;
		document.getElementById("Player").innerHTML = this.Owner;
		document.getElementById("Metatype").innerHTML = this.Metatype;
		return;
	}//end Character::drawTitle()

	/**
	 * @function drawSkills()
	 * 
	 */
	this.drawSkills		= function() {
		var elem = document.getElementById("SkillList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Skills.length; i++) {
			if((this.Skills[i].rating + this.Skills[i].ratingmod) == 0 && !this.Skills[i].default) continue;
			elem.innerHTML += this.Skills[i].draw();
		}
		return;
	}//end Character::drawSkills()

	/**
	 * @function drawSkillGroups()
	 * 
	 */
	this.drawSkillGroups = function() {
		var elem = document.getElementById("SkillGroupList");
		elem.innerHTML = "";
		for (var i = 0; i < this.SkillGroups.length; i++) {
			if ((this.SkillGroups[i].rating + this.SkillGroups[i].ratingmod) == 0) continue;
			elem.innerHTML += this.SkillGroups[i].draw();
		}
		return;
	}//end Character::drawSkillGroups

	/**
	 * @function drawGear()
	 * 
	 */
	this.drawGear	= function() {
		var elem = document.getElementById("GearList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Gear.length; i++) {
			elem.innerHTML += this.Gear[i].draw(i);
		}
		return;
	}//end Character::drawGear()

	/**
	 * @function drawArmor()
	 * 
	 */
	this.drawArmor	= function() {
		var elem = document.getElementById("ArmorList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Armor.length; i++) {
			elem.innerHTML += this.Armor[i].draw(i);
		}
		return;
	}//end Character::drawArmor()

	/**
	 * @function drawWeapons()
	 * 
	 */
	this.drawWeapons	= function() {
		var elem = document.getElementById("WeaponsList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Weapons.length; i++) {
			elem.innerHTML += this.Weapons[i].draw(i);
		}
		return;
	}//end Character::drawWeapons()

	/**
	 * @function drawAugmentations()
	 * 
	 */
	this.drawAugmentations			= function() {
		var elem = document.getElementById("AugmentationsList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Augmentations.length; i++) {
			elem.innerHTML += this.Augmentations[i].draw(i);
		}
		return;
	}//end Character::drawAugmentations()

	/**
	 * @function drawQualities()
	 * 
	 */
	this.drawQualities			= function() {
		var elem = document.getElementById("QualitiesList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Qualities.length; i++) {
			elem.innerHTML += this.Qualities[i].draw(i);
		}
		return;
	}//end Character::drawQualities()
	
	/**
	 * @function drawPowers()
	 * 
	 */
	this.drawPowers			= function() {
		var elem = document.getElementById("PowersList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Powers.length; i++) {
			elem.innerHTML += this.Powers[i].draw(i);
		}
		return;
	}//end Character::drawPowers()

	/**
	 * @function drawSpells()
	 * 
	 */
	this.drawSpells			= function() {
		var elem = document.getElementById("SpellsComplexFormsList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Spells.length; i++) {
			elem.innerHTML += this.Spells[i].draw(i);
		}
		return;
	}//end Character::drawSpells()

	/**
	 * @function drawEdit()
	 *		Renders Character in Active Character Sheet for editing
	 *		Each component of the Character Sheet is rendered with its own function
	 * 
	 */
	this.drawEdit			= function() {
		toggleEditButtons(true);
		this.drawEditTitle();
		this.ConMon.draw();
		this.Attributes.drawEdit();
		this.Cyberdeck.drawEdit();
		//If none of the objects exist yet, then Create a new slot
		if (this.Armor.length			== 0)	this.addArmor();
		if (this.Augmentations.length	== 0)	this.addAugmentation();
		if (this.Gear.length			== 0)	this.addGear();
		if (this.Powers.length			== 0)	this.addPower();
		if (this.Qualities.length		== 0)	this.addQuality();
		if (this.SkillGroups.length		== 0)	this.addSkillGroup();
		if (this.Skills.length			== 0)	this.addSkill();
		if (this.Spells.length			== 0)	this.addSpell();
		if (this.Weapons.length			== 0)	this.addWeapon();
		this.drawEditSkills();
		this.drawEditSkillGroups();
		this.drawEditGear();
		this.drawEditArmor();
		this.drawEditWeapons();
		this.drawEditAugmentations();
		this.drawEditQualities();
		this.drawEditPowers();
		this.drawEditSpells();
		return;
	}//end Character::drawEdit()

	/**
	 * @function drawEditTitle()
	 * 
	 */
	this.drawEditTitle		= function() {
		document.getElementById("Name").innerHTML = "<input type=\"text\" id=\"EditName\" value=\"" + this.Name + "\">";
		document.getElementById("Player").innerHTML = "<input type=\"text\" id=\"EditOwner\" value=\"" + this.Owner + "\">";
		document.getElementById("Metatype").innerHTML = "<input type=\"text\" id=\"EditMetatype\" value=\"" + this.Metatype + "\">";
		document.getElementById("SpecialEditType").value = this.Special;
		return;
	}//end Character::drawEditTitle()

	/**
	 * @function drawEditSkills()
	 * 
	 */
	this.drawEditSkills		= function() {
		var elem = document.getElementById("SkillList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Skills.length; i++) {
			elem.innerHTML += this.Skills[i].drawEdit(i);
		}
		return;
	}//end Character::drawEditSkills()

	/**
	 * @function drawEditSkillGroups()
	 * 
	 */
	this.drawEditSkillGroups = function() {
		var elem = document.getElementById("SkillGroupList");
		elem.innerHTML = "";
		for (var i = 0; i < this.SkillGroups.length; i++) {
			elem.innerHTML += this.SkillGroups[i].drawEdit(i);
		}
		return;
	}//end Character::drawEditSkillGroups

	/**
	 * @function drawEditGear()
	 * 
	 */
	this.drawEditGear	= function() {
		var elem = document.getElementById("GearList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Gear.length; i++) {
			elem.innerHTML += this.Gear[i].drawEdit(i);
		}
		return;
	}//end Character::drawEditGear()

	/**
	 * @function drawEditArmor()
	 * 
	 */
	this.drawEditArmor	= function() {
		var elem = document.getElementById("ArmorList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Armor.length; i++) {
			elem.innerHTML += this.Armor[i].drawEdit(i);
		}
		return;
	}//end Character::drawEditArmor()

	/**
	 * @function drawEditWeapons()
	 * 
	 */
	this.drawEditWeapons	= function() {
		var elem = document.getElementById("WeaponsList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Weapons.length; i++) {
			elem.innerHTML += this.Weapons[i].drawEdit(i);
		}
		return;
	}//end Character::drawEditWeapons()

	/**
	 * @function drawEditAugmentations()
	 * 
	 */
	this.drawEditAugmentations			= function() {
		var elem = document.getElementById("AugmentationsList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Augmentations.length; i++) {
			elem.innerHTML += this.Augmentations[i].drawEdit(i);
		}
		return;
	}//end Character::drawEditAugmentations()

	/**
	 * @function drawEditQualities()
	 * 
	 */
	this.drawEditQualities	= function() {
		var elem = document.getElementById("QualitiesList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Qualities.length; i++) {
			elem.innerHTML += this.Qualities[i].drawEdit(i);
		}
		return;
	}//end Character::drawEditQualities()

	/**
	 * @function drawEditPowers()
	 * 
	 */
	this.drawEditPowers	= function() {
		var elem = document.getElementById("PowersList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Powers.length; i++) {
			elem.innerHTML += this.Powers[i].drawEdit(i);
		}
		return;
	}//end Character::drawEditPowers()

	/**
	 * @function drawEditSpells()
	 * 
	 */
	this.drawEditSpells			= function() {
		var elem = document.getElementById("SpellsComplexFormsList");
		elem.innerHTML = "";
		for (var i = 0; i < this.Spells.length; i++) {
			elem.innerHTML += this.Spells[i].drawEdit(i);
		}
		return;
	}//end Character::drawEditSpells()

	/**
	 * @function addArmor()
	 *		Draws a new Armor in the list of Armor for editing
	 * 
	 */
	this.addArmor		= function(){
		this.updateArmorFromEdit();
		this.Armor.push(new Armor(this.id));
		this.drawEditArmor();
		return;
	}//end Character::addArmor()
	
	/**
	 * @function addWeapon()
	 *		Draws a new Weapon in the list of Weapon for editing
	 * 
	 */
	this.addWeapon		= function(){
		this.updateWeaponFromEdit();
		this.Weapons.push(new Weapon(this.id));
		this.drawEditWeapons();
		return;
	}//end Character::addWeapon()
	
	/**
	 * @function addSpell()
	 *		Draws a new Spell in the list of Spell for editing
	 * 
	 */
	this.addSpell		= function(){
		this.updateSpellFromEdit();
		this.Spells.push(new Spell(this.id));
		this.drawEditSpells();
		return;
	}//end Character::addSpell()

	/**
	 * @function addSkill()
	 *		Draws a new Skill in the list of Skill for editing
	 * 
	 */
	this.addSkill		= function(){
		this.updateSkillFromEdit();
		this.Skills.push(new Skill(this.id));
		this.drawEditSkills();
		return;
	}//end Character::addSkill()

	/**
	 * @function addSkillGroup()
	 *		Draws a new SkillGroup in the list of SkillGroup for editing
	 * 
	 */
	this.addSkillGroup	= function(){
		this.updateSkillGroupFromEdit();
		this.SkillGroups.push(new SkillGroup(this.id));
		this.drawEditSkillGroups();
		return;
	}//end Character::addSkillGroup()

	/**
	 * @function addGear()
	 *		Draws a new Gear in the list of Gear for editing
	 * 
	 */
	this.addGear		= function(){
		this.updateGearFromEdit();
		this.Gear.push(new Gear(this.id));
		this.drawEditGear();
		return;
	}//end Character::addGear()
	
	/**
	 * @function addAugmentation()
	 *		Draws a new Augmentation in the list of Augmentation for editing
	 * 
	 */
	this.addAugmentation= function(){
		this.updateAugmentationFromEdit();
		this.Augmentations.push(new Augmentation(this.id));
		this.drawEditAugmentations();
		return;
	}//end Character::addAugmentation()
	
	/**
	 * @function addQuality()
	 *		Draws a new Quality in the list of Quality for editing
	 * 
	 */
	this.addQuality		= function(){
		this.updateQualityFromEdit();
		this.Qualities.push(new Quality(this.id));
		this.drawEditQualities();
		return;
	}//end Character::addQuality()
	
	/**
	 * @function addPower()
	 *		Draws a new Power in the list of Power for editing
	 * 
	 */
	this.addPower		= function(){
		this.updatePowerFromEdit();
		this.Powers.push(new Power(this.id));
		this.drawEditPowers();
		return;
	}//end Character::addPower()

	/**
	 * @function updateFromEdit()
	 *		Update Character from Editing format of Active Character Sheet 
	 *		Each object has its own function for updating.
	 *		Arrays are trimmed of empty data sets based on name (name == "")
	 *		Updates function as replacements of existing data.
	 *
	 */
	this.updateFromEdit	= function(){
		this.updateBaseFromEdit();
		this.updateArmorFromEdit();
		this.updateAttributesFromEdit();
		this.updateAugmentationFromEdit();
		this.updateCyberdeckFromEdit();
		this.updateGearFromEdit();
		this.updatePowerFromEdit();
		this.updateQualityFromEdit();
		this.updateSkillFromEdit();
		this.updateSkillGroupFromEdit();
		this.updateSpellFromEdit();
		this.updateWeaponFromEdit();
		this.trimArmor();
		this.trimAugmentation();
		this.trimGear();
		this.trimPower();
		this.trimQuality();
		this.trimSkill();
		this.trimSkillGroup();
		this.trimSpell();
		this.trimWeapon();
		this.update();
		return;
	}//end Character::updateFromEdit()

	/**
	 * @function updateBaseFromEdit()
	 */
	this.updateBaseFromEdit			= function(){
		this.Name		=	document.getElementById("EditName").value;
		this.Owner		=	document.getElementById("EditOwner").value;
		this.Metatype	=	document.getElementById("EditMetatype").value;
		this.Special	=	document.getElementById("SpecialEditType").value;
		return;
	}//end Character::updateBaseFromEdit()

	/**
	 * @function updateAttributesFromEdit()
	 *
	 */
	this.updateAttributesFromEdit	= function(){
		this.Attributes.updateFromEdit();
		return;
	}//end Character::updateAttributesFromEdit()
	
	/**
	 * @function updateCyberdeckFromEdit()
	 *
	 */
	this.updateCyberdeckFromEdit	= function(){
		this.Cyberdeck.updateFromEdit();
		return;
	}//end Character::updateCyberdeckFromEdit()
	
	/**
	 * @function updateArmorFromEdit()
	 *
	 */
	this.updateArmorFromEdit		= function(){
		for (var i = 0; i < this.Armor.length; i++) {
			this.Armor[i].updateFromEdit(i);
		}
		return;
	}//end Character::updateArmorFromEdit()
	
	/**
	 * @function updateWeaponFromEdit()
	 *
	 */
	this.updateWeaponFromEdit		= function(){
		for (var i = 0; i < this.Weapons.length; i++) {
			this.Weapons[i].updateFromEdit(i);
		}
		return;
	}//end Character::updateWeaponFromEdit()
	
	/**
	 * @function updateSpellFromEdit()
	 *
	 */
	this.updateSpellFromEdit		= function(){
		for (var i = 0; i < this.Spells.length; i++) {
			this.Spells[i].updateFromEdit(i);
		}
		return;
	}//end Character::updateSpellFromEdit()
	
	/**
	 * @function updateSkillFromEdit()
	 *
	 */
	this.updateSkillFromEdit		= function(){
		for (var i = 0; i < this.Skills.length; i++) {
			this.Skills[i].updateFromEdit(i);
		}
		return;
	}//end Character::updateSkillFromEdit()
	
	/**
	 * @function updateSkillGroupFromEdit()
	 *
	 */
	this.updateSkillGroupFromEdit	= function(){
		for (var i = 0; i < this.SkillGroups.length; i++) {
			this.SkillGroups[i].updateFromEdit(i);
		}
		return;
	}//end Character::updateSkillGroupFromEdit()
	
	/**
	 * @function updateGearFromEdit()
	 *
	 */
	this.updateGearFromEdit			= function(){
		for (var i = 0; i < this.Gear.length; i++) {
			this.Gear[i].updateFromEdit(i);
		}
		return;
	}//end Character::updateGearFromEdit()
	
	/**
	 * @function updateAugmentationFromEdit()
	 *
	 */
	this.updateAugmentationFromEdit	= function(){
		for (var i = 0; i < this.Augmentations.length; i++) {
			this.Augmentations[i].updateFromEdit(i);
		}
		return;
	}//end Character::updateAugmentationFromEdit()
	
	/**
	 * @function updateQualityFromEdit()
	 *
	 */
	this.updateQualityFromEdit		= function(){
		for (var i = 0; i < this.Qualities.length; i++) {
			this.Qualities[i].updateFromEdit(i);
		}
		return;
	}//end Character::updateQualityFromEdit()
	
	/**
	 * @function updatePowerFromEdit()
	 *
	 */
	this.updatePowerFromEdit		= function(){
		for (var i = 0; i < this.Powers.length; i++) {
			this.Powers[i].updateFromEdit(i);
		}
		return;
	}//end Character::updatePowerFromEdit()

	/**
	 * @function trimArmor()
	 *
	 */
	this.trimArmor		= function(){
		for (var i = 0; i < this.Armor.length; i++) {
			while (this.Armor[i] !== undefined && this.Armor[i].name == ""){
				this.Armor.splice(i,1);
			}
		}
		return;
	}//end Character::trimArmor()
	
	/**
	 * @function trimWeapon()
	 *
	 */
	this.trimWeapon		= function(){
		for (var i = 0; i < this.Weapons.length; i++) {
			while (this.Weapons[i] !== undefined && this.Weapons[i].name == ""){
				this.Weapons.splice(i,1);
			}
		}
		return;
	}//end Character::trimWeapon()
	
	/**
	 * @function trimSpell()
	 *
	 */
	this.trimSpell		= function(){
		for (var i = 0; i < this.Spells.length; i++) {
			while (this.Spells[i] !== undefined && this.Spells[i].name == ""){
				this.Spells.splice(i,1);
			}
		}
		return;
	}//end Character::trimSpell()
	
	/**
	 * @function trimSkill()
	 *
	 */
	this.trimSkill		= function(){
		for (var i = 0; i < this.Skills.length; i++) {
			while (this.Skills[i] !== undefined && this.Skills[i].name == ""){
				this.Skills.splice(i,1);
			}
		}
		return;
	}//end Character::trimSkill()
	
	/**
	 * @function trimSkillGroup()
	 *
	 */
	this.trimSkillGroup	= function(){
		for (var i = 0; i < this.SkillGroups.length; i++) {
			while (this.SkillGroups[i] !== undefined && this.SkillGroups[i].name == ""){
				this.SkillGroups.splice(i,1);
			}
		}
		return;
	}//end Character::trimSkillGroup()
	
	/**
	 * @function trimGear()
	 *
	 */
	this.trimGear		= function(){
		for (var i = 0; i < this.Gear.length; i++) {
			while (this.Gear[i] !== undefined && this.Gear[i].name == ""){
				this.Gear.splice(i,1);
			}
		}
		return;
	}//end Character::trimGear()
	
	/**
	 * @function trimAugmentation()
	 *
	 */
	this.trimAugmentation= function(){
		for (var i = 0; i < this.Augmentations.length; i++) {
			while (this.Augmentations[i] !== undefined && this.Augmentations[i].name == ""){
				this.Augmentations.splice(i,1);
			}
		}
		return;
	}//end Character::trimAugmentation()
	
	/**
	 * @function trimQuality()
	 *
	 */
	this.trimQuality	= function(){
		for (var i = 0; i < this.Qualities.length; i++) {
			while (this.Qualities[i] !== undefined && this.Qualities[i].name == ""){
				this.Qualities.splice(i,1);
			}
		}
		return;
	}//end Character::trimQuality()
	
	/**
	 * @function trimPower()
	 *
	 */
	this.trimPower		= function(){
		for (var i = 0; i < this.Powers.length; i++) {
			while (this.Powers[i] !== undefined && this.Powers[i].name == ""){
				this.Powers.splice(i,1);
			}
		}
		return;
	}//end Character::trimPower()
	
	/**
	 * @function update()
	 * Recalculates character stats.
	 *
	 * @TODO Rename function to recalc
	 *
	 */
	this.update			= function() {
		this.ConMon.recalc_Max(this.Attributes);
		this.Limits.recalc(this.Attributes);
		this.Player = (this.Owner != "GM");
		return;
	}//end Character::update()

	/**
	 * @function updateId()
	 *		Applies new Id to character and all of characters groups
	 *		Useful when loading characters and sessions
	 *
	 * @param {integer} intNewId
	 *		New ID of Character
	 */
	this.updateId		= function(intNewId){
		this.id = intNewId;
		this.ConMon.ownerid = this.id;
		this.Attributes.ownerid = this.id;
		this.Cyberdeck.id		= this.id;
		for (var i = 0; i < this.Armor.length; i++) {
			this.Armor[i].id = this.id;
		}
		for (var i = 0; i < this.Augmentations.length; i++) {
			this.Augmentations[i].id = this.id;
		}
		for (var i = 0; i < this.Gear.length; i++) {
			this.Gear[i].id = this.id;
		}
		for (var i = 0; i < this.Powers.length; i++) {
			this.Powers[i].id = this.id;
		}
		for (var i = 0; i < this.Qualities.length; i++) {
			this.Qualities[i].id = this.id;
		}
		for (var i = 0; i < this.SkillGroups.length; i++) {
			this.SkillGroups[i].id = this.id;
		}
		for (var i = 0; i < this.Skills.length; i++) {
			this.Skills[i].id = this.id;
		}
		for (var i = 0; i < this.Spells.length; i++) {
			this.Spells[i].id = this.id;
		}
		for (var i = 0; i < this.Weapons.length; i++) {
			this.Weapons[i].id = this.id;
		}
		return;
	}//end Character::updateId()

	/**
	 * @function save()
	 *		Saves Character to a designated file in JSON format.
	 *		Requires NodeJs
	 * 
	 * @param {string} strfile
	 *		Path to file to save character to.
	 *
	 * @return
	 *		Window Alert of success or fail
	 */
	this.save			= function(strfile) {
		var fs = require('fs');
		fs.writeFile(strfile, this.getJSON(), function(err) {
			if(err) {
				return window.alert("Err Saving File\n" + err);
			}
			return window.alert("Character Saved");
		}); 
		return;
	}//end Character::save()

	/**
	 * @function load()
	 *		Loads Character from a designated file in JSON format.
	 *		Requires NodeJs
	 * 
	 * @param {string} strfile
	 *		Path to file to load character from.
	 *
	 * @return
	 *		Window Alert of success or fail
	 */
	this.load			= function(strfile) {
		var fs = require('fs');
		fs.readFile(strfile, 'utf8', function(err, data){
			if (err) {
				return window.alert("Err Opening File\n" + err);
			}
			var tmpchar = jQuery.parseJSON(data);
			chars[chars.length-1].replace(tmpchar);
			return window.alert("Character Loaded");
		});
		return;
	}//end Character::load()

	/**
	 * @function getJSON()
	 *		Converts Character to JSON formatted string
	 *
	 * @return {string}
	 *		JSON formatted string with \t indentation
	 */
	this.getJSON		= function(){ //TODO
		return JSON.stringify(this,null,"\t");
	}//end Character::getJSON()

	/**
	 * @function getSkillIndex()
	 *		Searches the Skills array for the requested skill
	 * 
	 * @param {string} strval
	 *		String name of skill to find
	 *
	 * @return {integer}
	 *		returns the index of the requested skill
	 *		returns 0 if not found.
	 */
	this.getSkillIndex				= function(strval){
		i = (i !== undefined) ? i : 0;
		for (var i = this.Skills.length - 1; i >= 0; i--) {
			if (this.Skills[i].name.toLowerCase() == strval.toLowerCase()){
				return i;
			}
		}
		return 0;
	}//end Character::getSkillIndex()

	/**
	 * @function getSkillGroupIndex()
	 *		Recursively searches the SkillGroups array for the requested skillgroup
	 * 
	 * @param {string} strval
	 *		String name of skillgroup to find
	 * @param {integer} i
	 *		index of SkillGroup to check.
	 *
	 * @return {integer}
	 *		returns the index of the requested skillgroup
	 *		returns last entries index if not found.
	 */
	this.getSkillGroupIndex			= function(strval, i){
		i = (i !== undefined) ? i : 0;
		if (this.SkillGroups.length == i) return i-1;
		return (this.SkillGroups[i].name.toLowerCase() == strval.toLowerCase()) ? i : this.getSkillGroupIndex(strval, i + 1);
	}//end Character::getSkillGroupIndex()

	/**
	 * @function getSkillGroupIndexbySkill()
	 *		Recursively searches the SkillGroups array for the requested skillgroup based on skills in the skillgroup
	 * 
	 * @param {string} strval
	 *		String skill in skillgroup to find
	 * @param {integer} i
	 *		index of SkillGroup to check.
	 *
	 * @return {integer}
	 *		returns the index of the requested skillgroup
	 *		returns last entries index if not found.
	 */
	this.getSkillGroupIndexbySkill	= function(strval, i){
		i = (i !== undefined) ? i : 0;
		if (this.SkillGroups.length == i) return i-1;
		return (this.SkillGroups[i].contains(strval)) ? i : this.getSkillGroupIndexbySkill(strval, i + 1);
	}//end Character::getSkillGroupIndexbySkill()

	/**
	 * @function getSkill()
	 *		Returns the Skill requested
	 *
	 * @param {string} strval
	 *		name of skill to return
	 *
	 * @return {Skill}
	 *		Skill from Array Skills
	 *		Returns new Skill if not found
	 */
	this.getSkill	= function(strval){
		var index = this.getSkillIndex(strval);
		if (this.Skills.length > 0 && this.Skills[index].name == strval) {
			return this.Skills[index];
		}
		return new Skill();
	}//end Character::getSkill()

	/**
	 * @function getSkillRating()
	 *		Returns the Skill rating of the requested skill
	 *
	 * @param {string} strval
	 *		name of skill
	 *
	 * @return {Skill}
	 *		Skill rating from Array Skills
	 *		Returns 0 if not found
	 */
	this.getSkillRating	= function(strval){
		var skillindex = this.getSkillIndex(strval);
		var groupindex = this.getSkillIndex(strval);
		if (skillindex < this.Skills.length && this.Skills[skillindex].name == strval){
			return this.Skills[skillindex].rating;
		}else if (this.SkillGroups[groupindex] !== undefined && this.SkillGroups[groupindex].contains(strval)) {
			return this.SkillGroups[groupindex].rating;
		}
		return 0;
	}//end Character::getSkillRating()

	/**
	 * @function getSkillMod()
	 *		Returns the Skill rating modifier of the requested skill
	 *
	 * @param {string} strval
	 *		name of skill
	 *
	 * @return {Skill}
	 *		Skill rating modifier from Array Skills
	 *		Returns 0 if not found
	 */
	this.getSkillMod	= function(strval){
		var skillindex = this.getSkillIndex(strval);
		var groupindex = this.getSkillGroupIndexbySkill(strval);
		if (skillindex < this.Skills.length && this.Skills[skillindex].name == strval){
			return this.Skills[skillindex].ratingmod;
		}else if (this.SkillGroups[groupindex] !== undefined && this.SkillGroups[groupindex].contains(strval)) {
			return this.SkillGroups[groupindex].ratingmod;
		}
		return 0;
	}//end Character::getSkillMod()

	/**
	 * @function setSkillRating()
	 *		Sets the Rating of the indicated skill in the Skills array
	 * 
	 * @param {string} strval
	 *		Name of skill to modify
	 * @param {integer} intval
	 *		New Rating for Skill
	 */
	this.setSkillRating	= function(strval, intval){
		var index = this.getSkillIndex(strval);
		if (index < this.Skills.length && this.Skills[index].name == strval){
			this.Skills[index].rating = intval;
		}else if (skillsdb[strval] !== undefined) {
			this.Skills.push(new Skill(this.id));
			this.Skills[this.Skills.length - 1].replace(skillsdb[strval]);
		}else{
			this.Skills.push(new Skill(this.id, strval, true));
			this.Skills[this.Skills.length - 1].ratingmod = intval;
		}
		return;
	}//end Character::setSkillRating()

	/**
	 * @function setSkillGroupRating()
	 *		Sets the Rating of the indicated skill group in the SkillGroups array
	 * 
	 * @param {string} strval
	 *		Name of skill group to modify
	 * @param {integer} intval
	 *		New Rating for skill group
	 */
	this.setSkillGroupRating = function(strval, intval){
		var index = this.getSkillGroupIndex(strval);
		if (index < this.SkillGroups.length && this.SkillGroups[index].name == strval){
			this.SkillGroups[index].rating = intval;
		}else if (skillgroupsdb[strval] !== undefined) {
			this.SkillGroups.push(new SkillGroup(this.id));
			this.SkillGroups[this.SkillGroups.length - 1].replace(skillgroupsdb[strval]);
		}else{
			this.SkillGroups.push(new SkillGroup(this.id, strval));
			this.SkillGroups[this.SkillGroups.length - 1].ratingmod = intval;
		}
		return;
	}//end Character::setSkillGroupRating()

	/**
	 * @function setSkillMod()
	 *		Sets the Rating Modifier of the indicated skill in the Skills array
	 * 
	 * @param {string} strval
	 *		Name of skill to modify
	 * @param {integer} intval
	 *		New Rating Modifier for Skill
	 */
	this.setSkillMod	= function(strval, intval){
		var index = this.getSkillIndex(strval);
		if (index < this.Skills.length && this.Skills[index].name == strval){
			this.Skills[index].ratingmod = intval;
		}else if (skillsdb[strval] !== undefined) {
			this.Skills.push(new Skill(this.id));
			this.Skills[this.Skills.length - 1].replace(skillsdb[strval]);
		}else{
			this.Skills.push(new Skill(this.id, strval, true));
			this.Skills[this.Skills.length - 1].ratingmod = intval;
		}
		return;
	}//end Character::setSkillMod()

	/**
	 * @function setSkillGroupMod()
	 *		Sets the Rating Modifier of the indicated skill group in the SkillGroups array
	 * 
	 * @param {string} strval
	 *		Name of skill group to modify
	 * @param {integer} intval
	 *		New Rating Modifier for skill group
	 */
	this.setSkillGroupMod = function(strval, intval){
		var index = this.getSkillGroupIndex(strval);
		if (index < this.SkillGroups.length && this.SkillGroups[index].name == strval){
			this.SkillGroups[index].ratingmod = intval;
		}else if (skillgroupsdb[strval] !== undefined) {
			this.SkillGroups.push(new SkillGroup(this.id));
			this.SkillGroups[this.SkillGroups.length - 1].replace(skillgroupsdb[strval]);
		}else{
			this.SkillGroups.push(new SkillGroup(this.id, strval));
			this.SkillGroups[this.SkillGroups.length - 1].ratingmod = intval;
		}
		return;
	}//end Character::setSkillGroupMod()

	/**
	 * @function rollInitiative()
	 *		Uses values calculated by Condition Monitor to roll a New Initiative Value
	 * 		Initiative is set in Condition Monitor
	 */
	this.rollInitiative  = function(){
		var dice = new DicePool();
		this.ConMon.Initiative = this.ConMon.InitiativeBase + this.ConMon.InitiativeMod;
		dice.size = this.ConMon.InitiativeDice + this.ConMon.InitiativeDiceMod;
		dice.rollpool();
		this.ConMon.Initiative += dice.sum;
		console.log("Base Initiative:" + this.ConMon.InitiativeBase);
		dice.logresults();
		return;
 	}//end Character::rollInitiative()

	/**
	 * @function getActionPool()
	 *		Based on the given Action, evaluates the dicepool needed to roll Action
	 *		Does not determine if single roll or extended.
	 * 
	 * @param {Action} objAction
	 *		Action used to evaluate dicepool
	 *
	 * @return {DicePool}
	 *		Evaluated Dicepool that is ready to roll action
	 */
 	this.getActionPool	= function(objAction){
 		var dice = new DicePool();
 		//Get Attributes
 		if (objAction.attributes !== undefined) {
	 		for (var i = objAction.attributes.length - 1; i >= 0; i--) {
	 			var tmp = this.Attributes.getattribute(objAction.attributes[i]);
	 			if (tmp == 0) tmp = this.Cyberdeck.getAttribute(objAction.attributes[i]);
	 			dice.size += tmp;
	 		}
	 	}
	 	//Get Skills
 		if (objAction.skills !== undefined) {
 			var tmp = 0;
	 		for (var i = objAction.skills.length - 1; i >= 0; i--) {
	 			tmp += this.getSkillRating(objAction.skills[i]);
	 		}
	 		if (tmp != 0) {
	 			dice.size += tmp;
	 		}else{
	 			for (var i = 0; i < objAction.skills.length; i++) {
	 				dice.size = (skillsdb[objAction.skills[i]] !== undefined && skillsdb[objAction.skills[i]].default) ? dice.size - 1 : 0;
	 			}
	 		}
	 	}
	 	//Get Fixed Size
	 	if (objAction.has_fixed) {
	 		dice.size = objAction.size;
	 	}
	 	//Get Limit
	 	if (objAction.has_limit_fixed) {
	 		dice.limit = objAction.limit_fixed;
		}else if (objAction.has_limit) {
			dice.limit = this.Limits.getLimit(objAction.limit);
	 		if (dice.limit == 0) dice.limit = this.Cyberdeck.getAttribute(objAction.limit);
		}else {
			dice.limit = 0;
		}
		//Get Threshold
		if (objAction.has_threshold) {
			dice.threshold = objAction.threshold;
		}else {
			dice.threshold = 0;
		}
 		return dice;
 	}//end Character::getActionPool()
}//end Character
