import React, {useContext} from 'react';
import GeneralContext from '../../context/general/GeneralContext';
import './ImgDisplay.css';

export const ImgDisplay = (props) => {
  const {imgViewerDisplay, setImgViewerDisplay, imgViewerURL} = useContext(GeneralContext);
  const onClose = () => {setImgViewerDisplay(false)}

  return (
    <>
    {imgViewerDisplay &&
      <div class="image-viewer-container">
        <img src={imgViewerURL} alt="Viewer" />
        <button className="btn btn-sm" onClick={onClose}>Close</button>
      </div>
    }
    </>
  )
}
