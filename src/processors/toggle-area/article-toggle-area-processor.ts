import {CustomContainerElementProcessor, ElementProcessorChildConfig} from "@syginc/aomjs";

import {ArticleToggleArea} from "./article-toggle-area";
import {ArticleToggleAreaBodyProcessor} from "./article-toggle-area-body-processor";
import {ArticleToggleAreaHeadingProcessor} from "./article-toggle-area-heading-processor";

const headingProcessor = new ArticleToggleAreaHeadingProcessor();
const bodyProcessor = new ArticleToggleAreaBodyProcessor();

const childConfig: ElementProcessorChildConfig = {
    defs: [{processor: headingProcessor}, {processor: bodyProcessor}],
};

export class ArticleToggleAreaProcessor extends CustomContainerElementProcessor {
    public readonly tag = "article-toggle-area";
    public readonly htmlTag = "div";
    public readonly htmlClass = "togglearea";
    public readonly componentType = ArticleToggleArea;
    public readonly childConfig = childConfig;
}
