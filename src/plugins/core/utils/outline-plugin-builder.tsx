import {$E, $T, ArticleAProcessor, ArticleLiProcessor, ArticleUlProcessor} from "@syginc/aomjs";

export interface IOutlineEntry {
    h2?: CKEDITOR.dom.element;
    h3: CKEDITOR.dom.element[];
}

function listNotFalsey<T>(...args: Array<T | false | undefined | null>): T[] {
    return args.filter((x): x is T => !!x);
}

const buildA = (heading: CKEDITOR.dom.element) =>
    $E(new ArticleAProcessor(), {href: `#${heading.getId()}`}, [$T(heading.getText())]);

export const buildOutlineList = (list: IOutlineEntry[]) =>
    $E(
        new ArticleUlProcessor(),
        null,
        list.map((entry) =>
            $E(
                new ArticleLiProcessor(),
                null,
                listNotFalsey(
                    entry.h2 && buildA(entry.h2),
                    entry.h3.length > 0 &&
                        $E(
                            new ArticleUlProcessor(),
                            null,
                            entry.h3.map((h3) => $E(new ArticleLiProcessor(), null, [buildA(h3)])),
                        ),
                ),
            ),
        ),
    );
