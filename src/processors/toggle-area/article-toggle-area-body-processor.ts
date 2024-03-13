import {ChildConfig, CustomContainerElementProcessor, IProcessorContext} from "@syginc/aomjs";

import {ArticleToggleAreaBody, ArticleToggleAreaBodyProps} from "./article-toggle-area-body";

export class ArticleToggleAreaBodyProcessor extends CustomContainerElementProcessor {
    public readonly tag = "article-toggle-area-body";
    public readonly htmlTag = "div";
    public readonly htmlClass = "togglearea-body";
    public readonly componentType = ArticleToggleAreaBody;
    public readonly childConfig = ChildConfig.all;

    public getComponentProps(attr: {}, context: IProcessorContext): ArticleToggleAreaBodyProps {
        const baseProps = super.getComponentProps(attr, context);
        return {
            ...baseProps,
            isEditor: context.custom.isEditor,
        };
    }
}
