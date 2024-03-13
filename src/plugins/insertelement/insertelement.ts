import { TOOLBAR_BUTTON_INSERT_ELEMENT } from "../core/toolbar-button-order";
import { containsAnchor } from "../core/utils/element-path-util";

import {
  elementDefinitions,
  isElementDefinitionWidget,
} from "./elemental-definitions";
import { buildBoxWidgetDefinition } from "./ts/widgets/box";

import { buildToggleAreaWidgetDefinition } from "./ts/widgets/togglearea";

export function addInsertElementPlugin() {
  CKEDITOR.plugins.add("insertelement", {
    requires: "richcombo",

    init(this: any, editor: CKEDITOR.editor) {
      [buildBoxWidgetDefinition(), buildToggleAreaWidgetDefinition()].forEach(
        (def) => {
          editor.widgets.add(def.name!, def);
        }
      );
      editor.ui.addRichCombo("insertelement", {
        label: "挿入",
        panel: {
          css: [(CKEDITOR as any).skin.getPath("editor")],
          multiSelect: false,
          voiceLabel: editor.lang.panelVoiceLabel,
        },
        toolbar: TOOLBAR_BUTTON_INSERT_ELEMENT,

        init(this: any) {
          elementDefinitions.forEach((elementDefinition) => {
            this.add(elementDefinition.name, elementDefinition.label);
          });
        },

        onClick(value: string) {
          const elementDefinition = elementDefinitions.find(
            (x) => x.name === value
          );
          if (!elementDefinition) {
            return;
          }

          editor.focus();
          editor.fire("saveSnapshot");
          if (isElementDefinitionWidget(elementDefinition)) {
            editor.execCommand(elementDefinition.widgetName, {
              startupData: elementDefinition.widgetData,
            });
          } else {
            const element = elementDefinition.createElement();
            editor.insertElement(element);
            if (elementDefinition.widgetDef) {
              editor.widgets.initOn(element, elementDefinition.widgetDef);
            }
          }
          editor.fire("saveSnapshot");
        },

        refresh(this: any) {
          if (!editor.activeFilter.check("p div blockquote")) {
            this.setState(CKEDITOR.TRISTATE_DISABLED);
          }
          if (containsAnchor(editor.elementPath())) {
            this.setState(CKEDITOR.TRISTATE_DISABLED);
          }
        },
      });
    },
  });
}
