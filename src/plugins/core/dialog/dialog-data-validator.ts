export class DialogDataValidators {
    public static notEmpty(field: string): CKEDITOR.dialog.Validate {
        return CKEDITOR.dialog.validate.notEmpty(`${field}を入力してください`);
    }

    public static integer(
        options: {
            required?: boolean;
            min?: number;
            max?: number;
        } = {},
    ): CKEDITOR.dialog.Validate {
        const {required, min, max} = options;

        return function integer(this: CKEDITOR.ui.dialog.labeledElement) {
            const value = (this.getValue() as string).trim();
            const label = this.getLabel();

            if (required && value.length === 0) {
                return `${label}を入力してください`;
            }

            if (!/^-?(\d|[1-9]\d+)$/.test(value)) {
                return `${label}には整数を入力してください`;
            }

            const num = Number(value);

            if (min !== undefined && min > num) {
                return `${label}には${min}以上の整数を入力してください`;
            }

            if (max !== undefined && max < num) {
                return `${label}には${max}以下の整数を入力してください`;
            }

            return true;
        };
    }

    public static decimal(
        options: {
            required?: boolean;
            min?: number;
            max?: number;
            digit?: number;
        } = {},
    ): CKEDITOR.dialog.Validate {
        const {required, min, max, digit} = options;

        return function decimal(this: CKEDITOR.ui.dialog.labeledElement) {
            const value = (this.getValue() as string).trim();
            const label = this.getLabel();

            if (required && value.length === 0) {
                return `${label}を入力してください`;
            }

            const match = /^-?(\d|[1-9]\d+)(\.\d+)?$/.exec(value);
            if (match === null) {
                return `${label}には数値を入力してください`;
            }

            const num = Number(value);

            if (digit !== undefined && match[2] && match[2].length - 1 > digit) {
                return `${label}には小数点${digit}桁以下の数値を入力してください`;
            }

            if (min !== undefined && min > num) {
                return `${label}には${min}以上の数値を入力してください`;
            }

            if (max !== undefined && max < num) {
                return `${label}には${max}以下の数値を入力してください`;
            }

            return true;
        };
    }
}
