import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

/*
AuthService 
*/

export const login = async (username, password) => {
	try {
		const response = await axios.post(`${API_URL}/login`, new URLSearchParams({ username, password }),
			{ withCredentials: true }

		);
		console.log('login success!!!!' + response.status)

		return response

	} catch (error) {

		throw new Error('Login Failed');
	}
}

export const signup = async (username, password) => {
	try {
		const response = await axios.post(`${API_URL}/signup`, new URLSearchParams({ username, password }),
			{ withCredentials: true }
		)

		return response
	} catch (error) {

		throw new Error('Signup Failed');
	}
}

export const logout = async () => {
	try {
		await axios.post(`${API_URL}/logout`);
	} catch (error) {
		throw new Error('Logout Failed');
	}
};

export const fetchProtectedResource = async () => {
	try {
		const response = await axios.get(`${API_URL}/protected`, { withCredentials: true });
		return response.data;
	} catch (error) {
		throw new Error('Access denied');
	}
}