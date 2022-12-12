import React, {useContext} from 'react';
import GeneralContext from '../../context/general/GeneralContext';
import './ImgDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ImgDisplay = (props) => {
  const {imgViewerDisplay, setImgViewerDisplay, imgViewerURL} = useContext(GeneralContext);
  const onClose = () => {setImgViewerDisplay(false)}

  return (
    <>
    {imgViewerDisplay &&
      <div className="image-viewer-container">
        <img src={imgViewerURL} alt="Viewer" />
        <FontAwesomeIcon icon="fa-solid fa-xmark" className="close-icon" onClick={onClose}/>
      </div>
    }
    </>
  )
}
