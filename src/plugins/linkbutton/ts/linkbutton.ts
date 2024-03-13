import {$E} from "@syginc/aomjs";
import {addAnchorProtectHandlerToCommand} from "@syginc/aqua-ckeditor-util";
import {getProcessorWidgetDef} from "@syginc/aqua-ckeditor-util";
import {addWidgetContextMenu} from "@syginc/aqua-ckeditor-util";

import {ArticleLinkButtonProcessor} from "../../../processors/link-button/article-link-button-processor";
import {TOOLBAR_BUTTON_LINK_BUTTON} from "../../core/toolbar-button-order";
import {createEditorAdvancedDialog} from "../../core/utils/editor-dialog-util";
import icon from "../resources/icons/linkbutton.svg"

import {LinkButtonForm} from "./components/linkbutton-form";

const WIDGET_NAME = "linkbutton";
const BUTTON_NAME = "LinkButton";
const DIALOG_NAME = "linkbutton-dialog";

export function addLinkButtonPlugin() {
    CKEDITOR.plugins.add("linkbutton", {
        requires: "widget",
        init(editor: CKEDITOR.editor) {
            CKEDITOR.dialog.add(DIALOG_NAME, () =>
                createEditorAdvancedDialog({
                    component: LinkButtonForm,
                    title: "ボタンのプロパティ",

                    minHeight: 200,
                    minWidth: 300,
                }),
            );

            editor.widgets.add(WIDGET_NAME, {
                ...getProcessorWidgetDef(
                    $E(new ArticleLinkButtonProcessor(), {
                        nofollow: true,
                        withPadding: true,
                    }),
                    {
                        rootClasses: ["article-button-padding"],
                    },
                ),
                dialog: DIALOG_NAME,
            });

            addAnchorProtectHandlerToCommand(editor, WIDGET_NAME);

            editor.ui.addButton(BUTTON_NAME, {
                command: WIDGET_NAME,
                label: "ボタン",
                icon,
                toolbar: TOOLBAR_BUTTON_LINK_BUTTON,
            });

            addWidgetContextMenu(editor, {
                label: "ボタンのプロパティ",
                icon,
                widgetName: WIDGET_NAME,
            });
        },
    });
}
