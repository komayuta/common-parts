import {css} from "linaria";

import {articleLinkColor} from "../styles/common-variables";

export const globals = css`
    :global() {
        .article-body {
            .togglearea-heading-text {
                width: fit-content;
                margin: 0;
                color: ${articleLinkColor};
                text-align: left;
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 1.5;
            }
        }
    }
`;
