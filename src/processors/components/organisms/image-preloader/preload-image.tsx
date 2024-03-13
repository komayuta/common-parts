import * as React from "react";
import {useContext} from "react";

import {ImagePreloaderContext} from "./image-preloader-context";

export interface PreloadImageProps {
    imageKey: string;
    src?: string;
    imagesrcset?: string;
    imagesizes?: string;
}

export const PreloadImage: React.FC<PreloadImageProps> = (props) => {
    const imagePreloaderContext = useContext(ImagePreloaderContext);

    const Component = imagePreloaderContext.preloadComponent;
    if (!Component) {
        return <></>;
    }
    return <Component {...props} />;
};
