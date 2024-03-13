export interface LinkAnchorItem {
    value: string;
    label: string;
}

export function truncateText(text: string, length: number) {
    if (length <= 3 || text.length <= length) {
        return text;
    }
    return `${text.substring(0, length - 3)}...`;
}

function makeLinkLabel(element: CKEDITOR.dom.element) {
    return `#${element.getId()} (${truncateText(element.getText(), 30)})`;
}

export function getEditorLinkAnchors(editor: CKEDITOR.editor): LinkAnchorItem[] {
    return CKEDITOR.plugins.link.getEditorAnchors(editor).map((x: any) => {
        const value = `#${x.id || x.name}`;
        // TODO: getByIdのためnameだけのものを検索できない
        // TODO: fakeAnchorは別のimgに置き換えられているので検索できない (cf getEditorAnchors)
        const element = editor.document.getById(x.id);
        const label = element ? makeLinkLabel(element) : value;
        return {label, value};
    });
}
