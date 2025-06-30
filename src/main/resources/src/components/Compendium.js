import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '../css/Compendium.css';

function Compendium() {

	const navigate = useNavigate();

	const handleNavigate = (path) => {
		navigate(path);
	};

	return (
		<div className="Compendium">
			<header className="Compendium-header">
				<h1>Compendium</h1>
				<p>
					A lookup book for all your D&D needs
				</p>
				<div className="button-row">
					<button type="button" onClick={() => handleNavigate('/compendium/spells')}>Spell Lookup Book</button>
				</div>
			</header>
		</div>

	);
}

export default Compendium