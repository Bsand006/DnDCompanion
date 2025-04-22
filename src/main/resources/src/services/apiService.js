import axios from 'axios';

const API_URL = `http://localhost:8080`;

export const getSpells = async (query) => {
	try {
		const response = await axios.get(`${API_URL}/api/spells`, {
			params: { query },
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching spells:', error);
		throw error;
	}
}

export const getClass = async (className, lvl) => {
	try {
		const response = await axios.get(`${API_URL}/api/class`, {
			params: {className, lvl},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching class:', error);
		throw error;
	}
}
