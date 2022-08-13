import React from 'react'
import './Portfolio.css'
import { Card } from '../CardComponent/Card'
import { Link } from 'react-router-dom'

export const Portfolio = () => {
  return (
    <section className="portfolio-section">
        <div className="portfolio-container">
            <h1>Portfolio</h1>
            <Link to="/portfolio/art">
              <Card text="Art" img_url="https://www.w3schools.com/w3css/img_lights.jpg" />
            </Link>
            <Link to="#">
              <Card />
            </Link>
        </div>
    </section>
  )
}
