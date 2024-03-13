import {ImagefrontUrl} from "@syginc/imagefront-client";

import {parseImagefrontUrl} from "../../../imagefront";

function getSizedImageUrl(imagefrontUrl: ImagefrontUrl, width: number, isWebp?: boolean) {
    return imagefrontUrl.copy({type: `s${width}`, ...(isWebp ? {ext: "webp"} : {})}).toString();
}

// TODO: Use named tuple: [url: string | undefined, descriptor: string][]
export function generateSrcSet(list: [string | undefined, string][]) {
    return list
        .filter((x) => !!x[0])
        .map((x) => `${x[0]} ${x[1]}`)
        .join(",");
}

export function optimizeImageUrl(src: string, imageWidths: number[], defaultImageWidth: number) {
    const imagefrontUrl = parseImagefrontUrl(src);
    if (!imagefrontUrl) {
        return undefined;
    }

    return {
        srcSet: generateSrcSet(
            imageWidths.map((w) => [getSizedImageUrl(imagefrontUrl, w, true), `${w}w`]),
        ),
        src: getSizedImageUrl(imagefrontUrl, defaultImageWidth),
    };
}
