/**
 * @file
 * The Cyberdeck class for use by the Character Class
 *
 */

/**
 * @class Cyberdeck()
 *		Handles Attributes associated with an active Cyberdeck.
 *
 * @param {integer} intOwnerId
 *		Id of owner of Cyberdeck. Useful in cross Class calculations
 * @param {integer} intDeviceRating
 *		Used to calculate the hit-boxes for the cyberdeck
 * @param {integer} intAttack
 *		Attack Attribute of Cyberdeck
 * @param {integer} intSleaze
 *		Sleaze Attribute of Cyberdeck
 * @param {integer} intDataProc
 *		Data Processing Attribute of Cyberdeck
 * @param {integer} intFirewall
 *		Firewall Attribute of Cyberdeck
 *
 * @var {integer} id
 *		Id of owner of Cyberdeck. Useful in cross Class calculations
 * @var {integer} rating
 *		Used to calculate the hit-boxes for the cyberdeck
 * @var {integer} attack
 *		Attack Attribute of Cyberdeck
 * @var {integer} sleaze
 *		Sleaze Attribute of Cyberdeck
 * @var {integer} dataproc
 *		Data Processing Attribute of Cyberdeck
 * @var {integer} firewall
 *		Firewall Attribute of Cyberdeck
 * @var {integer} damage
 *		Tracks how much damage cyberdeck has taken.
 *
 * @function replace()
 * @function draw()
 * @function drawDamage()
 * @function drawEdit()
 * @function updateFromEdit()
 * @function swapStats()
 * @function getAttribute()
 * @function setDamage()
 */
 function Cyberdeck(intOwnerId, intDeviceRating, intAttack, intSleaze, intDataProc, intFirewall)
{
	this.id			= (intOwnerId 		!== undefined) ? intOwnerId					: -1;
	this.rating		= (intDeviceRating 	!== undefined) ? parseInt(intDeviceRating)	: 0;
	this.attack		= (intAttack 		!== undefined) ? parseInt(intAttack)		: 0;
	this.sleaze		= (intSleaze 		!== undefined) ? parseInt(intSleaze)		: 0;
	this.dataproc	= (intDataProc 		!== undefined) ? parseInt(intDataProc)		: 0;
	this.firewall	= (intFirewall 		!== undefined) ? parseInt(intFirewall)		: 0;
	this.damage		= 0;

	//methods
	/**
	 * @function replace()
	 * Handles loading object with similar variables but no functions into
	 * Primary use is when loading character and session files
	 * 
	 * @param {object} objNew
	 * 		Object with similar variables to load
	 */
	this.replace	= function(objNew){
		this.rating		= (objNew.rating 	!== undefined) ? objNew.rating		: 0;
		this.attack		= (objNew.attack 	!== undefined) ? objNew.attack		: 0;
		this.sleaze		= (objNew.sleaze 	!== undefined) ? objNew.sleaze		: 0;
		this.dataproc	= (objNew.dataproc 	!== undefined) ? objNew.dataproc	: 0;
		this.firewall	= (objNew.firewall 	!== undefined) ? objNew.firewall	: 0;
		this.damage		= (objNew.damage 	!== undefined) ? objNew.damage		: 0;
		return;
	}//end Cyberdeck::replace()

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
	this.draw			= function(){
		document.getElementById("CyberdeckAttack").innerHTML = this.attack;
		document.getElementById("CyberdeckSleaze").innerHTML = this.sleaze;
		document.getElementById("CyberdeckDataProc").innerHTML = this.dataproc;
		document.getElementById("CyberdeckFirewall").innerHTML = this.firewall;
		this.drawDamage();
		return;
	}//end Cyberdeck::draw()

	/**
	 * @function drawDamage()
	 * Formats class into an html table to make object editable.
	 * 
	 * @param {integer} intId
	 * 		Identifier ensures each draw has a unique set of id's in DOM.
	 * 
	 * @return {string}
	 *		Html format of table to display class variables for editing.
	 */
	this.drawDamage		= function(){
		var elem = document.getElementById("CyberdeckDamage");
		elem.innerHTML = "";
		//draw Damage Boxes
		for (var i = 0; i < (8 + Math.floor(this.rating / 2)); i++) {
			if (this.damage > i){
				elem.innerHTML	+=	"<input type=\"checkbox\" onclick=\"actchar.Cyberdeck.setDamage(\'" + (i+1) + "\')\" checked>";
			}else {
				elem.innerHTML	+=	"<input type=\"checkbox\" onclick=\"actchar.Cyberdeck.setDamage(\'" + (i+1) + "\')\">";
			}
			if ((i+1)%3 == 0)	elem.innerHTML	+=	"<br>";
		}
		return;
	}//end Cyberdeck::drawDamage()

	/**
	 * @function drawEdit()
	 * Formats class into an html table to make object editable.
	 * 
	 */
	this.drawEdit		= function(){
		document.getElementById("CyberdeckAttack").innerHTML	= "<input type=\"number\" id=\"CyberdeckEditAttack\" value=\"" + this.attack + "\">";
		document.getElementById("CyberdeckSleaze").innerHTML	= "<input type=\"number\" id=\"CyberdeckEditSleaze\" value=\"" + this.sleaze + "\">";
		document.getElementById("CyberdeckDataProc").innerHTML	= "<input type=\"number\" id=\"CyberdeckEditDataProc\" value=\"" + this.dataproc + "\">";
		document.getElementById("CyberdeckFirewall").innerHTML	= "<input type=\"number\" id=\"CyberdeckEditFirewall\" value=\"" + this.firewall + "\">";
		document.getElementById("CyberdeckDamage").innerHTML	= "Device Rating:<input type=\"number\" id=\"CyberdeckEditDeviceRating\" value=\"" + this.rating + "\">";
		return;
	}//end Cyberdeck::drawEdit()

	/**
	 * @function updateFromEdit()
	 * Updates class variables from Editable Format of html table
	 * 
	 * @param {integer} intId
	 * 		Identifier for table to pull class variables from.
	 */
	this.updateFromEdit	= function(){
		this.attack		= parseInt(document.getElementById("CyberdeckEditAttack").value);
		this.attack		= (isNaN(this.attack)) ? 0 : this.attack;
		this.sleaze		= parseInt(document.getElementById("CyberdeckEditSleaze").value);
		this.sleaze		= (isNaN(this.sleaze)) ? 0 : this.sleaze;
		this.dataproc	= parseInt(document.getElementById("CyberdeckEditDataProc").value);
		this.dataproc	= (isNaN(this.dataproc)) ? 0 : this.dataproc;
		this.firewall	= parseInt(document.getElementById("CyberdeckEditFirewall").value);
		this.firewall	= (isNaN(this.firewall)) ? 0 : this.firewall;
		this.rating		= parseInt(document.getElementById("CyberdeckEditDeviceRating").value);
		this.rating		= (isNaN(this.rating)) ? 0 : this.rating;
		return;
	}//end Cyberdeck::updateFromEdit()

	/**
	 * @function swapStats()
	 * 		Swaps the value assigned to two of the stats in the cyberdeck.
	 *		Values to swap is determined by Elements with Names "CyberdeckSelect0" and "CyberdeckSelect1"
	 *		Redraws Table and Actions after swapping
	 *
	 */
	this.swapStats		= function(){
		//Get Radio Values
		var	strStat0	= "";
		var strStat1	= "";
		var radios		= document.getElementsByName("CyberdeckSelect0");
		for (var i = 0; i < radios.length; i++) {
			if(radios[i].checked){
				strStat0 = radios[i].value;
				break;
			}
		}
		var radios		= document.getElementsByName("CyberdeckSelect1");
		for (var i = 0; i < radios.length; i++) {
			if(radios[i].checked){
				strStat1 = radios[i].value;
				break;
			}
		}
		console.log("Swapping Stats " + strStat0 + " and " + strStat1);
		//Swap Stats
		var tmp	= 0;
			if (strStat0 == "attack"){
				tmp = this.attack;
				if (strStat1 == "sleaze") {
					this.attack = this.sleaze;
					this.sleaze = tmp;
				}
				if (strStat1 == "dataproc") {
					this.attack = this.dataproc;
					this.dataproc = tmp;
				}
				if (strStat1 == "firewall") {
					this.attack = this.firewall;
					this.firewall = tmp;
				}
			}
			if (strStat0 == "sleaze"){
				tmp = this.sleaze;
				if (strStat1 == "attack") {
					this.sleaze = this.attack;
					this.attack = tmp;
				}
				if (strStat1 == "dataproc") {
					this.sleaze = this.dataproc;
					this.dataproc = tmp;
				}
				if (strStat1 == "firewall") {
					this.sleaze = this.firewall;
					this.firewall = tmp;
				}
			}
			if (strStat0 == "dataproc"){
				tmp = this.dataproc;
				if (strStat1 == "attack") {
					this.dataproc = this.attack;
					this.attack = tmp;
				}
				if (strStat1 == "sleaze") {
					this.dataproc = this.sleaze;
					this.sleaze = tmp;
				}
				if (strStat1 == "firewall") {
					this.dataproc = this.firewall;
					this.firewall = tmp;
				}
			}
			if (strStat0 == "firewall"){
				tmp = this.firewall;
				if (strStat1 == "attack") {
					this.firewall = this.attack;
					this.attack = tmp;
				}
				if (strStat1 == "sleaze") {
					this.firewall = this.sleaze;
					this.sleaze = tmp;
				}
				if (strStat1 == "dataproc") {
					this.firewall = this.dataproc;
					this.dataproc = tmp;
				}
			}
		this.draw();
		redrawActionList();
		return;
	}//end Cyberdeck::swapStats()

	/**
	 * @function getAttribute()
	 *		Returns the value of the requested attribute
	 * 
	 * @param {string} strVal
	 *		string name of attribute to return
	 *
	 * @return {integer}
	 *		value of requested attribute
	 *		defaults to 0 if not found
	 */
	this.getAttribute	= function(strVal){
		if (strVal.toLowerCase() == "attack") return parseInt(this.attack);
		if (strVal.toLowerCase() == "sleaze") return parseInt(this.sleaze);
		if (strVal.toLowerCase() == "data processing") return parseInt(this.dataproc);
		if (strVal.toLowerCase() == "firewall") return parseInt(this.firewall);
		if (strVal.toLowerCase() == "device rating") return parseInt(this.rating);
		return 0;
	}//end Cyberdeck::getAttribute()

	/**
	 * @function setDamage()
	 *		Sets the damage value of the cyberdeck
	 *
	 * @param {integer} intNewVal
	 *		New value of Damage
	 *		If new value is the same as the current, then the current is reduced by 1.
	 */
	this.setDamage		= function(intNewVal){
		console.log("Changing Cyberdeck Damage to " + parseInt(intNewVal));
		if (parseInt(intNewVal) === undefined) return;
		if (this.damage == parseInt(intNewVal)) {
			this.damage -= 1;
		}else {
			this.damage = parseInt(intNewVal);
		}
		this.drawDamage();
		return;
	}//end Cyberdeck::setDamage()
}//end Cyberdeck