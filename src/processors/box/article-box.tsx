import React from "react";
import "./article-box-styles";

import {IResponsiveContainerProps} from "@syginc/aomjs";

export function ArticleBox(props: IResponsiveContainerProps) {
    const {children, data} = props;

    return (
        <div className="box component-block" {...data}>
            {children}
        </div>
    );
}
