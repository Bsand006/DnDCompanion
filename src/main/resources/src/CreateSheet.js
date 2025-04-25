import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { rollStats as RollStats } from './dice/RollStats';
import { getClass } from './services/apiService';
import './CreateSheet.css';
import './CreateSheet2.css';
import './CreateSheet3.css';

function CreateSheet() {

	const navigate = useNavigate();

	const [stage, setStage] = useState(1);


	const [stats, setStats] = useState({
		strength: 8,
		dexterity: 8,
		constitution: 8,
		intelligence: 8,
		wisdom: 8,
		charisma: 8
	});

	const [useAverageHP, setUseAverageHP] = useState(false);
	const [useOptionalFeatures, setUseOptionalFeatures] = useState(false);
	const [useXP, setUseXP] = useState(false);
	const [statOption, setStatOption] = useState('standard');
	const [name, setName] = useState('');
	const [Class, setClass] = useState('Artificer');
	const [subclass, setSubclass] = useState('');
	const [level, setLevel] = useState(1);
	const [abilites, setAbilites] = useState([]);

	useEffect(() => { // Asynchronously fetch when the stage first changes to 3
		if (stage === 3) {
			getClassAbilties(Class, level);
		}
	}, [stage, Class, level]);

	const handleStatOptionChange = (e) => {
		setStatOption(e.target.value);
	}

	const handleNextClick = () => { // Go to the next stage
		setStage((prevStage) => prevStage + 1);
	}

	const handleBackClick = () => { // Go to the previous stage
		setStage((prevStage) => prevStage - 1);
	}

	const [availableValues, setAvailableValues] = useState([8, 10, 12, 13, 14, 15]); // For standard array only

	const [rolledStats, setRolledStats] = useState([]) // For rolled stats only

	const [points, setPoints] = useState(27); // For point buy only


	const handleAbilitySelection = (abilityName, selectedValue) => {

	}

	const handleCheckboxSelection = (abilityName, selectedValue, isChecked, limit) => {

	}

	const getClassAbilties = async (query) => { // Get class abilites up to selected level
		try {
			const response = await getClass(query, level)

			for (let i = 0; i < response.classFeature.length; i++) {
				const classFeature = response.classFeature[i];
				const featureName = classFeature.name;
				const featureLevel = classFeature.level;
				const featureDescription = classFeature.entries;

				const requiresSelection = classFeature.requiresSelection;

				setAbilites((prev) => [...prev, { name: featureName, requiresSelect: requiresSelection, level: featureLevel, description: featureDescription }]);
			}

		} catch (error) {
			console.error('Error fetching class abilities:', error);
		}
	}

	console.log(abilites);
	console.log(availableSubclasses);

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
			newAvailableValues = newAvailableValues.filter((val) => val !== parsedValue);
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

			setPoints(points - pointDiff)
		} else if (statOption === 'rolled') { // rolled stats
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

			// Remove the new selected value from the available rolled stats
			newAvailableValues = newAvailableValues.filter((val) => val !== parsedValue);
			newAvailableValues.sort((a, b) => a - b);

			// Now update state together
			setStats(newStats);
			setRolledStats(newAvailableValues);


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

				// Filter out values already assigned to other stats from rolledStats
				const availableValues = rolledStats.filter(value => !Object.values(stats).includes(value));

				// Include the current value if it's still in the rolled stats
				if (currentValue && !availableValues.includes(parseInt(currentValue))) {
					availableValues.push(parseInt(currentValue));
				}

				availableValues.sort((a, b) => a - b);

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
							{availableValues.map((value, index) => (
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

	if (stage === 1) { // Stage 1: name, class, level, options
		return (
			<div className="CreateSheet">
				<div className="CreateSheet-body">

					<><aside className="CreateSheet-sidebar">
						<h2>Character Sheet Options</h2>
						<ul>
							<li>
								<input
									type="checkbox"
									checked={useAverageHP}
									onChange={(e) => setUseAverageHP(e.target.checked)} />
								Use Average HP?
							</li>
							<li>
								<label htmlFor="statOptions">Stat Options:</label>
								<select id="statOptions"
									value={statOption}
									onChange={handleStatOptionChange}>
									<option value="standard">Standard Array</option>
									<option value="pointBuy">Point Buy</option>
									<option value="rolled">Rolled</option>
								</select>
							</li>
							<li>
								<input
									type="checkbox"
									checked={useOptionalFeatures}
									onChange={(e) => setUseOptionalFeatures(e.target.checked)} />
								Use optional features?
							</li>
							<li>
								<input
									type="checkbox"
									checked={useXP}
									onChange={(e) => setUseXP(e.target.checked)} />
								Use XP?
							</li>
						</ul>
					</aside><header className="CreateSheet-header">
							<h1>Create a Character Sheet</h1>
							<div className="inputs-column">
								<label htmlFor="name">Enter Character Name:</label>
								<input
									type="text" placeholder="Enter a name" value={name}
									onChange={(e) => setName(e.target.value)} />

								<label htmlFor="class">Select Class:</label>
								<select id="class"
									value={Class}
									onChange={(e) => setClass(e.target.value)}>
									<option value="artificer">Artificer</option>
									<option value="barbarian">Barbarian</option>
									<option value="bard">Bard</option>
									<option value="cleric">Cleric</option>
									<option value="druid">Druid</option>
									<option value="fighter">Fighter</option>
									<option value="monk">Monk</option>
									<option value="paladin">Paladin</option>
									<option value="ranger">Ranger</option>
									<option value="rogue">Rogue</option>
									<option value="sorcerer">Sorcerer</option>
									<option value="warlock">Warlock</option>
									<option value="wizard">Wizard</option>
								</select>

								<label htmlFor="level">Select Level:</label>
								<select id="level"
									value={level}
									onChange={(e) => setLevel(e.target.value)}>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
									<option value="13">13</option>
									<option value="14">14</option>
									<option value="15">15</option>
									<option value="16">16</option>
									<option value="17">17</option>
									<option value="18">18</option>
									<option value="19">19</option>
									<option value="20">20</option>
								</select>
								<button type="button" onClick={() => handleNextClick()}>
									Next
								</button>
							</div>
						</header></>
				</div >
			</div >

		)
	} else if (stage === 2) { // Stage 2: Assign stats
		return (
			<div className="CreateSheet2">
				<header className="CreateSheet-header">

					<div className="stage">
						<h1>Assign Stats</h1>
						{renderStatOption()}
					</div>
					{statOption === 'pointBuy' && (
						<div className="points-stage">
							points: {points}
						</div>
					)}
					{statOption === 'rolled' && (
						<div className="rolled-stage">
							<button
								onClick={() => {
									const newRoll = RollStats().filter(value => value !== 0); // assuming this returns an array of numbers
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
					)
					}

					<button type="button" onClick={() => handleNextClick()}>
						Next
					</button>
					<button type="button" onClick={() => handleBackClick()}>
						Back
					</button>
				</header >
			</div >
		)
	} else if (stage === 3) { // Stage 3: Assign Abilities

		return (
			<div className="CreateSheet3">
				<header className="CreateSheet-header">
					<h1>Assign Abilities</h1>
					<div className="scrollable-abilities">
						<div className="abilities-container">
							{abilites.map((ability, index) => (
								<div key={index} className="ability-row">
									<h2>{ability.name}</h2>
									<p>Level: {ability.level}</p>
									<details>
										<summary>Description</summary>
										{Array.isArray(ability.description) ? (
											ability.description.map((entry, i) => (
												typeof entry === 'object' ? (
													<div key={i}>
														{Object.entries(entry).map(([key, value], j) => (
															<p key={j}><strong>{key}:</strong> {JSON.stringify(value)}</p>
														))}
													</div>
												) : (
													<p key={i}>{entry}</p>
												)
											))
										) : (
											<p>{typeof ability.description === 'object' ? JSON.stringify(ability.description) : ability.description}</p>
										)}
										{ability.requiresSelect === true && ability.selection && (
											<div>
												<label htmlFor={`selection-${index}`}>Choose an option:</label>

												{ability.selection.type === 'dropdown' && (
													<select
														id={`selection-${index}`}
														onChange={(e) => handleAbilitySelection(ability.name, e.target.value)}
													>
														<option value="" disabled>Select an option</option>
														{ability.selection.options.map((option, i) => (
															<option key={i} value={option}>{option}</option>
														))}
													</select>
												)}

												{ability.selection.type === 'checkbox' && (
													<div>
														{ability.selection.options.map((option, i) => (
															<div key={i}>
																<input
																	type="checkbox"
																	id={`${ability.name}-${i}`}
																	value={option}
																	onChange={(e) => handleCheckboxSelection(ability.name, option, e.target.checked, ability.selection.limit)}
																/>
																<label htmlFor={`${ability.name}-${i}`}>{option}</label>
															</div>
														))}
													</div>
												)}
											</div>
										)}
									</details>
								</div>
							))}
						</div>
					</div>
					<button type="button" onClick={() => handleNextClick()}>
						Next
					</button>
					<button type="button" onClick={() => handleBackClick()}>
						Back
					</button>
				</header>
			</div>
		)
	} else if (stage === 4) {
		
		
	}
}
export default CreateSheet;
