/**
 * @file
 *		Functions relating to how the Initiative List operates.
 *
 * @function redrawInitiativeList()
 * @function changeActive()
 * @function setInitiative()
 * @function removeCharacter()
 */
 
/**
 * @function redrawInitiativeList()
 *		Sorts the characters array by initiatve and draws them in the InitiativeList element.
 *		Initiative Sorting is based on the following criteria
 *			.ConMon.Initiative {integer}
 *			.Player {boolean}
 *			.Attributes.Reaction {integer}
 *			.Attributes.Intuition {integer}
 *			.Attributes.Edge {integer}
 *			(.ConMon.Physical_Max - .ConMon.Physical) + (.ConMon.Stun_Max - .ConMon.Stun) {integer}
 *			
 *
 */
function redrawInitiativeList()
{
	//Clear List
	var listelem = document.getElementById("InitiativeList")
	listelem.innerHTML = "";

	//Redraw by order of Initiatives
	var skipids = [];
	// console.log("Iterating through " + chars.length + " Characters");
	for (var i = 0; i < chars.length;) {
		var tmpchar = chars[i];
		var tmpid = tmpchar.id;
		// console.log("Addressing " + tmpchar.Name + "(" + tmpid + ")")
		//Address skiplist
		if (skipids.includes(tmpid)) {
			// console.log("Already Added");
			i++;
			continue;
		}
		for (var x = i+1; x < chars.length; x++) {
			// console.log("Comparing Against " + chars[x].Name);
			//Address skiplist
			if (skipids.includes(chars[x].id)) {
				// console.log("Already Added");
				continue;
			}
			//Evaluate greater or equal initiative
			if(chars[x].ConMon.Initiative > tmpchar.ConMon.Initiative){
				tmpchar = chars[x];
				continue;
			}else if(chars[x].ConMon.Initiative == tmpchar.ConMon.Initiative){
				//Check which one is not GM
				if (chars[x].Player && !tmpchar.Player) {
					tmpchar = chars[x];
					continue;
				}

				//Check for greater Reaction
				if (chars[x].Attributes.Reaction > tmpchar.Attributes.Reaction) {
					tmpchar = chars[x];
					continue;
				}

				//Check for greater Intuition
				if (chars[x].Attributes.Intuition > tmpchar.Attributes.Intuition) {
					tmpchar = chars[x];
					continue;
				}

				//Check for greater Edge
				if (chars[x].Attributes.Edge > tmpchar.Attributes.Edge) {
					tmpchar = chars[x];
					continue;
				}

				//Check for greater health
				if ( (chars[x].ConMon.Physical_Max - chars[x].ConMon.Physical) + (chars[x].ConMon.Stun_Max - chars[x].ConMon.Stun)  > 
					(tmpchar.ConMon.Physical_Max - tmpchar.ConMon.Physical) + (tmpchar.ConMon.Stun_Max - tmpchar.ConMon.Stun) ) {
					tmpchar = chars[x];
					continue;
				}
			}
		}
		//draw character
		// console.log("Adding to Initiative List: " + tmpchar.Name);
		tmpchar.drawInitiativeBox();
		//add character to skip list
		skipids.push(tmpchar.id);
		//repeat if id != i
		if (tmpchar.id == tmpid) {
			i++;
		}
	}
	return;
}//end redrawInitiativeList()

/**
 * @function changeActive()
 *		Changes the Active character based on the given ID
 *		Active Character is rendered in the CharacterSheet element
 *
 * @param {integer} intId
 *		ID of the new Active Character
 */
function changeActive(intId)
{	
	//Cover in case Active Character is in Edit Mode
	actchar.drawEdit();
	actchar.updateFromEdit();
	actchar.draw();
	
	//Draw the Active character or a new one.
	if (chars[intId] !== undefined) {
		console.log("Changing Active Character to " + chars[intId].Name + "(" + intId + ")");
		actchar = chars[intId];
		actchar.draw();
	}else {
		new Character().draw();
	}

	//Update the Initiative List and Action List to reflect the character change
	redrawInitiativeList();
	redrawActionList();
	return;
}//end changeActive()

/**
 * @function setInitiative()
 *		Prompts for new Initiative Value and sets the characters initiative to that value.
 *
 * @param {integer} intId
 *		ID of character to set initiative for.
 */
function setInitiative(intId){
	chars[intId].ConMon.Initiative = parseInt(prompt("New Initiative","0"));
	redrawInitiativeList();
	return;
}//end setInitiative()

/**
 * @function removeCharacter()
 *		Remove a character from the character array
 *
 * @param {integer} intId
 *		ID of character to remove.
 */
function removeCharacter(intId){
	chars.splice(intId,1); //remove element
	for (var i = 0; i < chars.length; i++) {
		chars[i].updateId(i); //update id's of each character
	}
	return;
}//end removeCharacter()
