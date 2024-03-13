import {getGlobalAquaAdminClient} from "@syginc/aqua-client";

async function setLinkTitleToTextInput(
    _button: CKEDITOR.ui.dialog.button,
    displayTextElement: CKEDITOR.ui.dialog.textInput,
    url: string,
) {
    try {
        const title = await getGlobalAquaAdminClient().getLinkTitle(url);
        displayTextElement.setValue(title, false);
    } catch (e) {
        alert("記事情報の取得に失敗しました: " + e);
    }
}

function customizeLinkDialogElements(dialogDefinition: CKEDITOR.dialog.definitionObject) {
    const advancedTab = dialogDefinition.getContents("advanced");
    advancedTab.remove("advRel");

    const infoTab = dialogDefinition.getContents("info");
    infoTab.add(
        {
            type: "button",

            label: "記事URLからタイトルを取得",

            id: "getTitleButton",

            onClick(this: CKEDITOR.ui.dialog.button) {
                const dialog = this.getDialog();

                const protocolElement = dialog.getContentElement(
                    "info",
                    "protocol",
                ) as CKEDITOR.ui.dialog.select;
                const urlElement = dialog.getContentElement(
                    "info",
                    "url",
                ) as CKEDITOR.ui.dialog.textInput;
                const url = protocolElement.getValue() + urlElement.getValue();

                const displayTextElement = dialog.getContentElement(
                    "info",
                    "linkDisplayText",
                ) as CKEDITOR.ui.dialog.textInput;

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                setLinkTitleToTextInput(this, displayTextElement, url);
            },
        },
        "linkType",
    );

    infoTab.add({
        type: "checkbox",

        label: "nofollow",

        requiredContent: "a[rel]",

        default: "",

        id: "infoRel",

        setup(this: CKEDITOR.ui.dialog.checkbox, data: any) {
            if (!data.advanced) {
                data.advanced = {};
            }

            const relSet = new Set<string>((data.advanced.advRel || "").split(" "));
            (this as any).relSet = relSet;
            this.setValue(relSet.has("nofollow"), false);
        },

        commit(this: CKEDITOR.ui.dialog.checkbox, data: any) {
            if (!data.advanced) {
                data.advanced = {};
            }

            const relSet = (this as any).relSet as Set<string>;
            if (this.getValue()) {
                relSet.add("nofollow");
            } else {
                relSet.delete("nofollow");
            }

            data.advanced.advRel = [...relSet.values()]
                .sort()
                .filter((x) => x)
                .join(" ");
        },
    });
}

// Fix linkDisplayText when getSelectedText does not work
function setLinkDisplayTextBySelectedElement(editor: CKEDITOR.editor, dialog: CKEDITOR.dialog) {
    const element = editor.getSelection().getSelectedElement();
    if (!element || element.getName() !== "a") {
        return; // not link selected
    }

    const textInput = dialog.getContentElement("info", "linkDisplayText");
    if (textInput.getValue().trim().length > 0) {
        return; // not empty
    }

    textInput.setValue(element.getText(), false);
}

function customizedOnShow(editor: CKEDITOR.editor, dialog: CKEDITOR.dialog) {
    // set target="_blank" when new link dialog opened
    if (!(dialog as any)._.selectedElements.length) {
        dialog.setValueOf("target", "linkTargetType", "_blank");
    }

    setLinkDisplayTextBySelectedElement(editor, dialog);
}

function customizedOnOk(_editor: CKEDITOR.editor, dialog: CKEDITOR.dialog) {
    // remove target attribute when anchor selected
    if (dialog.getValueOf("info", "linkType") === "anchor") {
        dialog.setValueOf("target", "linkTargetType", "notSet");
    }
}

function customizedOnHide(editor: CKEDITOR.editor, _dialog: CKEDITOR.dialog) {
    const element = editor.getSelection().getSelectedElement();
    if (!element || element.getName() !== "a") {
        return; // not link selected
    }

    if (element.getAttribute("contenteditable") === "true") {
        // Prevent selecting contenteditable "a" itself (Firefox selects the element entirely)
        editor.getSelection().removeAllRanges();
    }
}

export function customizeLinkDialog(dialogDefinition: CKEDITOR.dialog.definitionObject) {
    const infoTab = dialogDefinition.getContents("info");
    const protocol = infoTab.get("protocol") as CKEDITOR.dialog.definition.select;
    protocol.default = "https://";

    customizeLinkDialogElements(dialogDefinition);

    // Replace onShow
    const originalOnShow = dialogDefinition.onShow!;
    dialogDefinition.onShow = function onShow(this: CKEDITOR.dialog) {
        if (originalOnShow) {
            // eslint-disable-next-line prefer-rest-params
            originalOnShow.apply(this, arguments);
        }

        customizedOnShow(this.getParentEditor(), this);
    };

    // Replace onOk
    const originalOnOk = dialogDefinition.onOk!;
    dialogDefinition.onOk = function onOk(this: CKEDITOR.dialog) {
        customizedOnOk(this.getParentEditor(), this);

        if (originalOnOk) {
            // eslint-disable-next-line prefer-rest-params
            originalOnOk.apply(this, arguments);
        }
    };

    // Replace onHide
    const originalOnHide = dialogDefinition.onHide!;
    dialogDefinition.onHide = function onHide(this: CKEDITOR.dialog) {
        customizedOnHide(this.getParentEditor(), this);

        if (originalOnHide) {
            // eslint-disable-next-line prefer-rest-params
            originalOnHide.apply(this, arguments);
        }
    };
}
