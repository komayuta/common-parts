import {Button, getAdvancedDialogStyle} from "@syginc/aqua-ckeditor-util";
import * as React from "react";
import {useCallback, useRef, useState} from "react";

import {IMAGE_CONVERT_TYPE_GENERAL_CONTENT_IMAGE} from "../../../../../common/imagefront";
import {ImageUploadInput, ImageUploadInputRef} from "../image-upload-input/image-upload-input";
import {UploadImageResult} from "../image-upload-input/upload-image";

const {styled} = getAdvancedDialogStyle();

const StyledButton = styled(Button)`
    min-width: 90px;
`;

const UploadStatusUploading = styled("span")`
    display: inline-block;
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    font-size: 4px;
    position: relative;
    border-top: 1.1em solid rgba(0, 0, 0, 0.2);
    border-right: 1.1em solid rgba(0, 0, 0, 0.2);
    border-bottom: 1.1em solid rgba(0, 0, 0, 0.2);
    border-left: 1.1em solid #ffffff;
    transform: translateZ(0);
    animation: load8 1.1s infinite linear;
    @keyframes load8 {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

type ImageUploadStatus = "normal" | "uploading" | "error";

export interface ImageUploadButtonProps {
    imageConvertType?: string;
    onUploading?: () => void;
    onUploaded?: (uploadImageResult: UploadImageResult) => void;
}

export const ImageUploadButton: React.VFC<ImageUploadButtonProps> = ({
    imageConvertType,
    onUploading,
    onUploaded,
}) => {
    const imageInputRef = useRef<ImageUploadInputRef>(null);

    const [status, setStatus] = useState<ImageUploadStatus>("normal");

    const onSelectButtonClick = useCallback(() => {
        imageInputRef.current?.startUpload();
    }, []);

    const onInputUploading = useCallback(() => {
        setStatus("uploading");
        onUploading?.();
    }, [onUploading]);

    const onInputUploaded = useCallback(
        (result: UploadImageResult) => {
            if (result.status === "success") {
                setStatus("normal");
                onUploaded?.(result);
            } else {
                console.error(result.error);
                setStatus("error");
            }
        },
        [onUploaded],
    );

    return (
        <>
            <StyledButton onClick={onSelectButtonClick} disabled={status !== "normal"}>
                {status === "uploading" ? <UploadStatusUploading /> : "アップロード"}
            </StyledButton>
            <ImageUploadInput
                ref={imageInputRef}
                onUploading={onInputUploading}
                onUploaded={onInputUploaded}
                imageConvertType={imageConvertType ?? IMAGE_CONVERT_TYPE_GENERAL_CONTENT_IMAGE}
            />
        </>
    );
};
