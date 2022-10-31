import React, { useContext } from 'react';
import './Card.css';
import LazyLoad from 'react-lazy-load';
import GeneralContext from '../../context/general/GeneralContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Card = (props) => {
  let { text, img_url, extraInfo, showImg, badgeIcon } = props;
  const {setImgViewerDisplay, setImgViewerURL} = useContext(GeneralContext);

  const onClick = () => {if (showImg) {
    setImgViewerDisplay(true);
    setImgViewerURL(img_url);
  }}

  return (
    <div className="card" onClick={onClick}>
      {badgeIcon && <span className="card-badge-icon" title="Special">
        <FontAwesomeIcon icon="fa-solid fa-medal"/>
      </span>}
      {text && <div className="card-text">{text}</div>}
      <LazyLoad height={200} offset={300}>
        <img src={img_url} alt="Card item img" />
      </LazyLoad>
      {extraInfo && <div className="card-extra-info">{extraInfo}</div>}
    </div>
  )
}
