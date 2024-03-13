import {IBlockDefinition, IDocument} from "@syginc/aqua-client";

export interface ISiteCustomContext {
    assetUrl: (path: string) => string;
    isEditor?: boolean;

    blockDocuments?: IDocument[];
    blockDefinitions?: IBlockDefinition[];
}
