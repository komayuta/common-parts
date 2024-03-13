export type ComponentEditMode = "serialize" | "edit" | "show";

import {DeviceType} from "@syginc/aomjs";

export function getComponentMode(deviceType: DeviceType, isEditor?: boolean): ComponentEditMode {
    if (deviceType === DeviceType.Source) {
        return "serialize";
    }
    if (isEditor) {
        return "edit";
    }
    return "show";
}
