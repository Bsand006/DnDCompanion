/*
Code to roll a set number and type of dice and return the the total, plus or minus a modifier.
*/

export const rollDice = (numDice, dieType, modifier) => {
    let total = 0;
    const rolls = [];

    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * dieType) + 1;
        rolls.push(roll);
        total += roll;
    }

    total += modifier;

    return { total, rolls };
}