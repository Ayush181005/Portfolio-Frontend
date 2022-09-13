import React, { useContext, useEffect, useState } from 'react'
import './Portfolio.css'
import { Card } from '../CardComponent/Card'
import { Link } from 'react-router-dom'
import PortfolioContext from '../../context/portfolios/PortfolioContext'
import { Spinner } from '../SpinnerComponent/Spinner'

export const Portfolio = (props) => {
  const { setLoadingBarProgress } = props;
  const [loading, setLoading] = useState(true);

  const { portfolios, getPortfolios } = useContext(PortfolioContext);
  useEffect(() => {
    setLoadingBarProgress(50);
    getPortfolios()
    .then(()=>{setLoadingBarProgress(100);setLoading(false);});
  }, []); // Get portfolios on mount
  
  // Add all the unique types of portfolios to an array
  const allPortfolioTypes = [];
  portfolios.forEach(portfolio => {
    if (!allPortfolioTypes.includes(portfolio.type)) {
      allPortfolioTypes.push(portfolio.type);
    }
  });

  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h1>Portfolio</h1>
        {loading && <Spinner />}
        {!loading && portfolios.length>0 ? allPortfolioTypes.map((type, i) => {
          return (
            <div key={i}>
              {type ? <h2 className="text-portfolio-type">{type}</h2> : <h2 className="text-portfolio-type">Other</h2>}
              {portfolios.map((portfolio, i) => {
                if (portfolio.type === type) {
                  const base64String = btoa(new Uint8Array(portfolio.img.data.data).reduce(function (data, byte) {return data + String.fromCharCode(byte);}, ''));

                  if (portfolio.slug) {
                    // If there is a slug, then render a link to the portfolio page
                    return (
                      <Link to={`/portfolio/${portfolio.slug}`} key={i} title={portfolio.title}>
                        <Card text={portfolio.title} img_url={`data:image/png;base64,${base64String}`}/>
                      </Link>
                    )
                  }
                  else {
                    // If there is no slug, then don't render a link to the portfolio page
                    return (
                      <Card key={i} text={portfolio.title} img_url={`data:image/png;base64,${base64String}`} />
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
