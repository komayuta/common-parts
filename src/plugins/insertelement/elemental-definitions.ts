import { createBoxElement } from "./ts/elements/box";
import { BOX_WIDGET_NAME } from "./ts/widgets/box";

import { TOGGLE_AREA_WIDGET_NAME } from "./ts/widgets/togglearea";

interface IElementDefinition {
  name: string;
  label: string;
}

interface IElementDefinitionHtml extends IElementDefinition {
  widgetDef?: string;

  createElement(): CKEDITOR.dom.element;
}

interface IElementDefinitionWidget extends IElementDefinition {
  widgetName: string;
  widgetData: any;
}

export function isElementDefinitionWidget(
  def: IElementDefinition
): def is IElementDefinitionWidget {
  return (def as IElementDefinitionWidget).widgetName !== undefined;
}

export const elementDefinitions: Array<
  IElementDefinitionHtml | IElementDefinitionWidget
> = [
  {
    name: "box",
    label: "枠",
    widgetDef: BOX_WIDGET_NAME,
    createElement: createBoxElement,
  },
  {
    name: "togglearea",
    label: "開閉エリア",
    widgetName: TOGGLE_AREA_WIDGET_NAME,
    widgetData: {},
  },
];
