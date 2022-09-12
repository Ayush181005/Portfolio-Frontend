import React from 'react';
import './Home.css';
import homeImg from '../../images/home-img.png'

export const Home = () => {
  return (
    <div className='home-container'>
        <div className="img-container"><div className="img-container-2"><img src={homeImg} alt="Me" className='home-img'/></div></div>
    </div>
  )
}
