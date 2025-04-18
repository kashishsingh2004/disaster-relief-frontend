import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth/authSlice'; // ✅ Update the path if needed

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('victim');
    const navigate = useNavigate();
    const dispatch = useDispatch(); // ✅ Move this inside the component

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Server error: ${text}`);
            }

            const data = await response.json();
            console.log("Login response:", data);

            if (data.token) {
                if (data.role === role) {
                    // 🔥 Save to localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', data.role);

                    // ✅ Update Redux store
                    dispatch(loginSuccess({ token: data.token, role: data.role }));

                    // Navigate to role-specific dashboard
                    navigate(role === 'victim' ? '/victimdashboard' : '/orgdashboard');
                } else {
                    alert(`You are registered as a ${data.role}. Please log in with the correct role.`);
                }
            } else {
                alert(data.message || 'Login failed. Please check your credentials.');
            }

        } catch (error) {
            console.error("Login error:", error);
            alert('Something went wrong during login. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />

            <div className="role-select">
                <label>
                    <input
                        type="radio"
                        value="victim"
                        checked={role === 'victim'}
                        onChange={() => setRole('victim')}
                    />
                    Victim
                </label>
                <label>
                    <input
                        type="radio"
                        value="organization"
                        checked={role === 'organization'}
                        onChange={() => setRole('organization')}
                    />
                    Organization
                </label>
            </div>

            <button onClick={handleLogin}>Login</button>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
}

export default Login;
