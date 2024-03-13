import * as React from "react";

import {ImagePreloaderContext} from "./image-preloader-context";
import {PreloadImageProps} from "./preload-image";

interface ImagePreloaderProps {
    preloadComponent: React.ComponentType<PreloadImageProps>;
}

export const ImagePreloader: React.FC<ImagePreloaderProps> = ({preloadComponent, children}) => {
    return (
        <ImagePreloaderContext.Provider value={{preloadComponent}}>
            {children}
        </ImagePreloaderContext.Provider>
    );
};
