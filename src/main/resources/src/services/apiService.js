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
		const response = await axios.get(`${API_URL}/races`, {
			withCredentials: true,
			params: { sourcelist: sources },
			paramsSerializer: params => {
			    return params.sourcelist.map(source => `sourcelist=${encodeURIComponent(source)}`).join('&');
			  }
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching races:', error);
	}
}

export const getRace = async (raceName, source) => {
	try {
		const response = await axios.get(`${API_URL}/race`, {
            withCredentials: true,
            params: { raceName, source },
        });
		return response.data;
	} catch (error) {
		console.error('Error fetching race: ', error);
		throw error;
	}
}
