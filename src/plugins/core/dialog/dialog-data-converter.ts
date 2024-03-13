export interface IDialogDataConverter<D, V> {
    fromData: (data?: D) => V;
    toData: (value: V) => D;
}

export class DialogDataConverters {
    public static text(defaultValue = ""): IDialogDataConverter<string, string> {
        return {
            fromData: (data) => data || defaultValue,
            toData: (value) => value,
        };
    }

    public static intText(): IDialogDataConverter<number, string> {
        return {
            fromData: (data) => (data ? data.toString() : ""),
            toData: (value) => parseInt(value, 10),
        };
    }

    public static decimalText(
        digit: number,
        defaultValue: number,
    ): IDialogDataConverter<number, string> {
        return {
            fromData: (data) => {
                if (data === undefined || isNaN(data)) {
                    return defaultValue.toFixed(digit);
                } else {
                    return data.toFixed(digit);
                }
            },
            toData: (value) => {
                const data = Number(parseFloat(value).toFixed(digit));
                return isNaN(data) ? defaultValue : data;
            },
        };
    }

    public static numberEnum<T extends number>(defaultValue: T): IDialogDataConverter<T, string> {
        return {
            fromData: (data) => `${data || defaultValue}`,
            toData: (value) => parseInt(value, 10) as T,
        };
    }

    public static stringEnum<T extends string>(defaultValue: T): IDialogDataConverter<T, string> {
        return {
            fromData: (data) => data || defaultValue,
            toData: (value) => value as T,
        };
    }

    public static boolean(defaultValue = false): IDialogDataConverter<boolean, boolean> {
        return {
            fromData: (data) => data || defaultValue,
            toData: (value) => value,
        };
    }
}
