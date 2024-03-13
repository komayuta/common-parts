import "./article-toggle-area-heading-styles";

import {IResponsiveContainerProps} from "@syginc/aomjs";
import classNames from "classnames";
import * as React from "react";

import {useClosableContainer} from "../components/molecules/closable-container/closable-container";
import {ComponentEditMode} from "../utils/component-mode-util";

export interface ArticleToggleAreaHeadingProps extends IResponsiveContainerProps {
    editMode?: ComponentEditMode;
}

export const ArticleToggleAreaHeading: React.FC<ArticleToggleAreaHeadingProps> = (props) => {
    const {editMode, children, data} = props;
    const {open, toggle} = useClosableContainer();

    if (editMode !== "show") {
        return (
            <div className="togglearea-heading togglearea-heading-layout" {...data}>
                {children}
                <div className="togglearea-heading-icon"></div>
            </div>
        );
    }
    return (
        <div className="togglearea-heading">
            <button
                {...data}
                className={classNames("togglearea-button togglearea-heading-layout", {
                    "togglearea-heading-closed": !open,
                    "togglearea-heading-open": open,
                })}
                onClick={(e) => {
                    toggle();
                    e.preventDefault();
                }}
            >
                {children}
                <div className="togglearea-heading-icon"></div>
            </button>
        </div>
    );
};
