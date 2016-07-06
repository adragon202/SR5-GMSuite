/**
 * @file
 *		The main javascript file that executes the program.
 *		Responsible for loading database files and initializing global variables
 *		Also intiializes 
 *
 * @global {object} skillsdb
 *		Loaded Database of Skills
 * @global {object} skillgroupsdb
 *		Loaded Database of Skill Groups
 * @global {object} actionsdb
 *		Loaded Database of Actions
 * @global {Character[]} chars
 *		Considered the Session. Loaded Characters 
 * @global {Character} actchar
 *		Character loaded from Session into being active.
 */

//Load Databases
var skillsdb		= {};
var skillgroupsdb	= {};
var actionsdb		= {    "Fire Shotgun": {        "attributes": [            "Agility"        ],        "defense_fixed_limit": 0,        "defense_limit": "",        "fixed_defense": 0,        "fixed_limit": 5,        "has_fixed_limit": true,        "has_fixed_opposed": false,        "has_interval": false,        "has_limit": true,        "has_opposed": false,        "has_opposed_fixed_limit": false,        "has_threshold": false,        "interval": 0,        "limit": "",        "skills": [            "Longarms"        ],        "specialization": [            "Shotguns"        ],        "threshold": 0    },    "Cast Spell": {        "attributes": [            "Magic"        ],        "defense_fixed_limit": 0,        "defense_limit": "",        "fixed_defense": 0,        "fixed_limit": 5,        "has_fixed_limit": true,        "has_fixed_opposed": false,        "has_interval": false,        "has_limit": true,        "has_opposed": false,        "has_opposed_fixed_limit": false,        "has_threshold": false,        "interval": 0,        "limit": "",        "skills": [            "Spellcasting"        ],        "threshold": 0    }};
if(isNodeJs()){
	var fs = require('fs');
	fs.readFile("./lib/skills.dat", 'utf8', function(err, data){
		if (err) {
			return window.alert("Err Opening File\n" + err);
		}
		skillsdb = jQuery.parseJSON(data);
		redrawDataLists();
		return;
	});
	fs.readFile("./lib/skillgroups.dat", 'utf8', function(err, data){
		if (err) {
			return window.alert("Err Opening File\n" + err);
		}
		skillgroupsdb = jQuery.parseJSON(data);
		redrawDataLists();
		return;
	});
	fs.readFile("./lib/actions.dat", 'utf8', function(err, data){
		if (err) {
			return window.alert("Err Opening File\n" + err);
		}
		actionsdb = jQuery.parseJSON(data);
		redrawActionList();
		return;
	});
}

//Characters Initialization
var chars = new Array();
var actchar = new Character();
actchar.draw();
redrawInitiativeList();

//Test Code
