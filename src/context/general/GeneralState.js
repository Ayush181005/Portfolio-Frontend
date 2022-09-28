import { useState } from "react";
import GeneralContext from './GeneralContext';

const GeneralState = (props) => {
    const [imgViewerDisplay, setImgViewerDisplay] = useState(false);
    const [imgViewerURL, setImgViewerURL] = useState('');
    return (
        <GeneralContext.Provider value={{
            imgViewerDisplay,
            setImgViewerDisplay,
            imgViewerURL,
            setImgViewerURL
        }}>
            {props.children}
        </GeneralContext.Provider>
    );
}

export default GeneralState;