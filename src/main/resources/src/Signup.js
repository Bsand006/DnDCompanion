import React, { useState } from 'react';
import './Signup.css'

function Signup() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSignup = () => {

	};

	return (
		<div className="Signup">
			<header className="Signup-header">
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
					<button type="button" onClick={handleSignup}>
						Signup
					</button>
				</div>
			</header>
		</div>
	)
}

export default Signup

