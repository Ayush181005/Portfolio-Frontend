import React, { useContext } from 'react';
import './Card.css';
import LazyLoad from 'react-lazy-load';
import GeneralContext from '../../context/general/GeneralContext';

export const Card = (props) => {
  let { text, img_url, extraInfo, showImg } = props;
  const {setImgViewerDisplay, setImgViewerURL} = useContext(GeneralContext);

  const onClick = () => {if (showImg) {
    setImgViewerDisplay(true);
    setImgViewerURL(img_url);
  }}

  return (
    <div className="card" onClick={onClick}>
      {text && <div className="card-text">{text}</div>}
      <LazyLoad height={200} offset={300}>
        <img src={img_url} alt="Card item img" />
      </LazyLoad>
      {extraInfo && <div className="card-extra-info">{extraInfo}</div>}
    </div>
  )
}
