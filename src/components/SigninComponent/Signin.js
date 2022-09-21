import React, { useState, useEffect, useRef } from 'react';
import './Signin.css';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

export const Signin = (props) => {
    const baseURL = process.env.REACT_APP_SERVER_BASE_URL;
    const { showAlert } = props;

    const recaptchaRef = useRef();

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

        const recaptchaToken = await recaptchaRef.current.executeAsync(); // Recaptcha token
        recaptchaRef.current.reset(); // Reset recaptcha to make it ready for another check

        const response = await fetch(`${baseURL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...loginCredentials, recaptchaToken})
        });
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
            localStorage.setItem('auth-token', jsonResponse.authToken);
            showAlert('Successfully Logged In', 'success');
            navigate('/'); // Redirect to home page
            window.location.reload();
        }
        else {
            let errorMsg = ""
            jsonResponse.errors.forEach(error => {
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

        const recaptchaToken = await recaptchaRef.current.executeAsync(); // Recaptcha token
        recaptchaRef.current.reset(); // Reset recaptcha to make it ready for another check

        const { name, email, password, passwordCheck } = signupCredentials;
        if (password !== passwordCheck) {
            showAlert("Passwords do not match", "error");
            return;
        }
        const response = await fetch(`${baseURL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, recaptchaToken })
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.success) {
            localStorage.setItem('auth-token', jsonResponse.authToken);
            showAlert('Account Created Successfully and logged in!', 'success');
            navigate('/'); // Redirect to home page
            window.location.reload();
        }
        else {
            let errorMsg = ""
            jsonResponse.errors.forEach(error => {
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
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            size="invisible"
                            ref={recaptchaRef}
                        />
                        <button type='submit'>Sign up</button>
                    </form>
                </div>

                <div className="login" onSubmit={handleLoginSubmit}>
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type='email' name='email' value={loginCredentials.loginEmail} onChange={onLoginChange} placeholder='Email' required />
                        <input type='password' name='password' value={loginCredentials.loginPassword} onChange={onLoginChange} placeholder='Password' required />
                        <button type='submit'>Login</button>
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            size="invisible"
                            ref={recaptchaRef}
                        />
                    </form>
                </div>
            </div>
        </section>
    )
}