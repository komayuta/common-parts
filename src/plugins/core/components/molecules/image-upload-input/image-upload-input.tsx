import {getAdvancedDialogStyle} from "@syginc/aqua-ckeditor-util";
import * as React from "react";
import {forwardRef, useCallback, useImperativeHandle, useRef} from "react";

import {uploadImage, UploadImageResult} from "./upload-image";

const {styled} = getAdvancedDialogStyle();
const ImageInputFile = styled("input")`
    display: none;
`;

export interface ImageUploadInputRef {
    startUpload: () => void;
}

interface ImageUploadInputProps {
    imageConvertType: string;
    onUploading?: () => void;
    onUploaded?: (uploadImageResult: UploadImageResult) => void;
}

export const ImageUploadInput = forwardRef<ImageUploadInputRef, ImageUploadInputProps>(
    function ImageUploadInput(props, ref) {
        const {onUploaded, onUploading, imageConvertType} = props;

        const fileRef = useRef<HTMLInputElement>(null);
        useImperativeHandle(ref, () => ({
            startUpload: () => {
                fileRef.current?.click();
            },
        }));

        const onClick = useCallback(() => {
            const inputFile = fileRef.current;
            if (!inputFile) {
                return;
            }

            inputFile.value = "";
            inputFile.click();
        }, []);

        const onFileChange = useCallback(async () => {
            const inputFile = fileRef.current;
            if (!inputFile || !inputFile.files) {
                return;
            }

            if (onUploading) {
                onUploading();
            }
            inputFile.disabled = true;
            const result = await uploadImage(inputFile.files[0], imageConvertType);
            if (onUploaded) {
                onUploaded(result);
            }
            inputFile.disabled = false;
        }, [onUploading, imageConvertType, onUploaded]);

        return (
            <ImageInputFile type="file" ref={fileRef} onClick={onClick} onChange={onFileChange} />
        );
    },
);
