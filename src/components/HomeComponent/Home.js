import React, { useEffect } from 'react';
import './Home.css';
import homeImg from '../../images/home-img.png';
import { Helmet } from "react-helmet";
import LazyLoad from 'react-lazy-load';

export const Home = (props) => {
  useEffect(() => { props.setLoadingBarProgress(100) }, []);

  const pageTitle = 'Its me - Ayush';
  const pageDesc = 'Websites are a way to express the art and the skills of any programmer, developer or any other person, and so is this. Here, I have all my Certificates and my Portfoliosfor you, please have a look.';

  return (
    <section className="intro-section">
      <Helmet>
        {/* Ganeral tags */}
        <title>{pageTitle}</title>
        <link rel="canonical" href={process.env.REACT_APP_DOMAIN_URL} />
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
      <div className="intro-container">
        <div className="content">
          <h1>Hi, I'm <span className="name">Ayush</span></h1>
          <small>With single 'A' 😅😁</small>
        </div>
        <div className="img-container">
          <div className="img-container-2"><div className="img-container-3">
            <LazyLoad height={298}>
              <img src={homeImg} alt="Me" className='home-img' />
            </LazyLoad>
          </div></div>
        </div>
      </div>
    </section>
  )
}
