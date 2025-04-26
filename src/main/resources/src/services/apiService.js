import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getSpells = async (query) => {
	try {
		const response = await axios.get(`${API_URL}/spells`, {
			params: { query },
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching spells:', error);
		throw error;
	}
}

export const getClass = async (className, level) => {
	try {
		const response = await axios.get(`${API_URL}/class`, {
			params: { className, level },
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching class:', error);
		throw error;
	}
}

export const getRaces = async (sources) => {
	try {
		const response = await axios.get(`${API_URL}/race`, {
			params: { sources },
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching races:', error);
	}
}
