import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import App from './App';
import Compendium from './Compendium';
import SpellLookupBook from './SpellLookupBook';
import CreateSheet from './CreateSheet';


function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/app" element={<App />} />
				<Route path="compendium" element={<Compendium />} />
				<Route path="compendium/spells" element={<SpellLookupBook />} />
				<Route path ="create-sheet" element={<CreateSheet />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;