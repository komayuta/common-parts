import {ChildConfig, CustomContainerElementProcessor} from "@syginc/aomjs";

import {ArticleBoxBody} from "./article-box-body";

export class ArticleBoxBodyProcessor extends CustomContainerElementProcessor {
    public readonly tag = "article-box-body";
    public readonly htmlTag = "div";
    public readonly htmlClass = "box-body";
    public readonly componentType = ArticleBoxBody;
    public readonly childConfig = ChildConfig.all;
}
