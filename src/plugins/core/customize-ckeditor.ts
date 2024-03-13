import {customizeLinkDialog} from "./dialog/customize-link-dialog";
import {customizeTableDialog} from "./dialog/customize-table-dialog";

export function customizeCkEditor() {
    // for icons
    (CKEDITOR as any).dtd.$removeEmpty.i = false;

    // for ranking-list
    (CKEDITOR as any).dtd.a.div = 1;

    // for insertelement plugin
    (CKEDITOR as any).dtd.$editable.a = 1;
    (CKEDITOR as any).dtd.$editable.ul = 1;
    (CKEDITOR as any).dtd.$editable.li = 1;

    (CKEDITOR as any).on("dialogDefinition", (evt: any) => {
        const dialogName = evt.data.name;
        const dialogDefinition = evt.data.definition as CKEDITOR.dialog.definitionObject;

        if (dialogName === "table") {
            customizeTableDialog(dialogDefinition);
        }

        if (dialogName === "link") {
            customizeLinkDialog(dialogDefinition);
        }
    });
}
