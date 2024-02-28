import "./article-box-heading-styles";

import {ICustomContainerProps} from "@syginc/aomjs";
import * as React from "react";

export function ArticleBoxHeading(props: ICustomContainerProps) {
    const {children, data} = props;

    return (
        <div className="box-heading" {...data}>
            {children}
        </div>
    );
}
