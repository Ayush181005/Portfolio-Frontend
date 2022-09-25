import React, { useState, useRef, useEffect } from 'react';
import './ContactUs.css';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';

export const ContactUs = (props) => {
  const baseURL = process.env.REACT_APP_SERVER_BASE_URL;
  const { showAlert, setLoadingBarProgress } = props;

  useEffect(() => { props.setLoadingBarProgress(100) }, []);

  const recaptchaRef = useRef();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleOnChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingBarProgress(0);
    const recaptchaToken = await recaptchaRef.current.executeAsync(); // Recaptcha token
    recaptchaRef.current.reset(); // Reset recaptcha to make it ready for another check
    setLoadingBarProgress(20);
    const response = await fetch(`${baseURL}/api/contacts/addcontact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...formData, recaptchaToken })
    });
    setLoadingBarProgress(70);
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      document.querySelectorAll('input, textarea').forEach((element) => { element.value = '' });
      showAlert('Contact Saved Successfully, I\'ll come back to you soon', 'success');
    }
    else {
      let errorMsg = ""
      jsonResponse.errors.map(error => errorMsg += error.msg + "\n");
      showAlert(errorMsg, 'error');
    }
    setLoadingBarProgress(100);
  }

  const contactFormFocus = () => {
    document.querySelector('form input').focus();
  }

  const pageTitle = 'Contact Me - Ayush';
  const pageDesc = 'Please give your valuable message using the contact me form!';

  return (
    <section className="contact-section">
      <Helmet>
        {/* Ganeral tags */}
        <title>{pageTitle}</title>
        <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_URL}/contact`} />
        <meta name="description" content={pageDesc} />

        {/* OpenGraph tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@Ayush181005" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
      </Helmet>
      <div className="container">
        <div className="contactInfo">
          <div className="content">
            <h1>Contact Me</h1>
            <p className='contactme-text'>Not much to write here 😅 as most of the things are in the <Link to='/about' className='about-link'>About Me</Link> page. Feel free to <span onClick={contactFormFocus} className="focusFormBtn">contact me</span>!</p>
          </div>
          <div className="box">
            <div className="text">
              <small>Email</small>
              <p><a href="mailto:ayush.s181005@gmail.com" className='contact-form-info-link'>ayush.s181005@gmail.com</a></p>
            </div>
          </div>
        </div>
        <div className="contactForm">
          <form onSubmit={handleSubmit}>
            <h2>Can't wait to see your message!</h2>
            <div className="inputBox">
              <label htmlFor="form-name">Name</label>
              <input type="text" name='name' id='form-name' placeholder='Your Name please' onChange={handleOnChange} required />
            </div>
            <div className="inputBox">
              <label htmlFor="form-email">Email</label>
              <input type="email" name='email' id='form-email' placeholder='Your Email here' onChange={handleOnChange} required />
            </div>
            <div className="inputBox">
              <label htmlFor="form-msg">Your Message:{process.env.REACT_APP_SAMPLE}</label>
              <textarea name="msg" id="form-msg" cols="30" rows="10" onChange={handleOnChange} placeholder='Start typing...'></textarea>
            </div>

            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              size="invisible"
              ref={recaptchaRef}
            />

            <div className="inputBox">
              <button type="submit" className='btn submit-btn'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
