import {AdvancedDialogProps, Checkbox, useAdvancedDialogButtons} from "@syginc/aqua-ckeditor-util";
import {FormGroup, TextInput} from "@syginc/aqua-ckeditor-util";
import * as React from "react";
import {useForm} from "react-hook-form";

import { IArticleLinkButtonAttr } from "../../../../processors/processors";
export const LinkButtonForm: React.FC<AdvancedDialogProps<IArticleLinkButtonAttr>> = ({
    initialData,
    subscribeCommit,
}) => {
    const {register, getValues, formState} = useForm<IArticleLinkButtonAttr>({
        mode: "all",
        defaultValues: initialData,
    });

    const {errors} = formState;

    subscribeCommit(getValues);

    useAdvancedDialogButtons({okEnabled: formState.isValid});

    return (
        <form>
            <FormGroup label="ボタンの文字" error={errors.label}>
                <TextInput
                    {...register("label", {
                        required: "必須です",
                    })}
                />
            </FormGroup>

            <FormGroup label="リンク先URL" error={errors.url}>
                <TextInput
                    {...register("url", {
                        required: "必須です",
                    })}
                />
            </FormGroup>

            <FormGroup>
                <Checkbox {...register("nofollow")} label="nofollow" />
                <Checkbox {...register("withPadding")} label="タップ余白あり" />
            </FormGroup>
        </form>
    );
};
