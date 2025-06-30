import React, { useState } from 'react';
import '../css/SpellBook.css'
import { getSpells } from '../services/apiService';

// This function is used to display the spell description in a collapsible format

function SpellDescription({ description }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div>
			<button onClick={() => setIsExpanded(!isExpanded)}>
				{isExpanded ? 'Hide Description' : 'Show Description'}
			</button>
			{isExpanded && <p>{description}</p>}
		</div>
	)
	
}

function SpellLookupBook() {

	const [searchQuery, setSearchQuery] = useState('');
	const [spells, setSpells] = useState([]); // State to store fetched spells


	const handleKeyDown = async (event) => {
		if (event.key === 'Enter') {
			try {
				const fetchedspells = await getSpells(searchQuery);
				setSpells(fetchedspells); // Update spells state
				setSearchQuery('');
			} catch (error) {
				console.error('Error fetching spells:', error);
			}
		}
	}

	console.log(spells);

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

				<main>
					{spells.length > 0 && (
						<table className="data-table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Level</th>
									<th>School</th>
									<th>Components</th>
									<th>Casting Time</th>
									<th>Range</th>
									<th>Duration</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{
									spells.map((spell, index) => (
										<tr key={index}>
											<td>{spell.name}</td>
											<td>{spell.level}</td>
											<td>{spell.school}</td>
											<td>
												{typeof spell.components === 'object'
													? Object.keys(spell.components)
														.filter(key => spell.components[key])
														.map(key => key === 'm' && typeof spell.components[key] === 'string'
															? `${key}(${spell.components[key]})`
															: key)
														.join(',')
													: spell.components}
											</td>
											<td> {spell.time.map((timeObj, idx) =>
												<span key={idx}>
													{timeObj.unit}
													{index < spell.time.length - 1 ? ', ' : ''}
												</span>
											)}</td>

											<td>{spell.range && spell.range.distance
												? spell.range.distance.type === 'feet'
													? `${spell.range.distance.amount} ${spell.range.distance.type}`
													: spell.range.distance.type
												: 'N/A'}</td>


											<td>{spell.duration.map((durationObj, idx) =>
												<span key={idx}>
													{durationObj.type === 'timed'
														? `${durationObj.duration.amount} ${durationObj.duration.type}`
														: durationObj.type}
													{index < spell.duration.length - 1 ? ', ' : ''}
												</span>
											)}</td>
											<td>
                                                <SpellDescription description={spell.entries.join(',')} />
											</td>
										</tr>
									))}
							</tbody>
						</table>
					)}
				</main>
			</header>
		</div>


	)
}
export default SpellLookupBook;
