import React, { useState } from 'react';
import '../css/Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth/authSlice'
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('victim');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            alert('Please fill all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Server error: ${text}`);
            }

            const data = await response.json();
            console.log("Signup response:", data);

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);

                // ✅ Dispatch loginSuccess
                dispatch(loginSuccess({ token: data.token, role: data.role }));

                // Redirect to correct dashboard
                navigate(role === 'victim' ? '/victimdashboard' : '/orgdashboard');
            } else {
                alert(data.message || 'Signup failed.');
            }

        } catch (error) {
            console.error("Signup error:", error);
            alert('Something went wrong during signup.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
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

            <button onClick={handleSignup}>Sign Up</button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Signup;
