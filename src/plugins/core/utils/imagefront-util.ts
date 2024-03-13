import {getGlobalAquaAdminClient} from "@syginc/aqua-client";
import {Imagefront} from "@syginc/imagefront-client";

export function getImagefrontClient() {
    return new Imagefront(getGlobalAquaAdminClient().getImagefrontOption());
}
