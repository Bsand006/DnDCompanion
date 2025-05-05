/* 
Code to roll a HP based on a set number and type of dice and a modifier, which is added to each roll.
*/

export const rollHP = (numDice, dieType, modifier) => {
    let total = 0;
    const rolls = [];

    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * dieType) + 1;
        rolls.push(roll);
        total += roll;
    }
    total += modifier * numDice; // Add the modifier to each roll
	
	console.log(`Rolled ${numDice}d${dieType} + ${modifier}: ${rolls.join(', ')} = ${total}`);

    return total;
}