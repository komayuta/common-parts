declare const GIT_COMMIT_HASH: string;

/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace CKEDITOR {
  function warn(errorCode: string, additionalData?: any): void;

  function error(errorCode: string, additionalData?: any): void;

  interface config {
    disableObjectResizing?: boolean;

    disablekey_targetClasses?: string[];
    nestedlinkfix_excludeClasses?: string[];
  }

  interface editor {
    editable(): CKEDITOR.editable;

    // Notification plugin
    showNotification(
      message: string,
      type?: string,
      progressOrDuration?: number
    ): CKEDITOR.plugins.notification;

    getSelectedHtml(toString: true): string | null;

    getSelectedHtml(toString: false): CKEDITOR.dom.documentFragment | null;
  }

  interface editable extends CKEDITOR.dom.element {
    attachListener(
      obj: CKEDITOR.dom.domObject,
      eventName: string,
      listenerFunction: (evt: CKEDITOR.eventInfo) => any,
      // eslint-disable-next-line @typescript-eslint/ban-types
      scopeObj?: object,
      // eslint-disable-next-line @typescript-eslint/ban-types
      listenerData?: object,
      priority?: number
    ): any;

    isInline(): boolean;
  }

  namespace dom {
    interface node {
      remove(preserveChildren?: boolean): node;

      getAscendant(
        query: (node: node) => boolean,
        includeSelf?: boolean
      ): node | null;
    }

    interface nodeList {
      toArray(): node[];
    }

    interface range {
      getNextNode(evaluator: (node: node) => boolean): element | null;

      getPreviousNode(evaluator: (node: node) => boolean): element | null;
    }

    interface walker {
      evaluator: (node: node) => boolean;
    }

    interface elementPath {
      lastElement: element;
    }
  }

  interface ui {
    // eslint-disable-next-line @typescript-eslint/ban-types
    addRichCombo(name: string, definition: object): void;
  }

  namespace dialog {
    type Validate = () => true | string;

    namespace validate {
      function regex(regex: RegExp, msg: string): Validate;

      function notEmpty(msg: string): Validate;

      function integer(msg: string): Validate;
    }

    namespace definition {
      interface labeledElement {
        onChange?(this: CKEDITOR.ui.dialog.labeledElement): void;
      }

      interface checkbox {
        onChange?(this: CKEDITOR.ui.dialog.checkbox): void;
      }

      interface radio {
        onChange?(this: CKEDITOR.ui.dialog.radio): void;
      }

      interface button {
        onClick(evt: eventInfo): void;
      }

      interface contentObject {
        add<T extends CKEDITOR.dialog.definition.uiElement>( //
          elementDefinition: T,
          nextSiblingId?: string
        ): CKEDITOR.dialog.definition.uiElement;

        get(id: string): CKEDITOR.dialog.definition.uiElement;

        remove(id: string): CKEDITOR.dialog.definition.uiElement;
      }
    }

    interface definitionObject extends CKEDITOR.dialog.IDialogDefinition {
      getContents(id: string): CKEDITOR.dialog.definition.contentObject;
    }

    interface IDialogDefinition {
      // eslint-disable-next-line @typescript-eslint/ban-types
      onHide?: Function;
    }
  }

  interface dialog {
    commitContent(...args: any[]): void;
  }

  namespace plugins {
    interface widget {
      // eslint-disable-next-line @typescript-eslint/ban-types
      setData(obj: object): widget;
    }

    namespace widget {
      function isDomWidgetElement(node: CKEDITOR.dom.element): boolean;

      function isDomWidgetWrapper(node: CKEDITOR.dom.element): boolean;

      interface repository {
        initOn(
          element: CKEDITOR.dom.element,
          widgetDef: string,
          // eslint-disable-next-line @typescript-eslint/ban-types
          startupData?: object
        ): CKEDITOR.plugins.widget | null;
      }
    }

    namespace clipboard {
      interface dataTransfer {
        id: string;
        $: DataTransfer;

        getFilesCount(): number;

        getFile(i: number): File;
      }
    }

    interface NotificationOptions {
      message?: string;
      type?: string;
      progress?: number;
      duration?: number;
      important?: boolean;
    }

    interface notification {
      show(): void;

      update(options: NotificationOptions): void;

      hide(): void;

      isVisible(): boolean;
    }
  }

  interface template {
    output(data: any): string;

    output(data: any, buffer: string[]): number;
  }

  interface IResource {
    path: string;
    name: string;
  }

  interface filter {
    check(
      // eslint-disable-next-line @typescript-eslint/ban-types
      test: string | object,
      applyTransformations?: boolean,
      strictCheck?: boolean
    ): boolean;
  }

  namespace dtd {
    const $block: { [key: string]: 1 | undefined };
  }

  namespace tools {
    function buildStyleHtml(css: string | string[]): string;
  }
}

declare module "*.svg" {
  const content: string;
  export default content;
}
