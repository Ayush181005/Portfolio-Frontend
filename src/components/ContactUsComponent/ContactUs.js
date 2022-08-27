import React from 'react'
import './ContactUs.css'
import { Link } from 'react-router-dom'

export const ContactUs = () => {
  /**
   * TODO:-
   * make frontend
   * make backend
   * google recaptcha integration
   */

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
          <form>
            <h2>Can't wait to see your message!</h2>
            <div className="inputBox">
              <label htmlFor="form-name">Name</label>
              <input type="text" name='name' id='form-name' placeholder='Your Name please' required />
            </div>
            <div className="inputBox">
              <label htmlFor="form-email">Email</label>
              <input type="email" name='email' id='form-email' placeholder='Your Email here' required />
            </div>
            <div className="inputBox">
              <label htmlFor="form-message">Your Message:</label>
              <textarea name="message" id="form-message" cols="30" rows="10" placeholder='Start typing...'></textarea>
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
