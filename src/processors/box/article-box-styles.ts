import {css} from "linaria";

import {articleBackgroundColor, mediaMiddleUp} from "../styles/common-variables";
import {adjacentToBlockSelector} from "../styles/block-elements";

export const globals = css`
    :global() {
        .article-body {
            ${adjacentToBlockSelector("box")} {
                margin-top: 24px;
            }
            .box {
                font-weight: 300;
                font-size: 14px;
                line-height: 24.5px;
                padding: 16px;
                background: ${articleBackgroundColor};
                border-radius: 8px;
                ${mediaMiddleUp} {
                    padding: 24px;
                }
            }
        }
    }
`;
