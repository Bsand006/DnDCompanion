import React, { useState } from 'react';
import './Login.css'

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {

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

