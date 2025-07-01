import React, { useState, useEffect } from 'react';
import { getBaseWeapons, getBaseArmor } from '../../../services/apiService';

function CreateSheetStage4({ character, goNext, goBack }) {

	const [selectedEquipment, setSelectedEquipment] = useState([]);
	const [startingEquipment, setStartingEquipment] = useState([]);
	const [simpleWeapons, setSimpleWeapons] = useState([]);
	const [martialWeapons, setMartialWeapons] = useState([]);


	useEffect(() => { // Fetches the list of weapons when the component mounts
		let isMounted = false;

		const getWeapons = async () => {

			if (!isMounted) {

				try {
					const simple = await getBaseWeapons('simple weapons');
					const martial = await getBaseWeapons('martial weapons');

					setSimpleWeapons(simple);
					setMartialWeapons(martial);
				} catch (error) {
					console.error('Error fetching weapons:', error);
				}
			}
		}
		
		getWeapons();

		return () => {
			isMounted = true;
		}

	}, []);

	const handleEquipmentChange = (isChecked, equipment, counterpart) => { // Handles equipment selection in starting equipment menu
		if (isChecked) {
			setSelectedEquipment((prev) => [...prev, equipment].filter((item) => item !== counterpart));
		} else {
			setSelectedEquipment((prev) => prev.filter((item) => item !== equipment));
		}
	};

	const addEquipment = () => { // Adds selected equipment to the character

	}

	return (
		<div className="CreateSheet">
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

				<button type="button" onClick={() => goNext()}>
					Next
				</button>
				<button type="button" onClick={() => goBack()}>
					Back
				</button>
			</header>
		</div>
	)

}

export default CreateSheetStage4;
