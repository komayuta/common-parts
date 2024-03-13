import {getAdvancedDialogStyle, TextInput} from "@syginc/aqua-ckeditor-util";
import {useCallback} from "react";
import * as React from "react";

import {ImageUploadButton} from "../../../../editor/core/components/molecules/image-upload-button/image-upload-button";
import {UploadImageResult} from "../../../../editor/core/components/molecules/image-upload-input/upload-image";

const {styled} = getAdvancedDialogStyle();

const InputBoxDiv = styled("div")`
    display: grid;
    grid-template-columns: 1fr 100px;
`;

export interface ImageUrlInputProps {
    value?: string;
    onChangeValue?: (v: string) => void;
}

export const ImageUrlInput: React.FC<ImageUrlInputProps> = ({value, onChangeValue}) => {
    const handleImageUploaded = useCallback(
        (uploadImageResult: UploadImageResult) => {
            if (uploadImageResult.status === "success") {
                onChangeValue?.(uploadImageResult.url);
            }
        },
        [onChangeValue],
    );

    return (
        <InputBoxDiv>
            <TextInput value={value} onChangeValue={onChangeValue} />
            <ImageUploadButton onUploaded={handleImageUploaded} />
        </InputBoxDiv>
    );
};
