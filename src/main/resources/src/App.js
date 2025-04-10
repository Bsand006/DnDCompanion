import React from 'react';
import './App.css';
import MessageComponent from './components/messageComponent';

function App() {

	const handleClick = () => {

	};

	return (

		<div className="App">
			<header className="App-header">
				<h1>D&D Companion</h1>
				<MessageComponent />
				<text />
				<p>
					The best companion app for d&d 5e
				</p>

				<button type="button" onClick={handleClick}>
					Create Sheet
				</button>

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
}

export default App;
