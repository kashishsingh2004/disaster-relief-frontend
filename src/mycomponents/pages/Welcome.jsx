// src/mycomponents/pages/Welcome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/welcome.css'; // Corrected CSS path

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <nav className="welcome-nav">
                <span>Welcome</span>
            </nav>
            <div className="welcome-content">
                <img src="https://picsum.photos/100" alt="Helper Icon" className="welcome-icon" />
                <div className="welcome-text">
                    <h1>Welcome page</h1>
                    <h1>DisasterSync</h1>
                    <p>Real-time disaster relief coordination platform</p>
                    <div className="welcome-buttons">
                        <button className="btn btn-get-started" onClick={() => navigate('/home')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
