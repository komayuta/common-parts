import {ChildConfig, CustomContainerElementProcessor} from "@syginc/aomjs";

import {ArticleBoxHeading} from "./article-box-heading";

export class ArticleBoxHeadingProcessor extends CustomContainerElementProcessor {
    public readonly tag = "article-box-heading";
    public readonly htmlTag = "div";
    public readonly htmlClass = "box-heading";
    public readonly componentType = ArticleBoxHeading;
    public readonly childConfig = ChildConfig.all;
}
