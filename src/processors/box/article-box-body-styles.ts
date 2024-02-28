import {css} from "linaria";

import {mediaMiddleUp} from "../styles/common-variables";

export const globals = css`
    :global() {
        .article-body {
            .box-heading + .box-body {
                margin-top: 16px;
            }

            .box-body {
                font-size: 14px;
                ${mediaMiddleUp} {
                    font-size: 15px;
                }

                p {
                    margin: 0;
                }

                p + p {
                    margin-top: 16px;
                }
            }
        }
    }
`;
