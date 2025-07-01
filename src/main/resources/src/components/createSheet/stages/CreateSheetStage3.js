import React, { useState, useEffect } from 'react';
import { rollHP } from '../../../dice/RollHP';
import { getClass, getSubclassFeatures } from '../../../services/apiService';


function CreateSheetStage2({ character, setCharacter, goNext, goBack, useAverageHP }) {

	const [abilities, setAbilities] = useState([]);
	const [subclassFeatures, setSubclassFeatures] = useState([]);
	const [selectedChoices, setSelectedChoices] = useState([]);

	useEffect(() => {
		let isMounted = false;

		const calculateHP = (level, hitDie, constitution) => {

			if (!isMounted) {

				let conMod = Math.floor((constitution - 10) / 2);

				if (level > 1) {
					if (!useAverageHP) { // Use rolled HP
						let numDice = level - 1;
						let rolled = rollHP(numDice, hitDie, conMod) + (hitDie + conMod);

						setCharacter((prev) => ({
							...prev,
							hp: rolled,
							hitDieCount: level,
						}));

						return rolled;

					} else { // Use average HP

						let totalHP = 0;

						for (let i = 1; i < level; i++) {
							let average = Math.ceil((hitDie + 1) / 2) + conMod;
							totalHP += average;
						}
						setCharacter((prev) => ({
							...prev,
							hp: totalHP,
							hitDieCount: level,
						}));
						return totalHP;
					}

				} else { // Level 1 HP
					let lvl1HP = hitDie + conMod;
					setCharacter((prev) => ({
						...prev,
						hp: lvl1HP,
						hitDieCount: level,
					}));
					return lvl1HP;
				}
			}
		}

		const getClassAbilties = async (query) => { // Get class abilites up to selected level

			if (!isMounted) {

				try {
					const response = await getClass(query, character.level);

					console.log(response);

					setCharacter((prev) => ({
						...prev,
						className: response.class[0].name,
						hitDie: response.class[0].hd.faces,
					}))

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
		}
		
		console.log(character.stats.con)
		
		getClassAbilties(character.className);
		calculateHP(character.level, character.hitDie, character.stats.con);

		return () => {
			isMounted = true;
		}

	}, []);

	const getSubclassFeature = async () => { // Get subclass features
		try {
			setSubclassFeatures([]); // Clear previous subclass features

			const response = await getSubclassFeatures(character.className, character.subclass);

			const features = response.subclassFeature.map((feature) => ({

				name: feature.name,
				level: feature.level,
				description: feature.entries,
			}));

			setSubclassFeatures(features);

		} catch (error) {
			console.error(error)
		}

	}

	const handleAbilitySelection = (abilityName, value) => { // Set selected abilities

		if (abilityName.toLowerCase().includes('subclass')) {
			setCharacter((prev) => ({
				...prev,
				subclass: value,
			}));
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

	return (
		<div className="CreateSheet">
			<header className="CreateSheet-header">
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
				<button type="button" onClick={() => goNext()}>
					Next
				</button>
				<button type="button" onClick={() => goBack()}>
					Back
				</button>
			</header>
			<aside className="details-small-container">
				<h4>Health</h4>
				<p>HP: {character.hp}</p>
				<p>Hit Dice: {character.level}d{character.hitDie}</p>
			</aside>
		</div>
	)
}

export default CreateSheetStage2;
