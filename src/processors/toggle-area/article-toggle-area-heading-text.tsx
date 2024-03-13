import "./article-toggle-area-heading-text-styles";

import {ICustomContainerProps} from "@syginc/aomjs";
import * as React from "react";

export function ArticleToggleAreaHeadingText(props: ICustomContainerProps) {
    const {children, data} = props;

    return (
        <div {...data} className="togglearea-heading-text">
            {children}
        </div>
    );
}
