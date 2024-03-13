import {ChildConfig, CustomContainerElementProcessor} from "@syginc/aomjs";

import {ArticleToggleAreaHeadingText} from "./article-toggle-area-heading-text";

export class ArticleToggleAreaHeadingTextProcessor extends CustomContainerElementProcessor {
    public readonly tag = "article-toggle-area-button";
    public readonly htmlTag = "div";
    public readonly htmlClass = "togglearea-heading-text";
    public readonly componentType = ArticleToggleAreaHeadingText;
    public readonly childConfig = ChildConfig.all;
}
