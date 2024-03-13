import {renderAomElementToCk} from "@syginc/aqua-ckeditor-util";
import {getAscendantElementSelector} from "@syginc/aqua-ckeditor-util";

import {buildOutlineList, IOutlineEntry} from "./outline-plugin-builder";

export const OUTLINE_HEADING_CLASS = "outline-heading-title";
export const OUTLINE_SKIP_ATTRIBUTE_NAME = "data-outline-skip";

export function getHeadingElement(element: CKEDITOR.dom.element): CKEDITOR.dom.element | null {
    return getAscendantElementSelector(element, "h2, h3", true);
}

function searchHeadings(editor: CKEDITOR.editor): CKEDITOR.dom.element[] {
    const elements: CKEDITOR.dom.element[] = [];

    const nodes = editor.document.find("h2, h3");
    for (let i = 0; i < nodes.count(); i++) {
        const element = nodes.getItem(i) as CKEDITOR.dom.element;
        elements.push(element);
    }

    return elements;
}

function findUsableIndex(headings: CKEDITOR.dom.element[]) {
    let maxIndex = -1;
    headings.forEach((elem) => {
        const match = /^heading(\d+)$/.exec(elem.getId());
        if (!match) {
            return;
        }

        const index = parseInt(match[1], 10);
        if (maxIndex < index) {
            maxIndex = index;
        }
    });

    return maxIndex + 1;
}

function isHeadingElementInOutline(heading: CKEDITOR.dom.element) {
    return (
        !heading.hasAttribute(OUTLINE_SKIP_ATTRIBUTE_NAME) &&
        !heading.hasClass(OUTLINE_HEADING_CLASS)
    );
}

function updateIds(headings: CKEDITOR.dom.element[]) {
    let index = findUsableIndex(headings);
    headings.forEach((elem) => {
        if (isHeadingElementInOutline(elem) && !elem.getId()) {
            elem.setAttribute("id", `heading${index}`);
            index++;
        }
    });
}

function updateOutlineList(
    _editor: CKEDITOR.editor,
    outlineElement: CKEDITOR.dom.element,
    headings: CKEDITOR.dom.element[],
) {
    let currentEntry: IOutlineEntry | null = null;
    const entryList: IOutlineEntry[] = [];

    headings.forEach((h) => {
        if (!isHeadingElementInOutline(h)) {
            return;
        }

        if (h.getName() === "h2") {
            currentEntry = {h2: h, h3: []};
            entryList.push(currentEntry);
        } else {
            if (currentEntry === null) {
                currentEntry = {h3: []};
                entryList.push(currentEntry);
            }
            currentEntry.h3.push(h);
        }
    });

    const topList = outlineElement.findOne("ul");
    const ul = renderAomElementToCk(buildOutlineList(entryList));
    const innerHtml = ul.getHtml();
    topList.setHtml(innerHtml);
}

export function updateOutline(editor: CKEDITOR.editor, outlineElement: CKEDITOR.dom.element) {
    editor.fire("saveSnapshot");
    editor.fire("lockSnapshot", {dontUpdate: 1});
    const headings = searchHeadings(editor);
    updateIds(headings);
    updateOutlineList(editor, outlineElement, headings);
    editor.fire("unlockSnapshot");
}
