import React, { useState, useEffect } from 'react';
import CreateSheetStage1 from './stages/CreateSheet-stage1';
import CreateSheetStage2 from './stages/CreateSheetStage2';
import CreateSheetStage3 from './stages/CreateSheetStage3';

function CreateSheet() {
	const [stage, setStage] = useState(1);
	
	const [character, setCharacter] = useState({
		name: '',
		race: '',
		level: 1, 
		stats: {
			strength: 8,
			dexterity: 8,
			constitution: 8,
			intelligence: 8,
			wisdom: 8,
			charisma: 8,
		},
		equipment: [],
		abilities: [],
		hp: 0,
		}
	);
	
	const goNext = () => setStage((s) => s + 1);
	const goBack = () => setStage((s) => s - 1, 1);
	
	const commonProps = {
		character, 
		setCharacter,  
		goNext, 
		goBack,
	};
	
	switch (stage) {
		case 1:
			return <CreateSheetStage1 {...commonProps}/>
		case 2:
			return <CreateSheetStage2 {...commonProps}/>
		case 3:
			return <CreateSheetStage3 {...commonProps}/>
	}
	
}

export default CreateSheet;
