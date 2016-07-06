/**
 * @file
 * The Dicepool class to simulate dice rolls
 *
 */

/**
 * @class DicePool()
 *		Handles calculations to simulate the use of a dicepool
 *
 * @var {integer} size
 *		Set externally. Amount of Dice to roll.
 * @var {integer} limit
 *		Set externally. Maximum hits to count from each roll
 * @var {integer} threshold
 *		Set Externally. Hits that determine success
 * @var {integer} rolls
 *		Number of times dicepool was rolled
 *		Useful during extended tests
 * @var {integer[]} results
 *		Result of each dice rolled.
 * @var {integer} sum
 *		Sum of dice in results.
 * @var {integer} hits
 *		Number of dice that came up as a hit.
 * @var {integer} ones
 *		Number of dice that came up as a 1.
 * @var {boolean} glitch
 *		If dicepool rolled a glitch.
 *		At least half the dicepool came up one.
 * @var {boolean} crit
 *		If dicepool rolled a critical glitch.
 *		Glitch and not success.
 * @var {boolean} success
 *		If dicepool rolled more hits than threshold.
 *
 * @function reset()
 * @function rollextended()
 * @function rollpool()
 * @function rolldie()
 * @function logresults()
 */
function DicePool()
{
	this.size		= 0;
	this.limit		= 0;
	this.threshold	= 0;
	this.rolls		= 0;
	this.results	= [];
	this.sum		= 0;
	this.hits		= 0;
	this.ones		= 0;
	this.glitch		= false;
	this.crit		= false;
	this.success	= false;

	/**
	 * @function reset()
	 *		Resets values that may be adjusted during a dice roll
	 * 
	 */
	this.reset = function(){
		this.rolls		= 0;
		this.results	= [];
		this.sum		= 0;
		this.hits		= 0;
		this.ones		= 0;
		this.glitch		= false;
		this.crit		= false;
		this.success	= false;
		return;
	}//end DicePool::reset()
	
	/**
	 * @function rollextended()
	 *		Use rollpool until success.
	 *		Each roll reduces the size by 1.
	 * 
	 */
	this.rollextended = function(){
		var hitsextended = 0;
		var glitchextended = false;
		var critextended = false;
		this.reset();
		while (!this.success && this.size - this.rolls > 0)
		{
			this.rollpool();
			this.results.push(-1); //-1 flags end of previous dicepool roll in results
			hitsextended += this.hits;
			glitchextended	= (glitchextended || this.glitch);
			critextended	= (critextended || this.crit);
			this.success	= (hitsextended >= this.threshold);
			this.rolls += 1;
		}
		this.hits = hitsextended;
		this.glitch = glitchextended;
		this.crit = critextended;
		return;
	}//end DicePool::rollextended()

	/**
	 * @function rollpool()
	 *		Roll the dicepool and determine the results
	 * 		For this function the size is reduced by the rolls
	 * 
	 */
	this.rollpool	= function(){
		this.hits	= 0;
		this.ones	= 0;
		this.sum	= 0;
		for (var i = 0; i < this.size - this.rolls; i++) {
			this.results.push(this.rolldie());
			this.sum	+= this.results[this.results.length - 1];
			this.hits	+= (this.results[this.results.length - 1] >= 5) ? 1 : 0;
			this.ones	+= (this.results[this.results.length - 1] == 1) ? 1 : 0;
		}
		this.hits		= (this.hits < this.limit || this.limit == 0) ? this.hits : this.limit;
		this.glitch		= (this.ones >= Math.floor((this.size - this.rolls) / 2) && this.ones != 0);
		this.crit		= (this.glitch && this.hits == 0);
		this.success	= (this.hits >= this.threshold);
		return;
	}//end DicePool::rollpool()

	/**
	 * @function rolldie()
	 *		Produces a random number to simulate the roll of 1D6 
	 *
	 * @return {integer}
	 *		result of random number generation
	 */
	this.rolldie	= function(){
		return Math.floor(Math.random() * 6 + 1);
	}//end DicePool::rolldpool()

	/**
	 * @function logresults()
	 *		logs the current status of the dicepool
	 *
	 */
	this.logresults = function(){
		var tmpstr = "";
		tmpstr += this.size + " [" + this.limit + "] (" + this.threshold + ")";
		console.log(tmpstr);
		tmpstr = "";
		for (var i = 0; i < this.results.length; i++) {
			if (this.results[i] != -1){
				tmpstr += this.results[i] + ":";
			}else{
				tmpstr += "\n";
			}
		}
		console.log(tmpstr);
		console.log("Hits:" + this.hits + " Ones:" + this.ones + " Rolls:" + this.rolls);
		console.log("Success: " + this.success + " Glitch: " + this.glitch + " Critical Glitch: " + this.crit);
		return;
	}//end DicePool::logresults
}//end DicePool