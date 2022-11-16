import React, { useContext, useEffect, useState } from 'react'
import './Portfolio.css'
import { Card } from '../CardComponent/Card'
import { Link } from 'react-router-dom'
import PortfolioContext from '../../context/portfolios/PortfolioContext'
import { Spinner } from '../SpinnerComponent/Spinner'
import { Helmet } from "react-helmet"

export const Portfolio = (props) => {
  const { setLoadingBarProgress } = props;
  const [loading, setLoading] = useState(true);

  const { portfolios, getPortfolios } = useContext(PortfolioContext);
  useEffect(() => {
    setLoadingBarProgress(50);
    getPortfolios()
      .then(() => { setLoadingBarProgress(100); setLoading(false); });
  }, []); // Get portfolios on mount

  // Add all the unique types of portfolios to an array
  const allPortfolioTypes = [];
  portfolios.forEach(portfolio => {
    if (!allPortfolioTypes.includes(portfolio.type)) {
      allPortfolioTypes.push(portfolio.type);
    }
  });

  const pageTitle = 'Portfolios - Ayush';
  const pageDesc = 'All my work in various fields, for you to see and you can surely comment, or give feedback for anything in the contact me page.';

  return (
    <section className="portfolio-section">
      <Helmet>
        {/* Ganeral tags */}
        <title>{pageTitle}</title>
        <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_URL}/portfolio`} />
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
      <div className="portfolio-container">
        <h1>Portfolio</h1>
        {loading && <Spinner />}
        {!loading && portfolios.length > 0 ? allPortfolioTypes.map((type, i) => {
          return (
            <div key={i}>
              {type ? <h2 className="text-portfolio-type">{type}</h2> : <h2 className="text-portfolio-type">Other</h2>}
              {portfolios.map((portfolio, i) => {
                if (portfolio.type === type) {
                  const base64String = btoa(new Uint8Array(portfolio.img.data.data).reduce(function (data, byte) { return data + String.fromCharCode(byte); }, ''));

                  if (portfolio.slug) {
                    // If there is a slug, then render a link to the portfolio page
                    return (
                      <Link to={`/portfolio/${portfolio.slug}`} key={i} title={portfolio.title}>
                        <Card text={portfolio.title} img_url={`data:image/png;base64,${base64String}`} />
                      </Link>
                    )
                  }
                  else {
                    // If there is no slug, then don't render a link to the portfolio page
                    return (
                      <Card key={i} text={portfolio.title} img_url={`data:image/png;base64,${base64String}`} showImg={true} />
                    )
                  }
                }
              })}
            </div>
          )
        }) : <h2>{!loading && 'No portfolios found'}</h2>}
      </div>
    </section>
  )
}
