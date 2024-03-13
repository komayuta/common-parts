/* eslint-disable @typescript-eslint/no-this-alias */
import {IWidget} from "@syginc/aqua-ckeditor-util";

import {IDialogDataConverter} from "./dialog-data-converter";
import {DialogDataValidators} from "./dialog-data-validator";

interface ILabeledElementFactoryDefinition<T, K extends keyof T, V> {
    id?: string;
    label: string;
    field: K;
    validate?: CKEDITOR.dialog.Validate;
    converter: IDialogDataConverter<T[K], V> | IDialogDataConverter<Exclude<T[K], undefined>, V>;

    onChange?(this: CKEDITOR.ui.dialog.uiElement): void;

    afterSetup?(this: CKEDITOR.ui.dialog.uiElement, value: V): void;
}

export interface ITextInputFactoryDefinition<T, K extends keyof T>
    extends ILabeledElementFactoryDefinition<T, K, string> {
    required?: boolean;
}

export interface ISelectFactoryDefinition<T, K extends keyof T>
    extends ILabeledElementFactoryDefinition<T, K, string> {
    items?: string[][];
    itemsFactory?: () => Array<{label: string; value?: string}>;
}

export interface IRadioFactoryDefinition<T, K extends keyof T>
    extends ILabeledElementFactoryDefinition<T, K, string> {
    items: string[][];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICheckboxFactoryDefinition<T, K extends keyof T>
    extends ILabeledElementFactoryDefinition<T, K, boolean> {}

let idSeq = 1;

export abstract class DialogElementFactoryBase<T, TW> {
    public textInput<K extends keyof T>(
        def: ITextInputFactoryDefinition<T, K>,
    ): CKEDITOR.dialog.definition.textInput {
        if (!def.validate && def.required) {
            def.validate = DialogDataValidators.notEmpty(def.label);
        }

        const factory = this;
        return {
            ...this.labeledElement("text", def),

            setup(this: CKEDITOR.ui.dialog.textInput, widget: IWidget<TW>) {
                const value = factory.getValueFromData(widget, def);
                if (value) {
                    this.setValue(value, false);
                }

                if (def.afterSetup) {
                    def.afterSetup.call(this, value);
                }
            },

            commit(this: CKEDITOR.ui.dialog.textInput, widget: IWidget<TW>) {
                factory.setValueToData(widget, def, this.getValue());
            },
        };
    }

    public select<K extends keyof T>(
        def: ISelectFactoryDefinition<T, K>,
    ): CKEDITOR.dialog.definition.select {
        const factory = this;
        return {
            ...this.labeledElement("select", def),

            items: def.items || [],

            setup(this: CKEDITOR.ui.dialog.select, widget: IWidget<TW>) {
                if (def.itemsFactory) {
                    this.clear();
                    def.itemsFactory().forEach((x) => this.add(x.label, x.value));
                }

                const value = factory.getValueFromData(widget, def);
                if (value) {
                    this.setValue(value, false);
                }

                if (def.afterSetup) {
                    def.afterSetup.call(this, value);
                }
            },

            commit(this: CKEDITOR.ui.dialog.select, widget: IWidget<TW>) {
                factory.setValueToData(widget, def, this.getValue());
            },
        };
    }

    public radio<K extends keyof T>(
        def: IRadioFactoryDefinition<T, K>,
    ): CKEDITOR.dialog.definition.radio {
        const factory = this;
        return {
            ...this.labeledElement("radio", def),

            items: def.items || [],

            setup(this: CKEDITOR.ui.dialog.radio, widget: IWidget<TW>) {
                const value = factory.getValueFromData(widget, def);
                if (value) {
                    this.setValue(value, false);
                }

                if (def.afterSetup) {
                    def.afterSetup.call(this, value);
                }
            },

            commit(this: CKEDITOR.ui.dialog.radio, widget: IWidget<TW>) {
                factory.setValueToData(widget, def, this.getValue());
            },
        };
    }

    public checkbox<K extends keyof T>(
        def: ICheckboxFactoryDefinition<T, K>,
    ): CKEDITOR.dialog.definition.checkbox {
        const factory = this;
        return {
            ...this.labeledElement("checkbox", def),

            setup(this: CKEDITOR.ui.dialog.checkbox, widget: IWidget<TW>) {
                const value = factory.getValueFromData(widget, def);
                this.setValue(value, false);

                if (def.afterSetup) {
                    def.afterSetup.call(this, value);
                }
            },

            commit(this: CKEDITOR.ui.dialog.checkbox, widget: IWidget<TW>) {
                factory.setValueToData(widget, def, this.getValue());
            },
        };
    }

    protected abstract getFieldValue<K extends keyof T>(data: TW, field: K): T[K] | undefined;

    protected abstract getFieldChange<K extends keyof T>(
        data: TW,
        field: K,
        value: T[K],
    ): Partial<TW>;

    private getValueFromData<K extends keyof T, V>(
        widget: IWidget<TW>,
        def: ILabeledElementFactoryDefinition<T, K, V>,
    ) {
        const fieldValue = this.getFieldValue(widget.data, def.field);
        return (def.converter.fromData as (data?: T[K]) => V)(fieldValue); // TODO
    }

    private setValueToData<K extends keyof T, V>(
        widget: IWidget<TW>,
        def: ILabeledElementFactoryDefinition<T, K, V>,
        value: V,
    ) {
        const fieldChange = this.getFieldChange(
            widget.data,
            def.field,
            def.converter.toData(value),
        );
        widget.setData(fieldChange);
    }

    private labeledElement<K extends keyof T, V>(
        type: string,
        def: ILabeledElementFactoryDefinition<T, K, V>,
    ) {
        const onChange = def.onChange ? {onChange: def.onChange} : {};
        return {
            id: def.id || `vera-dialog-element-${idSeq++}`,
            label: def.label,
            type,
            validate: def.validate,
            ...onChange,
        };
    }
}

type FieldData<T, K extends keyof T> = Required<T>[K];

// eslint-disable-next-line max-classes-per-file
export class DialogElementFactory<T> extends DialogElementFactoryBase<T, T> {
    public childFactory<K extends keyof T>(field: K): DialogElementFactoryBase<FieldData<T, K>, T> {
        return new ChildDialogElementFactory<T, K>(field);
    }

    protected getFieldValue<K extends keyof T>(data: T, field: K): T[K] | undefined {
        return data[field];
    }

    protected getFieldChange<K extends keyof T>(_: T, field: K, value: T[K]): Partial<T> {
        const change: Partial<T> = {};
        change[field] = value;
        return change;
    }
}

// eslint-disable-next-line max-classes-per-file
class ChildDialogElementFactory<TP, KP extends keyof TP> extends DialogElementFactoryBase<
    FieldData<TP, KP>,
    TP
> {
    constructor(private readonly field: KP) {
        super();
    }

    protected getFieldValue<K extends keyof FieldData<TP, KP>>(
        data: TP,
        field: K,
    ): FieldData<TP, KP>[K] | undefined {
        const child = data[this.field] as FieldData<TP, KP>;
        return child ? child[field] : undefined;
    }

    protected getFieldChange<K extends keyof FieldData<TP, KP>>(
        data: TP,
        field: K,
        value: FieldData<TP, KP>[K],
    ): Partial<TP> {
        const change: Partial<TP> = {};
        change[this.field] = Object.assign({}, data[this.field], {[field]: value});
        return change;
    }
}
