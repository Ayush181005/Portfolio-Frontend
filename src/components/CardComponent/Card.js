import React from 'react';
import './Card.css';
import LazyLoad from 'react-lazy-load';

export const Card = (props) => {
  let { text, img_url, extraInfo } = props;
  return (
    <div className={`card ${!extraInfo && 'bottomRounded'}`}>
      <LazyLoad height={200} offset={300}>
        <img src={img_url} alt="Card item img" />
      </LazyLoad>
      {text && <div className="card-text">{text}</div>}
      {extraInfo && <div className="card-extra-info">{extraInfo}</div>}
    </div>
  )
}
