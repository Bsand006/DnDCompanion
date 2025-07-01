import React, { useState } from 'react';
import { rollStats } from '../../../dice/RollStats';

function CreateSheetStage2({ character, setCharacter, goNext, goBack, statOption, statBonus }) {

	const [stats, setStats] = useState({
		str: 8,
		dex: 8,
		con: 8,
		int: 8,
		wis: 8,
		cha: 8
	});

	const [availableValues, setAvailableValues] = useState([8, 10, 12, 13, 14, 15]); // For standard array only
	const [rolledStats, setRolledStats] = useState([]); // For rolled stats only
	const [newRolledStats, setNewRolledStats] = useState([]); // For rolled stats only
	const [points, setPoints] = useState(27); // For point buy only


	const handleStatChange = (stat, newValue) => {
		const parsedValue = parseInt(newValue, 10);
		const prevValue = stats[stat];

		if (statOption === 'standard') { // Standard array

			if (parsedValue === prevValue) return;

			// Build the new stats object first
			const newStats = {
				...stats,
				[stat]: parsedValue,
			};

			// Calculate new available values
			let newAvailableValues = [...availableValues];

			// Add the old value back if it was a valid number (not empty)
			if (prevValue && !newAvailableValues.includes(prevValue)) {
				newAvailableValues.push(prevValue);
			}


			// Remove the new selected value
			newAvailableValues = newAvailableValues.filter((val) => val === parsedValue);
			newAvailableValues.sort((a, b) => a - b);

			// Now update state together
			setStats(newStats);


			setAvailableValues(newAvailableValues);

		} else if (statOption === 'pointBuy') { // point buy
			if (parsedValue < 8 || parsedValue > 15) {
				return;
			}

			const cost = (value) => {
				if (value <= 13) return value - 8 // 1 point per stat above 8
				return (value - 13) * 2 + 5 //cost increase for stats above 13
			}

			// Calculate point difference
			let prevCost = cost(prevValue);
			let newCost = cost(parsedValue);
			let pointDiff = newCost - prevCost;

			if (points - pointDiff < 0) {
				return;
			}

			setStats({
				...stats,
				[stat]: parsedValue,
			})

			setPoints(points - pointDiff);
		} else if (statOption === 'rolled') { // rolled stats

			console.log('the parsed value is', parsedValue);
			console.log('the previous value is', prevValue);

			if (parsedValue === prevValue) return;

			// Build the new stats object first
			const newStats = {
				...stats,
				[stat]: parsedValue,
			};

			// Calculate new available values for rolled stats
			let newAvailableValues = [...rolledStats];

			// Add the old value back to the available rolled stats if it isn't already there
			if (prevValue && !newAvailableValues.includes(prevValue)) {
				newAvailableValues.push(prevValue);
			}

			console.log('new stats are', newStats);

			const indexToRemove = newAvailableValues.indexOf(parsedValue);

			if (indexToRemove !== -1) {
				newAvailableValues.splice(indexToRemove, 1); // removes only one instance
			}

			newAvailableValues.sort((a, b) => a - b);

			console.log('new available values are', newAvailableValues);
			console.log('now the new stats are', newStats);

			setNewRolledStats(newAvailableValues);

			setRolledStats(newAvailableValues);

			setStats(newStats);
			console.log('rolled stats are', rolledStats);
		};
	}

	const renderStatOption = () => {

		if (statOption === 'standard') {

			return Object.keys(stats).map((stat) => {
				const currentValue = stats[stat];

				// Allow all available values plus the currently selected one
				const valuesForDropdown = [...availableValues];
				if (currentValue && !valuesForDropdown.includes(currentValue)) {
					valuesForDropdown.push(currentValue);
				}

				valuesForDropdown.sort((a, b) => a - b);


				return (
					<div key={stat}>
						<label htmlFor={stat}>
							{stat.charAt(0).toUpperCase() + stat.slice(1)}:
						</label>
						<select
							id={stat}
							value={currentValue}
							onChange={(e) => handleStatChange(stat, e.target.value)}
						>
							<option value="" disabled>
								Select a value
							</option>
							{valuesForDropdown.map((value) => (
								<option key={value} value={value}>
									{value}
								</option>
							))}

						</select>
					</div>
				);
			});
		} else if (statOption === 'pointBuy') {
			return Object.keys(stats).map((stat) => {
				const currentValue = stats[stat];
				return (
					<div key={stat}>
						<label htmlFor={stat}>
							{stat.charAt(0).toUpperCase() + stat.slice(1)}:
						</label>
						<input
							type="number"
							id={stat}
							value={currentValue}
							onChange={(e) => handleStatChange(stat, e.target.value)}
						/>
					</div>
				)
			});
		} else if (statOption === 'rolled') {
			return Object.keys(stats).map((stat) => {
				const currentValue = stats[stat];


				const availableValues = rolledStats.filter(value => !Object.values(stats).includes(value));

				console.log('available values are', availableValues);
				console.log('new values are ', newRolledStats);

				// Include the current value if it's still in the rolled stats
				if (currentValue && !availableValues.includes(parseInt(currentValue))) {
					availableValues.push(parseInt(currentValue));
				}

				const countOccurrences = (arr) => {
					const count = {};
					for (const val of arr) {
						count[val] = (count[val] || 0) + 1;
					}
					return count;
				};

				const newCount = countOccurrences(newRolledStats);
				const availableCounts = countOccurrences(availableValues);

				let added = 0;

				const result = [...availableValues];

				console.log('result is', result);

				if (availableValues.length !== 6) { // Check if there are missing values

					for (const val in newCount) {
						const diff = newCount[val] - (availableCounts[val] || 0);
						for (let i = 0; i < diff; i++) {
							if (added >= 2) break; // Only add up to 2 missing values
							result.push(parseInt(val));
							added++;
						}
						if (added >= 2) break;
					}
				}

				result.sort((a, b) => a - b);

				return (
					<div key={stat}>
						<label htmlFor={stat}>
							{stat.charAt(0).toUpperCase() + stat.slice(1)}:
						</label>
						<select
							id={stat}
							value={currentValue}
							onChange={(e) => handleStatChange(stat, e.target.value)}
						>
							<option value="" disabled>
								Select a value
							</option>
							{result.map((value, index) => (
								<option key={`${stat}-${value}-${index}`} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
				);
			});
		}
	}

	const submitStats = () => {
		const updatedStats = { ...stats };
		statBonus.forEach(bonus => {
			Object.entries(bonus).forEach(([ability, value]) => {
				if (updatedStats.hasOwnProperty(ability)) {
					updatedStats[ability] += value;
				}
			})
		})

		setCharacter((prev) => ({
			...prev,
			stats: updatedStats,
		}));

		console.log(character.stats)

		goNext();
	}

	return (
		<div className="CreateSheet">
			<header className="CreateSheet-header">

				<div className="stage">
					<h1>Assign Stats</h1>
					{renderStatOption()}
				</div>
				{statOption === 'pointBuy' && (
					<div className="pointbuy-stage">
						points: {points}
					</div>
				)}
				{statOption === 'rolled' && (
					<div className="rolled-stage">
						<button
							onClick={() => {
								const newRoll = rollStats().filter(value => value !== 0);
								setRolledStats(newRoll);

								// Clear all stats by setting them to empty
								const clearedStats = Object.fromEntries(
									Object.keys(stats).map((key) => [key, '']) // Reset all stats to empty
								);
								setStats(clearedStats);
							}}
						>
							Roll
						</button>
					</div>
				)}

				<button type="button" onClick={() => submitStats()}>
					Next
				</button>
				<button type="button" onClick={() => goBack()}>
					Back
				</button>
			</header >

			<aside className="details-small-container">
				<h2>Racial Bonuses</h2>
				<ul>
					{statBonus.map((bonus, index) => (
						<li key={index}>
							{Object.entries(bonus).map(([ability, value]) => (
								<p key={ability}>
									<strong>{ability.toUpperCase()}:</strong> {value > 0 ? `+${value}` : value}
								</p>
							))}
						</li>
					))}
				</ul>
			</aside>
		</div >
	)
}

export default CreateSheetStage2;
