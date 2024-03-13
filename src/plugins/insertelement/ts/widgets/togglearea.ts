/* eslint-disable max-len */
import { $E, $T } from "@syginc/aomjs";
import { getProcessorWidgetDef } from "@syginc/aqua-ckeditor-util";

import { ArticleToggleAreaBodyProcessor } from "../../../../processors/toggle-area/article-toggle-area-body-processor";
import { ArticleToggleAreaHeadingProcessor } from "../../../../processors/toggle-area/article-toggle-area-heading-processor";
import { ArticleToggleAreaHeadingTextProcessor } from "../../../../processors/toggle-area/article-toggle-area-heading-text-processor";
import { ArticleToggleAreaProcessor } from "../../../../processors/toggle-area/article-toggle-area-processor";

/* eslint-enable */

export const TOGGLE_AREA_WIDGET_NAME = "togglearea";

export function buildToggleAreaWidgetDefinition(): CKEDITOR.plugins.widget.definition {
  return {
    ...getProcessorWidgetDef(
      $E(new ArticleToggleAreaProcessor(), {}, [
        $E(new ArticleToggleAreaHeadingProcessor(), null, [
          $E(new ArticleToggleAreaHeadingTextProcessor(), [
            $T("その他の口コミを見る"),
          ]),
        ]),
        $E(new ArticleToggleAreaBodyProcessor(), null, [$T("開閉コンテンツ")]),
      ])
    ),

    name: TOGGLE_AREA_WIDGET_NAME,

    editables: {
      heading: {
        selector: ".togglearea-heading",
      },
      text: {
        selector: ".togglearea-heading-text",
        allowedContent: "strong;small",
      },
      body: {
        selector: ".togglearea-body",
      },
    },
  };
}
