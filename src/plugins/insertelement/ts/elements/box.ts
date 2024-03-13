import { $E, ArticlePProcessor } from "@syginc/aomjs";
import { renderAomElementToCk } from "@syginc/aqua-ckeditor-util";

import { ArticleBoxBodyProcessor } from "../../../../processors/box/article-box-body-processor";
import { ArticleBoxProcessor } from "../../../../processors/box/article-box-processor";

export function createBoxElement() {
  return renderAomElementToCk(
    $E(ArticleBoxProcessor, [
      $E(
        ArticleBoxBodyProcessor,
        $E(ArticlePProcessor, "このテキストを編集する")
      ),
    ])
  );
}
