import React, { useContext, useEffect } from 'react'
import './Portfolio.css'
import { Card } from '../CardComponent/Card'
import { Link } from 'react-router-dom'
import PortfolioContext from '../../context/portfolios/PortfolioContext'

export const Portfolio = () => {
  const { portfolios, getPortfolios } = useContext(PortfolioContext);
  useEffect(() => { getPortfolios() }, []); // calls only once

  // TODO:-
  /**
   * Infinite scroll in portfolios
   * 
   * recaptcha for signin page
   */

  // Add all the unique types of portfolios to an array
  const allPortfolioTypes = [];
  portfolios.forEach(portfolio => {
    if (!allPortfolioTypes.includes(portfolio.type)) {
      allPortfolioTypes.push(portfolio.type);
    }
  });
  // Function to filter the portfolios by type
  const getPortfoliosFromType = (type) => portfolios.filter(portfolio => portfolio.type === type);

  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h1>Portfolio</h1>
        {portfolios.length > 0 ? allPortfolioTypes.map((type, i) => {
          return (
            <div key={i}>
              <h2 class="text-portfolio-type">{type}</h2>
              {getPortfoliosFromType(type).map((portfolio, i) => {
                if (portfolio.slug) {
                  // If there is a slug, then render a link to the portfolio page
                  return (
                    <Link to={`/portfolio/${portfolio.slug}`} key={i}>
                      <Card text={portfolio.title} img_url="https://www.w3schools.com/w3css/img_lights.jpg" />
                    </Link>
                  )
                }
                else {
                  // If there is no slug, then don't render a link to the portfolio page
                  return (
                    <Card key={i} text={portfolio.title} img_url="https://www.w3schools.com/w3css/img_lights.jpg" />
                  )
                }
              })}
            </div>
          )
        }) : <h2>No portfolios found</h2>}
      </div>
    </section>
  )
}
