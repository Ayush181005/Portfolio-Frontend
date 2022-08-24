import React from 'react';
import { useState } from 'react';
import './Signin.css';
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
    const host = 'localhost';
    const port = '5000';

    const [loginCredentials, setLoginCredentials] = useState({email:'', password:''});

    const navigate = useNavigate(); // useNavigate hook for redirecting

    const onLoginChange = (e) => setLoginCredentials({...loginCredentials, [e.target.name]: e.target.value});

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
            navigate('/'); // Redirect to home page
        }
        else {
            alert("Invalid credentials");
        }
    }

    return (
        <section className='loginSection'>
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />
                <div className="signup">
                    <form action={`http://${host}:${port}/api/auth/signup`} method="post">
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name='name' placeholder='Name' required />
                        <input type="email" name='email' placeholder='Email' required />
                        <input type="password" name='password' placeholder='Password' required />
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