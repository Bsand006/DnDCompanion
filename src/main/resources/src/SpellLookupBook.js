import React, { useState } from 'react';
import './SpellBook.css'
import { getSpells } from './services/apiService';

function SpellLookupBook() {

	const [searchQuery, setSearchQuery] = useState('');

	const handleKeyDown = async (event) => {
		if (event.key === 'Enter') {
			try {
				const spells = await getSpells(searchQuery);
				console.log(spells);
				setSearchQuery('');
			} catch (error) {
				console.error('Error fetching spells:', error);
			}
		}
	}

	return (
		<div className="spell-lookup-book">
			<header className="spell-lookup-book-header">
				<h1>Spell Lookup Book</h1>
				<p>Welcome to the Spell Lookup Book!</p>
				<p>Use the search bar to find spells by name.</p>
				<input
					type="text" placeholder="Search for a spell..." value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyDown={handleKeyDown}
					className="search-bar"
				/>
			</header>

		</div>
	)

}

export default SpellLookupBook;
