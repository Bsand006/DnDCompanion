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

export const getSubclass = async (className, level, subclass) => {
	try {
		const response = await axios.get(`${API_URL}/subclass`, {
			params: { className, level, subclass },
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching subclass:', error);
		throw error;
	}
}

export const getBaseItems = async (query) => {
	try {
		const response = await axios.get(`${API_URL}/base-items`, {
			params: { query },
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching base items:', error);
		throw error;
	}
}



export const getBaseWeapons = async (category) => {
	try {
        const response = await axios.get(`${API_URL}/base-weapons`, {
            params: { category },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching items by category:', error);
        throw error;
    }
}

export const getBaseArmor = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/base-armor`, {
            params: { query },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching items by category:', error);
        throw error;
    }
}

export const getBackgrounds = async (query) => {
	try {
		const response = await axios.get(`${API_URL}/backgrounds`, {
			params: { query },
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching backgrounds:', error);
		throw error;
	}
}

export const getFeats = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/feats`, {
            params: { query },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching feats:', error);
        throw error;
    }
}

export const submitCharacter = async (payload) => {
	try {
		const response = await axios.post(`${API_URL}/save-character`, payload, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error submitting character:', error);
		throw error;
	}
}
