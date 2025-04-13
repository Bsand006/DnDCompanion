import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import App from './App';
import Compendium from './App';
import SpellLookupBook from './SpellLookupBook';


function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/home" element={<App />} />
				<Route path="/home/compendium" element={<Compendium />} />
				<Route path="/home/compendium/spells" element={<SpellLookupBook />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;