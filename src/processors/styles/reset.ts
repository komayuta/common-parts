import "minireset.css";

import {css} from "linaria";

export const globals = css`
    :global() {
        body {
            a {
                text-decoration: none;
                color: inherit;

                &:hover {
                    text-decoration: none;
                    cursor: pointer;
                }
            }

            img {
                max-width: none;
            }
        }
    }
`;
