const articleBlockElements = ["p", "h2", "h3", "h4", "table"];
const blockElementsSelector = articleBlockElements.join(",");

function classNamesWidgetAware(className: string) {
    return `.${className},.cke_widget_wrapper_${className}`;
}

export function adjacentToBlockSelector(className: string) {
    // TODO: cke_ is for editor only
    return `& :is(${blockElementsSelector},${classNamesWidgetAware(
        "component-block",
    )}) + :is(${classNamesWidgetAware(className)})`;
}
