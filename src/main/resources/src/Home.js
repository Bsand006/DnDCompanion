import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './css/Home.css';
import App from './App.js'

function Home() {
	const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    }
	
	return (
		<div className="Home">
		    <header className="Home-header">
                <h1>Login</h1>
                <text />
                <p>
                    Please login to continue
                </p>

                <div className="button-column">
                    <button type="button" onClick={() => handleNavigate('/login')}>Login</button>
                    <button type="button" onClick={() => handleNavigate('/signup')}>Sign Up</button>
                </div>
            </header>
		</div>
	);
}

export default Home;
