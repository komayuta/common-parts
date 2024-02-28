import {css} from "linaria";

import {mediaMiddleUp, strongFontWeight, themeAccentColor} from "../styles/common-variables";

export const globals = css`
    :global() {
        .article-body {
            .box-heading {
                display: block;
                font-weight: ${strongFontWeight};
                color: ${themeAccentColor};

                font-size: 14px;
                ${mediaMiddleUp} {
                    font-size: 15px;
                }
            }
        }
    }
`;
