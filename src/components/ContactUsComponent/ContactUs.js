import React, { useState } from 'react'
import './ContactUs.css'
import { Link } from 'react-router-dom'

export const ContactUs = (props) => {
  /**
   * TODO:-
   * google recaptcha integration
   */

  const host = 'localhost';
  const port = '5000';
  const { showAlert } = props;

  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleOnChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://${host}:${port}/api/contacts/addcontact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      showAlert('Contact Saved Successfully, I\'ll come back to you soon', 'success');
    }
    else {
      let errorMsg = ""
      jsonResponse.errors.map(error => {
        errorMsg += error.msg + "\n";
      });
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
              <label htmlFor="form-msg">Your Message:</label>
              <textarea name="msg" id="form-msg" cols="30" rows="10" onChange={handleOnChange} placeholder='Start typing...'></textarea>
            </div>
            <div className="inputBox">
              <button type="submit" className='btn submit-btn'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
