import {css} from "linaria";

import {
    articleButtonLinkColor,
    articleButtonLinkTextColor,
    themeAccentColorStrong,
} from "../styles/common-variables";
import {mediaMiddleUp, mediaUpToSmall} from "../styles/common-variables";

const articleLinkButtonArrow = `
<svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1.74023L5.33333 6.74023L1 11.7402" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M6.3335 1.74023L10.6668 6.74023L6.3335 11.7402" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M11.6665 1.74023L15.9998 6.74023L11.6665 11.7402" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
</svg> `;

export const globals = css`
    :global() {
        .article-body {
            .article-button {
                text-align: center;

                a.article-button-link {
                    display: grid;
                    grid-template-columns: calc(100% - 27px) 17px;
                    place-items: center;
                    margin-inline: auto;
                    gap: 10px;
                    border-radius: 10px;
                    background-color: ${articleButtonLinkColor};
                    box-shadow: 0px 4px 0px ${themeAccentColorStrong};
                    font-size: 15px;
                    font-weight: 500;
                    line-height: 1.25;
                    color: ${articleButtonLinkTextColor};
                    text-decoration: none;
                    transition: 0.3s;

                    &:active,
                    &:active:focus,
                    &:focus,
                    &:hover {
                        opacity: 0.7;
                    }

                    &:active {
                        transform: translateY(4px);
                        box-shadow: 0px 0px 0px ${themeAccentColorStrong};
                    }

                    ${mediaUpToSmall} {
                        max-width: 300px;
                        padding: 10px 12px;
                    }

                    ${mediaMiddleUp} {
                        max-width: 400px;
                        padding: 14px 12px;
                    }

                    span.article-button-arrow {
                        width: 17px;
                        height: 13px;
                        display: block;
                        background: url("data:image/svg+xml;utf8,${encodeURIComponent(
                            articleLinkButtonArrow,
                        )}");
                    }
                }
            }

            .article-button-padding {
                padding-top: 24px;
            }
        }
    }
`;
