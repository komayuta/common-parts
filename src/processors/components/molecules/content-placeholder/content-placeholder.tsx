import {styled} from "linaria/react";
import * as React from "react";

import {backgroundGrid} from "../../../styles/utility/background-grid";

// ソースには残らないのでstyledを使う
const ContentPlaceholderDiv = styled.div`
    ${backgroundGrid};

    width: 100%;
    border: 1px solid #f0f0f0;
    padding: 10px;
`;

const ContentPlaceholderLabelDiv = styled.div`
    font-size: 14px;
    line-height: 1.5;
    color: #111;
`;

const ContentPlaceholerParametersDl = styled.dl`
    margin-top: 5px;

    font-size: 11px;
    color: #666;
`;

const ContentPlaceholderParameterDt = styled.dt`
    float: left;
    clear: left;

    &:after {
        content: ":";
        padding-right: 0.5em;
    }
`;

const ContentPlaceholderParameterDd = styled.dd`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export interface ContentPlaceholderParameterProps {
    label: string;
}

export const ContentPlaceholderParameter: React.FC<ContentPlaceholderParameterProps> = ({
    label,
    children,
}) => (
    <>
        <ContentPlaceholderParameterDt>{label}</ContentPlaceholderParameterDt>
        <ContentPlaceholderParameterDd>{children}</ContentPlaceholderParameterDd>
    </>
);

export interface ContentPlaceholderProps {
    label: string;
    children?:
        | React.ReactElement<ContentPlaceholderParameterProps>
        | Array<React.ReactElement<ContentPlaceholderParameterProps>>;
}

export const ContentPlaceholder: React.FC<ContentPlaceholderProps> = ({label, children}) => (
    // TODO: processor呼び出しで消す
    <ContentPlaceholderDiv data-cke-temp="1">
        <ContentPlaceholderLabelDiv>{label}</ContentPlaceholderLabelDiv>
        <ContentPlaceholerParametersDl>{children}</ContentPlaceholerParametersDl>
    </ContentPlaceholderDiv>
);
