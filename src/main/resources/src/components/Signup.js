import React, { useState } from 'react';
import { signup } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css'

/*
	Function component to handle user registrations.
*/

function Signup() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();

		if (username === '' || password === '' || confirmPassword === '') { // Check if any field is empty
			alert('Please fill in all fields.');
			return;
		}

		if (password !== confirmPassword) { // Check if passwords match
			alert('Passwords do not match.');
		}

		try {
			const response = await signup(username, password);

			if (response.status === 400) {
				alert('Username already exists. Please choose a different username.');
			} else if (response) {
				navigate('/login');
			}
		} catch (error) {
			alert('Signup failed:', error);
		}
	};

	return (
		<div className="Signup">
			<header className="Signup-header">
				<h1>Sign Up</h1>
				<div>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Confirm Password"
						value={password}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div>
					<button type="button" onClick={handleSignup}>
						Signup
					</button>
				</div>
			</header>
		</div>
	);
}

export default Signup
