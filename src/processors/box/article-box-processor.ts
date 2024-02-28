import {CustomContainerElementProcessor, ElementProcessorChildConfig} from "@syginc/aomjs";

import {ArticleBox} from "./article-box";
import {ArticleBoxBodyProcessor} from "./article-box-body-processor";
import {ArticleBoxHeadingProcessor} from "./article-box-heading-processor";

const childConfig: ElementProcessorChildConfig = {
    defs: [
        {processor: new ArticleBoxHeadingProcessor()},
        {processor: new ArticleBoxBodyProcessor()},
    ],
};

export class ArticleBoxProcessor extends CustomContainerElementProcessor {
    public readonly tag = "article-box";
    public readonly htmlTag = "div";
    public readonly htmlClass = "box";
    public readonly componentType = ArticleBox;
    public readonly childConfig = childConfig;
}
