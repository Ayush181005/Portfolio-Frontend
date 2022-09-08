import React, { useState, useRef } from 'react';
import './ContactUs.css';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

export const ContactUs = (props) => {
  const host = process.env.REACT_APP_SERVER_HOST;
  const port = process.env.REACT_APP_SERVER_PORT;
  const { showAlert } = props;

  const recaptchaRef = useRef();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleOnChange = (e) => {setFormData({ ...formData, [e.target.name]: e.target.value })};
  const handleSubmit = async (e) => {
    e.preventDefault();

    const recaptchaToken = await recaptchaRef.current.executeAsync(); // Recaptcha token
    recaptchaRef.current.reset(); // Reset recaptcha to make it ready for another check

    const response = await fetch(`http://${host}:${port}/api/contacts/addcontact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...formData, recaptchaToken})
    });
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      document.querySelectorAll('input, textarea').forEach((element) => {element.value=''});
      showAlert('Contact Saved Successfully, I\'ll come back to you soon', 'success');
    }
    else {
      let errorMsg = ""
      jsonResponse.errors.map(error => errorMsg += error.msg + "\n");
      showAlert(errorMsg, 'error');
    }
  }

  const contactFormFocus = () => {
    document.querySelector('form input').focus();
  }

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contactInfo">
          <div className="content">
            <h1>Contact Me</h1>
            <p className='contactme-text'>Not much to write here 😅 as most of the things are in the <Link to='/about' className='about-link'>About Me</Link> page. Feel free to <span onClick={contactFormFocus} className="focusFormBtn">contact me</span>!</p>
          </div>
          <div className="box">
            <div className="text">
              <small>Phone</small>
              <p><a href="tel:+919426140218" className='contact-form-info-link'>+919426140218</a></p>
            </div>
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
