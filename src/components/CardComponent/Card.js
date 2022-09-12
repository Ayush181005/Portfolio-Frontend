import React from 'react';
import './Card.css';

export const Card = (props) => {
  let { text, img_url, extraInfo } = props;
  return (
    <div className={`card ${!extraInfo && 'bottomRounded'}`}>
      <img src={img_url} alt="Hello, World" />
      {text && <div className="card-text">{text}</div>}
      {extraInfo && <div className="card-extra-info">{extraInfo}</div>}
    </div>
  )
}
