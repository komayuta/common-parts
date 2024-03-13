import { css } from "linaria";

import { articleLinkColor } from "../styles/common-variables";

export const globals = css`
  :global() {
    .article-body {
      .togglearea-heading-layout {
        display: inline-grid;
        grid-template-columns: 1fr 18px;
        gap: 4px;
        align-items: center;
      }
      .togglearea-heading {
        position: relative;
        text-decoration: none;
        color: ${articleLinkColor};
        .togglearea-button {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .togglearea-heading-icon {
          background-color: ${articleLinkColor};
          height: 18px;
          width: 18px;
          border-radius: 4px;
          display: grid;
          place-items: center;
          br {
            display: none;
          }
          &::before {
            content: "";
            width: 12px;
            height: 2px;
            background-color: #fff;
            grid-area: 1 / -1;
          }
          &::after {
            content: "";
            width: 12px;
            height: 2px;
            background-color: #fff;
            transform: rotate(90deg);
            grid-area: 1 / -1;
            transition: all 0.3s ease;
          }
        }
        .togglearea-heading-open {
          .togglearea-heading-icon {
            &::after {
              content: "";
              transform: rotate(0deg);
              transition: all 0.3s ease;
            }
          }
        }

        & + .togglearea-body {
          margin-top: 8px;
          font-size: 14px;
          line-height: 1.75;
          p:first-child {
            margin: 0;
          }
        }
      }
    }
  }
`;
