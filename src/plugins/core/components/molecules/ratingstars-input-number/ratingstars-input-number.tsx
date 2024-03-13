import {getAdvancedDialogStyle, useAdvancedDialogFocusRef} from "@syginc/aqua-ckeditor-util";
import * as React from "react";
import {InputHTMLAttributes} from "react";
import mergeRefs from "react-merge-refs";

const {styled} = getAdvancedDialogStyle();

const RatingStarsInput = styled("input")`
    border: 1px solid #aaa;
    text-align: center;
    font-size: 14px;
    line-height: 2;
    width: 50px;
`;

interface RatingStarsInputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const RatingStarsInputNumber = React.forwardRef<
    HTMLInputElement,
    RatingStarsInputNumberProps
>(function RatingStarsInputNumber(props, ref) {
    const focusRef = useAdvancedDialogFocusRef<HTMLInputElement>();

    return <RatingStarsInput type="number" ref={mergeRefs([ref, focusRef])} {...props} />;
});
