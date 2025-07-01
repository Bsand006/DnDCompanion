import React, { useState } from 'react';
import CreateSheetStage1 from './stages/CreateSheetStage1';
import CreateSheetStage2 from './stages/CreateSheetStage2';
import CreateSheetStage3 from './stages/CreateSheetStage3';
import CreateSheetStage4 from './stages/CreateSheetStage4';

function CreateSheet() {
	const [stage, setStage] = useState(1);

	const [statOption, setStatOption] = useState('standard');
	const [useAverageHP, setUseAverageHP] = useState(false);
	const [statBonus, setStatBonus] = useState([]);

	const [character, setCharacter] = useState({
		name: '',
		className: '',
		subclass: '',
		race: '',
		level: 1,
		stats: {
			str: 8,
			dex: 8,
			con: 8,
			int: 8,
			wis: 8,
			cha: 8,
		},
		equipment: [],
		abilities: [],
		hp: 0,
		hitDie: 0,
		hitDieCount: 0,
		skills: {},
		useOptionalFeatures: false, 
		useMercerContent: false,
	}
	);

	const goNext = () => setStage((s) => s + 1);
	const goBack = () => setStage((s) => s - 1, 1);

	const commonProps = {
		character,
		setCharacter,
		goNext,
		goBack,
		statOption,
		setStatOption,
		useAverageHP,
		setUseAverageHP,
		statBonus,
		setStatBonus,
	};

	switch (stage) {
		case 1:
			return <CreateSheetStage1 {...commonProps} />
		case 2:
			return <CreateSheetStage2 {...commonProps} />
		case 3:
			return <CreateSheetStage3 {...commonProps} />
		case 4:
			return <CreateSheetStage4 {...commonProps} />
	}
}

export default CreateSheet;
