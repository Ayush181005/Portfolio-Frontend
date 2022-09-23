import React, { useEffect } from 'react';
import './Home.css';
import homeImg from '../../images/home-img.png';
import { Helmet } from "react-helmet";
import LazyLoad from 'react-lazy-load';

export const Home = (props) => {
  useEffect(() => { props.setLoadingBarProgress(100) }, []);

  return (
    <section className="intro-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Its me - Ayush</title>
        <link rel="canonical" href={process.env.REACT_APP_DOMAIN_URL} />
        <meta name="description" content="This is my portfolio website, I would be pleased if you explore the website." />
      </Helmet>
      <div className="intro-container">
        <div className="content">
          <h1>Hi, I'm <span className="name">Ayush</span></h1>
          <small>With single 'A' 😅😁</small>
        </div>
        <div className="img-container">
          <div className="img-container-2"><div className="img-container-3">
            <LazyLoad>
              <img src={homeImg} alt="Me" className='home-img' />
            </LazyLoad>
          </div></div>
        </div>
      </div>
    </section>
  )
}
