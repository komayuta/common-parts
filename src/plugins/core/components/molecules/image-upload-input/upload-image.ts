import {getImagefrontClient} from "../../../utils/imagefront-util";

function preloadImage(url: string) {
    return new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve();
        };
        image.onerror = () => {
            reject(new Error("Failed to download an image."));
        };
        image.src = url;
    });
}

export interface UploadImageResultSuccess {
    status: "success";
    url: string;
}

export interface UploadImageResultError {
    status: "error";
    error: Error;
}

export type UploadImageResult = UploadImageResultSuccess | UploadImageResultError;

export async function uploadImage(
    file: File,
    imageConvertType: string,
): Promise<UploadImageResult> {
    try {
        const imagefront = await getImagefrontClient();
        const url = await imagefront.upload(file);
        const urlTyped = url.copy({ext: "jpg", type: imageConvertType}).toString();
        await preloadImage(urlTyped);
        return {
            status: "success",
            url: urlTyped,
        };
    } catch (e) {
        return {
            status: "error",
            error: e as Error,
        };
    }
}
