import React from 'react';
import { useState, useEffect } from 'react';
import './Signin.css';
import { useNavigate } from 'react-router-dom';

export const Signin = (props) => {
    const host = 'localhost';
    const port = '5000';
    const { showAlert } = props;

    const navigate = useNavigate(); // useNavigate hook for redirecting

    useEffect(() => {
        // if user is already logged in, redirect to home page
        if (localStorage.getItem('auth-token')) {
            showAlert('Access Denied, already logged in', 'error');
            navigate('/');
        }
    }, []);

    // Login Part
    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
    const onLoginChange = (e) => setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://${host}:${port}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCredentials)
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
            localStorage.setItem('auth-token', jsonResponse.authToken);
            showAlert('Successfully Logged In', 'success');
            navigate('/'); // Redirect to home page
        }
        else {
            let errorMsg = ""
            jsonResponse.errors.map(error => {
                errorMsg += error.msg + "\n";
            });
            showAlert(errorMsg, 'error');
        }
    }

    // Signup Part
    const [signupCredentials, setSignupCredentials] = useState({ name: '', email: '', password: '', passwordCheck: '' });
    const onSignupChange = (e) => setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, passwordCheck } = signupCredentials;
        if (password !== passwordCheck) {
            showAlert("Passwords do not match", "error");
            return;
        }
        const response = await fetch(`http://${host}:${port}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.success) {
            localStorage.setItem('auth-token', jsonResponse.authToken);
            showAlert('Account Created Successfully and logged in!', 'success');
            navigate('/'); // Redirect to home page
        }
        else {
            let errorMsg = ""
            jsonResponse.errors.map(error => {
                errorMsg += error.msg + "\n";
            });
            showAlert(errorMsg, 'error');
        }
    }

    return (
        <section className='loginSection'>
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />
                <div className="signup">
                    <form onSubmit={handleSignupSubmit}>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name='name' onChange={onSignupChange} placeholder='Name' minLength={3} required />
                        <input type="email" name='email' onChange={onSignupChange} placeholder='Email' required />
                        <input type="password" name='password' onChange={onSignupChange} placeholder='Password' minLength={5} required />
                        <input type="password" name='passwordCheck' onChange={onSignupChange} placeholder='Confirm Password' minLength={5} required />
                        <button type='submit'>Sign up</button>
                    </form>
                </div>

                <div className="login" onSubmit={handleLoginSubmit}>
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type='email' name='email' value={loginCredentials.loginEmail} onChange={onLoginChange} placeholder='Email' required />
                        <input type='password' name='password' value={loginCredentials.loginPassword} onChange={onLoginChange} placeholder='Password' required />
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </section>
    )
}