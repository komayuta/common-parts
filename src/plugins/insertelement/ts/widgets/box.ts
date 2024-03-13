import { $E } from "@syginc/aomjs";
import { getProcessorWidgetDef } from "@syginc/aqua-ckeditor-util";

import { ArticleBoxProcessor } from "../../../../processors/box/article-box-processor";

export const BOX_WIDGET_NAME = "box";

export function buildBoxWidgetDefinition(): CKEDITOR.plugins.widget.definition {
  return {
    ...getProcessorWidgetDef($E(ArticleBoxProcessor)),

    name: BOX_WIDGET_NAME,

    editables: {
      heading: {
        allowedContent: "br",
        selector: ".box-heading",
      },

      body: {
        selector: ".box-body",
      },
    },
  };
}
