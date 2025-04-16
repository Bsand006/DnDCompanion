import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateSheet.css';

function CreateSheet() {
	const navigate = useNavigate();

	const [useAverageHP, setUseAverageHP] = useState(false)
	const [useOptionalFeatures, setUseOptionalFeatures] = useState(false)
	const [useXP, setUseXP] = useState(false)
	const [statOption, setStatOption] = useState('standard')
	const [name, setName] = useState('')
	const [Class, setClass] = useState('Artificer')
	const [level, setLevel] = useState(1)

	const handleStatOptionChange = (e) => {
		setStatOption(e.target.value);
	}

	const handleNextClick = () => {

	}

	return (
		<div className="CreateSheet">
			<div className="CreateSheet-body">

				<aside className="CreateSheet-sidebar">
					<h2>Character Sheet Options</h2>
					<ul>
						<li>
							<input
								type="checkbox"
								checked={useAverageHP}
								onChange={(e) => setUseAverageHP(e.target.checked)}
							/>
							Use Average HP?
						</li>
						<li>
							<label htmlFor="statOptions">Stat Options:</label>
							<select id="statOptions"
								value={statOption}
								onChange={handleStatOptionChange}>
								<option value="standard">Standard Array</option>
								<option value="pointBuy">Point Buy</option>
								<option value="custom">Rolled</option>
							</select>
						</li>
						<li>
							<input
								type="checkbox"
								checked={useOptionalFeatures}
								onChange={(e) => setUseOptionalFeatures(e.target.checked)}
							/>
							Use optional features?
						</li>
						<li>
							<input
								type="checkbox"
								checked={useXP}
								onChange={(e) => setUseXP(e.target.checked)}
							/>
							Use XP?
						</li>
					</ul>
				</aside>
				<header className="CreateSheet-header">
					<h1>Create a Character Sheet</h1>
					<div className="inputs-column">
						<label htmlFor="name">Enter Character Name:</label>
						<input
							type="text" placeholder="Enter a name" value={name}
							onChange={(e) => setName(e.target.value)}
						/>

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
					</ div>
				</header>
			</div >
		</div >

	)
}

export default CreateSheet;