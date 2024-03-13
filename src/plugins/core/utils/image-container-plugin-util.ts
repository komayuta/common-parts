import {IImagefrontUrlParts} from "@syginc/imagefront-client";

import {IMAGE_CONVERT_TYPE_GENERAL_CONTENT_IMAGE} from "../../../common/imagefront";

export const IMAGE_CONTAINER_WIDGET_NAME = "imagecontainer";

export const IMAGE_CONTAINER_IMAGE_URI_OPTIONS: Partial<IImagefrontUrlParts> = {
    ext: "jpg",
    type: IMAGE_CONVERT_TYPE_GENERAL_CONTENT_IMAGE,
};
