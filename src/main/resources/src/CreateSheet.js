import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { rollStats as RollStats } from './dice/RollStats';
import { rollHP } from './dice/RollHP';
import { getClass, getRaces, getRace, submitCharacter, getBaseWeapons, getSubclassFeatures } from './services/apiService';
import './CreateSheet.css';
import './CreateSheet2.css';
import './CreateSheet3.css';
import './CreateSheet4.css';
import './CreateSheet5.css';

function CreateSheet() {
	
	/*
		Constants
	*/    
	
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
	const [use2024Rules, setUse2024Rules] = useState(false);
	const [useMercerContent, setUseMercerContent] = useState(false);
	const [statOption, setStatOption] = useState('standard');
	const [name, setName] = useState('');
	const [hp, setHP] = useState(0);
	const [hitDice, setHitDice] = useState(6);
	const [races, setRaces] = useState([]);
	const [race, setRace] = useState('');
	const [selectedRaceDetails, setSelectedRaceDetails] = useState([]);
	const [Class, setClass] = useState('Artificer');
	const [subclass, setSubclass] = useState('');
	const [subclassFeaturesAt, setSubclassFeaturesAt] = useState([]);
	const [subclassFeatures, setSubclassFeatures] = useState([]);
	const [level, setLevel] = useState(1);
	const [abilities, setAbilities] = useState([]);
	const [selectedChoices, setSelectedChoices] = useState([]);
	const [equipmentProficiencies, setEquipmentProficiencies] = useState([]);
	const [weaponProficiency, setWeaponProficiency] = useState('simple');
	const [startingEquipment, setStartingEquipment] = useState([]);
	const [simpleWeapons, setSimpleWeapons] = useState([]);
	const [martialWeapons, setMartialWeapons] = useState([]);
	const [selectedEquipment, setSelectedEquipment] = useState([]);
	const [equipment, setEquipment] = useState([]);
	const [AC, setAC] = useState(0);

	/*
		UseEffect Hooks
	*/

	useEffect(() => { // Asynchronously fetch races when the stage first changes to 1
		if (stage === 1) {
			getRaceSelection();
		}
	}, [stage]);

	useEffect(() => { // Asynchronously calculate HP when the stage first changes to 3
		if (stage === 3) {
			const hp = calculateHP(level, hitDice, stats.constitution);
			setHP(hp);
		}
	}, [stage, level, hitDice, stats.constitution]);

	useEffect(() => { // Asynchronously fetch when the stage first changes to 3
		if (stage === 3) {
			getClassAbilties(Class, level);
		}
	}, [stage, Class, level]);

	useEffect(() => { // Asynchronously fetch weapons at stage 4
		if (stage === 4) {
			getWeapons();
		}
	}, [stage]);

	useEffect(() => { // Asynchronously fetch subclass when the subclass is selected
		getSubclassFeature();
	}, [subclass]);

	useEffect(() => { // Asynchronously fetch subclass features when the subclass features are updated
		if (subclassFeatures.length > 0) {
			console.log('Subclass Features:', subclassFeatures);
		}
	}, [subclassFeatures]);
	
	/*
		Functions to set data and handle change events
	*/

	const getWeapons = async () => {

		const response = await getBaseWeapons('simple weapons');

		setSimpleWeapons(response.weapons);

		const response2 = await getBaseWeapons('martial weapons');

		setMartialWeapons(response2.weapons);

	}

	const handleEquipmentChange = (isChecked, equipment, counterpart) => { // Handles equipment selection in starting equipment menu
		if (isChecked) {
			setSelectedEquipment((prev) => [...prev, equipment].filter((item) => item !== counterpart));
		} else {
			setSelectedEquipment((prev) => prev.filter((item) => item !== equipment));
		}
	};

	const addEquipment = () => { // Adds selected equipment to a constant array

	};

	const handleStatOptionChange = (e) => { // Sets the selected stat generation option
		setStatOption(e.target.value);
	}

	const handleNextClick = () => { // Go to the next stage
		setStage((prevStage) => prevStage + 1);

	}

	const handleBackClick = () => { // Go to the previous stage
		setStage((prevStage) => prevStage - 1);
		if (stage === 3) {
			setAbilities([]); // Clear abilities when moving to the next stage
		}
	}

	const [availableValues, setAvailableValues] = useState([8, 10, 12, 13, 14, 15]); // For standard array only

	const [rolledStats, setRolledStats] = useState([]); // For rolled stats only

	const [points, setPoints] = useState(27); // For point buy only

	const handleAbilitySelection = (abilityName, value) => { // Set selected abilities

		if (abilityName.toLowerCase().includes('subclass')) {
			setSubclass(value); // Update the subclass state
		}
		const newChoices = [...selectedChoices];

		const index = abilities.findIndex(ability => ability.name === abilityName);
		if (index !== -1) {
			newChoices[index] = value;
			setSelectedChoices(newChoices);
		}
	}

	const handleCheckboxSelection = (abilityName, selectedValue, isChecked, limit) => {

	}

	const getRaceSelection = async () => {

		try {

			if (useMercerContent === false) {

				let sources = ['EGW', 'PSK', 'MPMM', 'XPHB'];
				const response = await getRaces(sources);

				const raceList = response.raceList.map((race) => ({ raceName: race.name, source: race.source }));

				console.log(raceList);

				// Update the state with the entire array at once
				setRaces(raceList);

			} else {

				let sources = ['EGW', 'PSK', 'XPHB'];
				const response = await getRaces(sources);

				const raceList = response.raceList.map((race) => ({ raceName: race.name, source: race.source }));

				console.log(raceList);

				// Update the state with the entire array at once
				setRaces(raceList);
			}

		} catch (error) {
			console.error(error);
		}
	}

	const handleRaceChange = async (raceName, source) => {

		try {
			const response = await getRace(raceName, source);

			console.log(response.race.name);

			setRace(raceName);

			setSelectedRaceDetails([{
				name: response.race.name, speed: response.race.speed,
				abilities: response.race.ability, entries: response.race.entries,
			}]);
		} catch (error) {
			console.error(error);
		}

	}

	const getClassAbilties = async (query) => { // Get class abilites up to selected level
		try {
			const response = await getClass(query, level);

			console.log(response);

			setHitDice(response.class[0].hd.faces);

			setEquipmentProficiencies(response.class[0].startingProficiencies.equipment);
			console.log('Equipment Proficiencies:', response.class[0].startingProficiencies.equipment);

			setSubclassFeaturesAt(response.class[0].subclassFeaturesAt);

			setStartingEquipment(response.class[0].startingEquipment.default);
			console.log('Starting Equipment:', response.class[0].startingEquipment.default);

			for (let i = 0; i < response.classFeature.length; i++) {
				let classFeature = response.classFeature[i];
				let featureDescription = classFeature.entries;

				const requiresSelection = classFeature.requiresSelection;

				let selectionType = [];

				if (requiresSelection) {
					selectionType = classFeature.selection || [];
				}

				setAbilities((prev) => [...prev, {
					name: classFeature.name, requiresSelect: requiresSelection, selection: selectionType,
					level: classFeature.level, description: featureDescription
				}]);

			}

		} catch (error) {
			console.error('Error fetching class abilities:', error);
		}
	}

	const getSubclassFeature = async () => { // Get subclass features
		try {
			setSubclassFeatures([]); // Clear previous subclass features

			const response = await getSubclassFeatures(Class, subclass);

			const features = response.subclassFeature.map((feature) => ({

				name: feature.name,
				level: feature.level,
				description: feature.description,
			}));

			setSubclassFeatures(features);

		} catch (error) {
			console.error(error)
		}

	}

	const calculateHP = (level, hitDie, constitution) => {

		let conMod = Math.floor((constitution - 10) / 2);

		if (level > 1) {
			if (!useAverageHP) { // Use rolled HP
				let numDice = level - 1;
				let rolled = rollHP(numDice, hitDie, conMod) + (hitDie + conMod);
				setHP(rolled);
				return rolled;
			} else { // Use average HP
				let totalHP = 0;
				for (let i = 1; i < level; i++) {
					let average = Math.ceil((hitDie + 1) / 2) + conMod;
					totalHP += average;
				}
				setHP(totalHP);
				return totalHP;
			}

		} else { // Level 1 HP
			let lvl1HP = hitDie + conMod;
			setHP(lvl1HP);
			return lvl1HP;
		}
	}

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

			setPoints(points - pointDiff);
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
	
	/*
		Rendering functions
	*/

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

	const testsubmit = async () => {
		const payload = {
			charName: name,
			charHP: hp,
			charHD: hitDice,
			charRace: race,
			charClass: Class,
			charLevel: level,
		};

		console.log('attempting to submit character:', payload);

		submitCharacter(payload)
			.then((response) => {
				console.log('Character submitted successfully:', response);
			})

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
							<li>
								<input
									type="checkbox"
									checked={use2024Rules}
									onChange={(e) => setUse2024Rules(e.target.checked)} />
								Use 2014 rules?
							</li>
							<li>
								<input
									type="checkbox"
									checked={useMercerContent}
									onChange={(e) => setUseMercerContent(e.target.checked)} />
								Use Mercer content?
							</li>
						</ul>
					</aside><header className="CreateSheet-header">
							<h1>Create a Character Sheet</h1>
							<div className="inputs-column">
								<label htmlFor="name">Enter Character Name:</label>
								<input
									type="text" placeholder="Enter a name" value={name}
									onChange={(e) => setName(e.target.value)} />

								<label htmlFor="race">Select a Race:</label>
								<select id="race"
									value={race}
									onChange={(e) => {
										const selectedRace = races.find(r => r.raceName === e.target.value);
										handleRaceChange(selectedRace.raceName, selectedRace.source);
									}} >
									<option value="" disabled>Select an option</option>
									{races.map((raceObj, i) => (
										<option key={i} value={raceObj.raceName}>
											{`${raceObj.raceName} (${raceObj.source})`}
										</option>
									))}
								</select>

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
					<div className="scrollable-abilities">
						<div className="race-details-container">
							<h2>Race Details</h2>
							{selectedRaceDetails.length > 0 ? (
								<div>
									<p>{selectedRaceDetails[0].name}</p>
									<p>{`${selectedRaceDetails[0].speed}ft`}</p>
									{selectedRaceDetails[0].entries.map((entry, index) => (
										<div key={index} className="race-ability">
											<h3>{entry.name}</h3>
											{Array.isArray(entry.entries) && entry.entries.map((subEntry, subIndex) => (
												<p key={subIndex}>{subEntry}</p>
											))}
										</div>
									))}
								</div>
							) : (
								<p>No race selected</p>
							)}
						</div>
					</div >
				</div >
			</div>
		)
	} else if (stage === 2) { // Stage 2: Assign stats
		return (
			<div className="CreateSheet2">
				<header className="CreateSheet-header2">

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

				<aside className="racial-bonus-stage">
					<h2>Racial Bonuses</h2>
					<ul>
						{selectedRaceDetails[0].abilities.map((bonus, index) => (
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
	} else if (stage === 3) { // Stage 3: Assign Abilities

		return (
			<div className="CreateSheet3">
				<header className="CreateSheet-header3">
					<h1>Assign Abilities</h1>

					<div className="scrollable-abilities">
						<div className="abilities-container">
							{abilities.map((ability, index) => (
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
										{ability.requiresSelect && (
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
				<aside className="health-container">
					<h4>Health</h4>
					<p>HP: {hp}</p>
					<p>Hit Dice: {level}d{hitDice}</p>
				</aside>
			</div>
		)
	} else if (stage === 4) {
		return (
			<div className="CreateSheet4">
				<header className="CreateSheet-header">
					<h1>Select Background and Starting Equipment</h1>

					<div className="equipment-container">
						Choose Starting Equipment:
						{startingEquipment.map((equipment, index) => (
							<div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>


								{equipment.toLowerCase().includes('any')
									|| equipment.toLowerCase().includes('a martial') ? (
									<div>
										<input
											type="checkbox"
											id={`equipment-checkbox-${index}`}
											value={equipment}
											checked={selectedEquipment.includes(equipment)}
											onChange={(e) => handleEquipmentChange(e.target.checked, equipment, null)}
										/>
										<label htmlFor={`equipment-checkbox-${index}`}>{equipment}</label>

										<select
											id={`dropdown-${index}`}
											onChange={(e) => handleEquipmentChange(true, e.target.value, null)}
										>
											<option value="" disabled>Select an option</option>
											{equipment.toLowerCase().includes('martial') ? (
												martialWeapons.map((weapon, i) => (
													<option key={i} value={weapon.name}>
														{weapon.name}
													</option>
												))
											) : (
												simpleWeapons.map((weapon, i) => (
													<option key={i} value={weapon.name}>
														{weapon.name}
													</option>
												))
											)}
										</select>
									</div>
								) : (
									equipment.split(' or ').map((option, optionIndex, array) => (
										<div key={optionIndex}>
											<input
												type="checkbox"
												id={`equipment-${index}-${optionIndex}`}
												value={option.trim()}
												checked={selectedEquipment.includes(option.trim())}
												onChange={(e) =>
													handleEquipmentChange(
														e.target.checked,
														option.trim(),
														array.find((item) => item !== option.trim())
													)
												}
											/>
											<label htmlFor={`equipment-${index}-${optionIndex}`}>{option.trim()}</label>
										</div>
									))
								)}
							</div>
						))}


					</div>

					<button type="button" onClick={() => addEquipment()}>
						Add Equipment
					</button>

					<button type="button" onClick={() => handleNextClick()}>
						Next
					</button>
					<button type="button" onClick={() => handleBackClick()}>
						Back
					</button>
				</header>
			</div>
		)
	} else if (stage === 5) {
		return (
			<div className="CreateSheet5">
				<header className="CreateSheet-header4">
					<h1>Review Your Sheet</h1>
					<button type="button" onClick={() => testsubmit()}>
						Submit
					</button>
					<button type="button" onClick={() => handleBackClick()}>
						back
					</button>
				</header>
			</div>
		)
	}
}

export default CreateSheet;
