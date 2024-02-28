import "./article-box-body-styles";

import {IResponsiveContainerProps} from "@syginc/aomjs";
import * as React from "react";

export function ArticleBoxBody(props: IResponsiveContainerProps) {
    const {children, data} = props;

    return (
        <div className="box-body" {...data}>
            {children}
        </div>
    );
}
