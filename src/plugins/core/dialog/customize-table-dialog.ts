function setTextInputDefault(
    content: CKEDITOR.dialog.definition.contentObject,
    id: string,
    defaultValue: string,
) {
    const textInput = content.get(id) as CKEDITOR.dialog.definition.textInput;
    textInput.default = defaultValue;
}

export function customizeTableDialog(dialogDefinition: CKEDITOR.dialog.definitionObject) {
    const infoTab = dialogDefinition.getContents("info");
    setTextInputDefault(infoTab, "txtWidth", "");
    setTextInputDefault(infoTab, "txtCellSpace", "");
    setTextInputDefault(infoTab, "txtCellPad", "");
    setTextInputDefault(infoTab, "selHeaders", "row");
}
