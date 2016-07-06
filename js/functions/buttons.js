/**
 * @file
 *		These functions are directly tied to buttons at the top and bottom of the GUI
 *
 * @function NewCharacter()
 * @function editCharacter()
 * @function updateCharacter()
 * @function saveCharacter()
 * @function loadCharacter()
 * @function saveSession()
 * @function loadSession()
 * @function startInitiative()
 * @function nextInitiativePass()
 * @function manualRoll()
 * @function resetManualRoll()
 */
 
/**
 * @function NewCharacter()
 *		Adds a New Character and renders them for immediate editing
 *		Redraws GUI to accomodate new Character
 *
 */
function NewCharacter()
{
	//Cover in case Active Character is in Edit Mode
	actchar.drawEdit();
	actchar.updateFromEdit();
	actchar.draw();
	
	//Create new Character
	chars.push(new Character(chars.length));
	chars[chars.length - 1].ConMon.changeMode("physical");

	//Add new Character to list
	redrawInitiativeList();
	changeActive(chars.length - 1);
	editCharacter()
	console.log("Created New Character:" + (chars.length - 1));
	return;
}//end NewCharacter()

/**
 * @function editCharacter()
 *		Redraws active character for editing
 * 
 */
function editCharacter(){
	actchar.drawEdit();
	return;
}//end editCharacter()

/**
 * @function updateCharacter()
 *		Updates Active Character with edits and redraws GUI
 * 
 */
function updateCharacter(){
	actchar.updateFromEdit();
	actchar.draw();
	redrawInitiativeList();
	return;
}//end editCharacter()
 
/**
 * @function saveCharacter()
 *		Saves active character to File
 *		Uses existing File Prompt element
 *		If Prompt is cancelled, then the change function will be called twice, but only one instance will work.
 *			NOT A PROBLEM!
 *		Requires NodeJS
 *
 */
function saveCharacter(){
	//Trigger GetFile html element (Input File)
	document.getElementById("NewFile").click();
	//Wait for change in GetFile html element (Input File)
	$("#NewFile").change(function(result){
		$("#NewFile").unbind("change"); //unbind so this specific call is only made once
		//Get new file value
		var file = document.getElementById("NewFile").value;
		document.getElementById("NewFile").value = "";
		//save character
		if (file != "") {
			actchar.save(file);
		}
		//return from NewFile.change
		return;
	});
	//return from saveCharacter
	return;
}//end saveCharacter()

/**
 * @function loadCharacter()
 *		Loads active character from File
 *		Uses existing File Prompt element
 *		If Prompt is cancelled, then the change function will be called twice, but only one instance will work.
 *			NOT A PROBLEM!
 *		Requires NodeJS
 *
 */
function loadCharacter(){
	//Trigger GetFile html element (Input File)
	document.getElementById("GetFile").click();
	//Wait for change in GetFile html element (Input File)
	$("#GetFile").change(function(result){
		$("#GetFile").unbind("change"); //unbind so this specific call is only made once
		//Get new file value
		var file = document.getElementById("GetFile").value;
		document.getElementById("GetFile").value = "";
		//Create new character from file
		if (file != "") {
			chars.push(new Character(chars.length));
			chars[chars.length - 1].load(file);
		}
		//return from GetFile.change
		return;
	});
	//return from loadCharacter
	return;
}//end loadCharacter()

/**
 * @function saveSession()
 *		Saves current session to File
 *		Uses existing File Prompt element
 *		If Prompt is cancelled, then the change function will be called twice, but only one instance will work.
 *			NOT A PROBLEM!
 *		Session includes all characters
 *		Requires NodeJS
 *
 */
function saveSession(){
	document.getElementById("NewSessFile").click();
	$("#NewSessFile").change(function(result){
		$("#NewSessFile").unbind("change"); 
		var file = document.getElementById("NewSessFile").value;
		document.getElementById("NewSessFile").value = "";
		// Get Characters
		var strout = JSON.stringify(chars,null,"\t");
		// Save Characters
		var fs = require('fs');
		fs.writeFile(file, strout, function(err) {
			if(err) {
				return window.alert("Err Saving File\n" + err);
			}
			return window.alert("Session Saved");
		});
		//return from NewSessFile.change
		return;
	});
	//return from saveSession
	return;
}//end saveSession()

/**
 * @function loadSession()
 *		Loads session from File and adds to current session (Not Replace)
 *		Uses existing File Prompt element
 *		If Prompt is cancelled, then the change function will be called twice, but only one instance will work.
 *			NOT A PROBLEM!
 *		Session includes all characters
 *		Requires NodeJS
 *
 */
function loadSession(){
	document.getElementById("GetSessFile").click();
	$("#GetSessFile").change(function(result){
		$("#GetSessFile").unbind("change"); 
		var file = document.getElementById("GetSessFile").value;
		document.getElementById("GetSessFile").value = "";
		// Load Characters
		var fs = require('fs');
		fs.readFile(file, 'utf8', function(err, data){
			if (err) {
				return window.alert("Err Opening File\n" + err);
			}
			// Add Characters
			backuplog("Parsing JSON");
			backuplog(data);
			var tmpchars = jQuery.parseJSON(data);
			backuplog("Loaded " + tmpchars.length + " Characters");
			for (var i = 0; i < tmpchars.length; i++) {
				backuplog("Loading Character:" + tmpchars[i].name);
				chars.push(new Character(chars.length));
				chars[chars.length - 1].replace(tmpchars[i]);
			}
			return window.alert("Session Loaded");
		});
		//return from NewFile.change
		return;
	});
	//return from loadSession
	return;
}//end loadSession()

/**
 * @function startInitiative()
 *		Rolls initiative for each character
 *
 */
function startInitiative(){
	for (var i = 0; i < chars.length; i++) {
		chars[i].rollInitiative();
	}
	redrawInitiativeList();
	return;
}//end startInitiative()

/**
 * @function nextInitiativePass()
 *		Reduces each character initiative by 10
 *
 */
function nextInitiativePass(){
	for (var i = 0; i < chars.length; i++) {
		chars[i].ConMon.reduceInitiative(10);
	}
	redrawInitiativeList();
	return;
}//end nextInitiativePass()

/**
 * @function manualRoll()
 *		Rolls Manually specified Dice Pool and displays results
 *
 */
function manualRoll(){
	//Assemble Dice Pool
	var dice = new DicePool();
	dice.size = parseInt(document.getElementById("ManualDiceRollSize").value);
	dice.limit = parseInt(document.getElementById("ManualDiceRollLimit").value);
	dice.threshold = parseInt(document.getElementById("ManualDiceRollThreshold").value);
	if (document.getElementById("ManualDiceRollExtended").checked) {
		dice.rollextended();
	}else{
		dice.rollpool();
	}
	//Display Roll Results
	var elem = document.getElementById("ManualDiceRollResults");
	elem.innerHTML = "<strong>Results</strong>:";
	for (var i = 0; i < dice.results.length; i++) {
		if(dice.results[i] == -1){
			elem.innerHTML += "</br>";
			continue;
		}
		elem.innerHTML += "(" + dice.results[i] + ")";
	}
	if (!document.getElementById("ManualDiceRollExtended").checked) elem.innerHTML += "</br>";
	elem.innerHTML += "Hits(" + dice.hits + ")";
	elem.innerHTML += "Sum(" + dice.sum + ")";
	if(document.getElementById("ManualDiceRollExtended").checked) elem.innerHTML += "Rolls(" + dice.rolls + ")";
	elem.innerHTML += (dice.success) ? ":Success" : ":Fail";
	if(dice.glitch) elem.innerHTML += ":Glitch";
	if(dice.crit) elem.innerHTML += ":CriticalGlitch";
	return;
}//end manualRoll();

/**
 * @function resetManualRoll()
 *		Resets Entries for Manual Dice Pool
 *
 */
function resetManualRoll(){
	document.getElementById("ManualDiceRollSize").value = 1;
	document.getElementById("ManualDiceRollLimit").value = 0;
	document.getElementById("ManualDiceRollThreshold").value = 0;
	document.getElementById("ManualDiceRollExtended").checked = false;
	return;
}//end resetManualRoll()