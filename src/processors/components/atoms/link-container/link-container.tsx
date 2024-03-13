import * as React from "react";

import {Link} from "../link/link";

export const LinkContainer: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
    const {href, children} = props;
    return href ? <Link {...props} /> : <>{children}</>;
};
