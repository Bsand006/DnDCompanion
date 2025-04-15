import React, { useState } from 'react';
import './Login.css'
import { login } from './services/AuthService';
import { useNavigate } from 'react-router-dom';


function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const success = await login(username, password);
			if (success) {
				console.log('Navigating to /app');
				navigate('/app');
			}
		} catch (error) {
			alert('Login failed: ' + error.message);
		}
	};

	return (
		<div className="Login">
			<header className="Login-header">
				<h1>Login</h1>
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
					<button type="button" onClick={handleLogin}>
						Login
					</button>
				</div>
			</header>
		</div>
	)
}

export default Login

