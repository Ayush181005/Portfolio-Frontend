import React, { useContext, useEffect } from 'react'
import './Portfolio.css'
import { Card } from '../CardComponent/Card'
import { Link } from 'react-router-dom'
import PortfolioContext from '../../context/portfolios/PortfolioContext'

export const Portfolio = () => {
  const { portfolios, getPortfolios } = useContext(PortfolioContext);
  useEffect(() => {getPortfolios()}, []); // calls only once

  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
          <h1>Portfolio</h1>
          {portfolios.length!=0 ? portfolios.map((portfolio, i) => {
            if (portfolio.slug) {
              // If there is a slug, then render a link to the portfolio page
              return(
                <Link to={`/portfolio/${portfolio.slug}`} key={i}>
                  <Card text={portfolio.title} img_url="https://www.w3schools.com/w3css/img_lights.jpg" />
                </Link>
              )
            }
            else {
              // If there is no slug, then don't render a link to the portfolio page
              return(
                <Card key={i} text={portfolio.title} img_url="https://www.w3schools.com/w3css/img_lights.jpg" />
              )
            }
          }) : <h2>No Portfolios found :(</h2>}
      </div>
    </section>
  )
}
