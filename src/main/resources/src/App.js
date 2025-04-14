import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './Compendium.css';


function App() {
	const navigate = useNavigate();

	const handleNavigate = (path) => {
		navigate(path);
	}

	return (

		<div className="App">
			<header className="App-header">
				<h1>D&D Companion</h1>
				<text />
				<p>
					The best companion app for d&d 5e
				</p>

				<div className="button-row">
					<button type="button" onClick={() => handleNavigate('/create-sheet')}>Create sheet</button>
					<button type="button" onClick={() => handleNavigate('/open-sheet')}>Open sheet</button>
					<button type="button" onClick={() => handleNavigate('/compendium')}>Compendium</button>
				</div>

				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
				</a>
			</header>
		</div>
	);
};

function CreateSheet() {
	return <h2>Create Sheet Page</h2>;
}

function OpenSheet() {
	return <h2>Open Sheet Page</h2>;
}



export default App;
