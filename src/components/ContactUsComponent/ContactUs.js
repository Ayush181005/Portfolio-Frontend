import React from 'react'
import './ContactUs.css'

export const ContactUs = () => {
  /**
   * TODO:-
   * make frontend
   * make backend
   * google recaptcha integration
   */
  return (
    <section className="contact">
      <div className="container">
        <div className="contactInfo">
          <div className="content">
            <h1>Contact Me</h1>
            <p className='contactme-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, corporis explicabo obcaecati neque, earum quisquam beatae dolore necessitatibus voluptate cumque tempore eius architecto, amet reiciendis! Provident incidunt eaque adipisci voluptate?</p>
          </div>
          <div className="box">
            <div className="text">
              <small>Address</small>
              <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
            </div>
          </div>
          <div className="box">
            <div className="text">
              <small>Phone</small>
              <p>Lorem.</p>
            </div>
          </div>
          <div className="box">
            <div className="text">
              <small>Email</small>
              <p>Lorem.</p>
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
              <button type="submit" className='submit-btn'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
