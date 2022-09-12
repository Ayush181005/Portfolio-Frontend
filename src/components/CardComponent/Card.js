import React from 'react'
import './Card.css'

export const Card = (props) => {
  let { text, img_url } = props;
  return (
    <div className="portfolio-card">
        <img src={img_url} alt="Hello, World" />
        {text && <div className="portfolio-text">{text}</div>}
    </div>
  )
}
