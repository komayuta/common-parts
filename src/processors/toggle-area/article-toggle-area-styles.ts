import { css } from "linaria";

import { adjacentToBlockSelector } from "../styles/block-elements";

export const globals = css`
  :global() {
    .article-body {
      ${adjacentToBlockSelector("togglearea")} {
        margin-top: 24px;
      }
    }
  }
`;
