import React from 'react';
import './Home.css';
import homeImg from '../../images/home-img.png'

export const Home = () => {
  return (
    <section className="intro-section">
      <div className="intro-container">
        <div className="content">
          <h1>Hi, I'm <span className="name">Ayush</span></h1>
          <small>With single 'A' 😅😁</small>
        </div>
        <div className="img-container">
          <div className="img-container-2"><div className="img-container-3"><img src={homeImg} alt="Me" className='home-img' /></div></div>
        </div>
      </div>
    </section>
  )
}
