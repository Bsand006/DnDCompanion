import React, { useState, useEffect } from 'react';
import { getRaces, getRace } from '../../../services/apiService';
import '../../../css/CreateSheet.css';
import '../../../css/CreateSheet-components.css';

function CreateSheet({ character, setCharacter, goNext, statOption, setStatOption, useAverageHP, setUseAverageHP, setStatBonus }) {

	const [races, setRaces] = useState([]);
	const [selectedRaceDetails, setSelectedRaceDetails] = useState([]);
	const [useOptionalFeatures, setUseOptionalFeatures] = useState(false);
	const [useXP, setUseXP] = useState(false);
	const [use2024Rules, setUse2024Rules] = useState(false);
	const [useMercerContent, setUseMercerContent] = useState(false);

	/*
		useEffect hook to fetch race list while only running once when the component mounts.
	*/
	
	useEffect(() => {
		let isMounted = false;

		const getRaceSelection = async () => {

			if (!isMounted) {

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
		}

		getRaceSelection();

		return () => {
			isMounted = true;
		}

	}, []);
	
	const checkFields = () => {
		if (selectedRaceDetails.length > 0 && character.className !== '' && character.name !== '') {
			goNext();
		} else {
			alert('You have not completed one or more required fields');
		}
	}

	const handleRaceChange = async (raceName, source) => {

		try {
			const response = await getRace(raceName, source);

			console.log(response);
			
			setStatBonus(response.race.ability);

			setCharacter((prev) => ({
				...prev,
				race: raceName
			}));

			setSelectedRaceDetails([{
				name: response.race.name, speed: response.race.speed,
				abilities: response.race.ability, entries: response.race.entries,
			}]);

		} catch (error) {
			console.error(error);
		}

	}

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
								onChange={(e) => setStatOption(e.target.value)}>
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
								type="text" placeholder="Enter a name" value={character.name}
								onChange={(e) => setCharacter((prev) => ({
									...prev,
									name: e.target.value
								}))} />

							<label htmlFor="race">Select a Race:</label>
							<select id="race"
								value={character.race}
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
								value={character.className}
								onChange={(e) => setCharacter((prev) => ({
									...prev,
									className: e.target.value
								}))}>
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
								value={character.level}
								onChange={(e) => setCharacter((prev) => ({
									...prev,
									level: e.target.value
								}))}>
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
							<button type="button" onClick={() => checkFields()}>
								Next
							</button>
						</div>

					</header></>
				<div className="scrollable-abilities">
					<div className="details-container">
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
}

export default CreateSheet;
