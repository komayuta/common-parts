export function containsAnchor(path: CKEDITOR.dom.elementPath) {
    return path && !!path.contains("a", true, false);
}
