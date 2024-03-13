import { IResponsiveContainerProps } from "@syginc/aomjs";
import * as React from "react";

import { Collapse } from "../components/atoms/collapse/collapse";
import { useClosableContainer } from "../components/molecules/closable-container/closable-container";

export interface ArticleToggleAreaBodyProps extends IResponsiveContainerProps {
  isEditor?: boolean;
}

export function ArticleToggleAreaBody(props: ArticleToggleAreaBodyProps) {
  const { children, data, isEditor } = props;
  const { open } = useClosableContainer();

  const rootProps = { className: "togglearea-body", ...data };
  if (isEditor) {
    return <div {...rootProps}>{children}</div>;
  }

  return (
    <div {...rootProps}>
      <Collapse open={open} duration={200}>
        {children}
      </Collapse>
    </div>
  );
}
