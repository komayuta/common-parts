import {
  CustomContainerElementProcessor,
  ElementProcessorChildConfig,
  IProcessorContext,
} from "@syginc/aomjs";

import { getComponentMode } from "../utils/component-mode-util";
import { ISiteCustomContext } from "../site-custom-context";
import {
  ArticleToggleAreaHeading,
  ArticleToggleAreaHeadingProps,
} from "./article-toggle-area-heading";
import { ArticleToggleAreaHeadingTextProcessor } from "./article-toggle-area-heading-text-processor";

const textProcessor = new ArticleToggleAreaHeadingTextProcessor();

const childConfig: ElementProcessorChildConfig = {
  defs: [{ processor: textProcessor }],
};

export class ArticleToggleAreaHeadingProcessor extends CustomContainerElementProcessor {
  public readonly tag = "article-toggle-area-heading";
  public readonly htmlTag = "div";
  public readonly htmlClass = "togglearea-heading";
  public readonly componentType = ArticleToggleAreaHeading;
  public readonly childConfig = childConfig;

  public getComponentProps(
    attr: {},
    context: IProcessorContext
  ): ArticleToggleAreaHeadingProps {
    const custom = context.custom as ISiteCustomContext;
    const editMode = getComponentMode(context.deviceType, custom.isEditor);

    return {
      ...super.getComponentProps(attr, context),
      editMode,
    };
  }
}
