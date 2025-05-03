
/*
    * RollStats.js
    * This file contains the rollStats function that simulates rolling 4d6 and dropping the lowest die.
*/

export const rollStats = () => {
	
	const rolls = []
	
	for (let i = 0; i < 6; i++) {
        const roll = []
        for (let j = 0; j < 4; j++) {
            roll.push(Math.floor(Math.random() * 6) + 1)
        }
        roll.sort((a, b) => a - b)  // Sort the roll in ascending order
        roll.shift() // Remove the lowest die
        const total = roll.reduce((a, b) => a + b, 0) // Sum the remaining dice
        rolls.push(total)
    }
	
	return rolls
}