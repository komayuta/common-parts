import {minWidthMiddle} from "../styles/common-variables";

export interface ImgSizeQueries {
    middleUp?: string;
}

export function imgSizes(defaultSize: string, options?: ImgSizeQueries) {
    const conditions = [{minWidth: `${minWidthMiddle}px`, value: options?.middleUp}]
        .filter((x) => !!x.value)
        .map((x) => `(min-width: ${x.minWidth}) ${x.value}`);

    return conditions.concat([defaultSize]).join(",");
}
