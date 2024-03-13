import * as React from "react";

import {PreloadImage} from "../../organisms/image-preloader/preload-image";
import {optimizeImageUrl} from "./img-srcset-url";

export type ImagePriority = "high" | "auto" | "low";

interface ImageSetProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    data?: {[key: string]: string};
    src?: string;
    srcSet?: string;
    alt?: string;
    height?: string;
    width?: string;
    sizes?: string;
    ariaLabel?: string;
    optimize?: boolean;
    priority?: ImagePriority;
}

const imageWidths = [128, 384, 750, 828, 1125, 1280, 1920];
const defaultImageWidth = 750;

function getSrcSrcSetProps(optimize: boolean, src?: string, srcSet?: string) {
    if (optimize && src) {
        const optimizedSrcs = optimizeImageUrl(src, imageWidths, defaultImageWidth);
        if (optimizedSrcs) {
            return optimizedSrcs;
        }
    }

    return {src, srcSet};
}

export const ImageSet: React.FC<ImageSetProps> = (props) => {
    const {id, style, data, className, sizes, alt, priority, height, width, ariaLabel, optimize} =
        props;
    const {src, srcSet} = getSrcSrcSetProps(optimize ?? true, props.src, props.srcSet);

    return (
        <>
            <img
                id={id}
                className={className}
                style={style}
                {...data}
                src={src}
                srcSet={srcSet}
                alt={alt}
                height={height}
                width={width}
                sizes={sizes}
                loading={priority === "low" ? "lazy" : undefined}
                aria-label={ariaLabel}
            />
            {priority === "high" && (
                <PreloadImage
                    imageKey={`${src}-${srcSet}-${sizes}`}
                    src={src}
                    imagesrcset={srcSet}
                    imagesizes={sizes}
                />
            )}
        </>
    );
};
