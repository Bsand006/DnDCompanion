import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import App from './components/App';
import Compendium from './components/Compendium';
import SpellLookupBook from './components/SpellLookupBook';
import CreateSheet from './components/createSheet/';


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