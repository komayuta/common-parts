import "./article-toggle-area-styles";

import { IResponsiveContainerProps } from "@syginc/aomjs";
import * as React from "react";

import { ClosableContainer } from "../components/molecules/closable-container/closable-container";

export const ArticleToggleArea: React.FC<IResponsiveContainerProps> = (
  props
) => {
  const { data, children } = props;

  return (
    <ClosableContainer>
      <div className="togglearea component-block" {...data}>
        {children}
      </div>
    </ClosableContainer>
  );
};
