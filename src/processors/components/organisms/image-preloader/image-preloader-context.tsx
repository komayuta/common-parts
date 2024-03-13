import {createContext} from "react";
import * as React from "react";

import {PreloadImageProps} from "./preload-image";

interface ImagePreloaderContextValue {
    preloadComponent?: React.ComponentType<PreloadImageProps>;
}

export const ImagePreloaderContext = createContext<ImagePreloaderContextValue>({});
