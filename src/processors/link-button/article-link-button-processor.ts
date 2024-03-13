import {ChildConfig, IElementProcessor, IProcessorContext} from "@syginc/aomjs";

import {ArticleLinkButton, IArticleLinkButtonProps} from "./article-link-button";

export interface IArticleLinkButtonAttr {
    url?: string;
    label?: string;
    nofollow?: boolean;
    withPadding?: boolean;
}

export class ArticleLinkButtonProcessor
    implements IElementProcessor<IArticleLinkButtonAttr, IArticleLinkButtonProps>
{
    public readonly tag = "article-link-button";
    public readonly htmlTag = "div";
    public readonly htmlClass = "article-button";
    public readonly componentType = ArticleLinkButton;
    public readonly childConfig = ChildConfig.nothing;

    public parseAttr(element: Element): IArticleLinkButtonAttr | undefined {
        const aEl = element.querySelector("a");
        if (!aEl) {
            return undefined;
        }

        const rel = aEl.getAttribute("rel") || "";
        const withPadding = element.classList.contains("article-button-padding") || undefined;
        return {
            label: aEl.textContent || undefined,
            nofollow: rel.indexOf("nofollow") >= 0 || undefined,
            url: aEl.getAttribute("href") || undefined,
            withPadding,
        };
    }

    public getComponentProps(
        attr: IArticleLinkButtonAttr,
        context: IProcessorContext,
    ): IArticleLinkButtonProps {
        return {
            deviceType: context.deviceType,
            label: attr.label || "",
            nofollow: attr.nofollow,
            withPadding: attr.withPadding,
            url: attr.url || "",
        };
    }
}
