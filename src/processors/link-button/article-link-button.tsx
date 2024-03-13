import "./article-link-button-styles";

import {IResponsiveElementProps} from "@syginc/aomjs";
import classNames from "classnames";
import * as React from "react";

import {isExternalSite} from "../utils/external-link-util";

export interface IArticleLinkButtonProps extends IResponsiveElementProps {
    url: string;
    label: string;
    nofollow?: boolean;
    withPadding?: boolean;
}

export const ArticleLinkButton = (props: IArticleLinkButtonProps) => {
    const {url, label, nofollow, withPadding, data} = props;

    return (
        <div
            className={classNames("article-button", "component-block", {
                "article-button-padding": withPadding,
            })}
        >
            <a
                className="article-button-link"
                href={url}
                rel={[
                    nofollow ? "nofollow" : undefined,
                    isExternalSite(url) ? "noopener" : undefined,
                ]
                    .filter((x) => !!x)
                    .join(" ")}
                target={isExternalSite(url) ? "_blank" : undefined}
                {...data}
            >
                {label}
                <span className="article-button-arrow"></span>
            </a>
        </div>
    );
};
