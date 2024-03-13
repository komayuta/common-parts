import {createAdvancedDialog, IAdvancedDialogDefinition} from "@syginc/aqua-ckeditor-util";
import React from "react";

import {FormRoot} from "../components/organisms/form-root/form-root";

function withFormRoot<T>(WrappedComponent: React.ComponentType<T>): React.ComponentType<T> {
    // eslint-disable-next-line react/display-name
    return (props) => (
        <FormRoot>
            <WrappedComponent {...props} />
        </FormRoot>
    );
}

export function createEditorAdvancedDialog<T>(definition: IAdvancedDialogDefinition<T>) {
    const {component, ...rest} = definition;
    return createAdvancedDialog({
        ...rest,
        component: withFormRoot(component),
    });
}
