import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type CollapseStateType =
  | "start-opening"
  | "opening"
  | "opened"
  | "start-closing"
  | "closing"
  | "closed";

interface CollapseState {
  type: CollapseStateType;
  innerHeight?: number;
}

interface CollapseProps {
  open: boolean;
  duration: number;
  closedHeight?: number;
  children?: React.ReactNode;
}

export const Collapse: React.FC<CollapseProps> = ({
  open,
  duration,
  closedHeight,
  children,
}) => {
  const [collapseState, setCollapseState] = useState<CollapseState>({
    type: "closed",
  });

  const transition = `height ${duration / 1000}s`;
  const [divStyle, setDivStyle] = useState<{
    height?: string | number;
    transition?: string;
  }>({
    height: 0,
  });
  useEffect(() => {
    const { type, innerHeight } = collapseState;

    switch (type) {
      case "start-opening":
        setDivStyle({ height: 0, transition });
        window.requestAnimationFrame(() => {
          setCollapseState({ ...collapseState, type: "opening" });
        });
        break;
      case "opening":
        setDivStyle({ height: `${innerHeight}px`, transition });
        // triggers transitionEnd
        break;
      case "opened":
        setDivStyle({});
        break;
      case "start-closing":
        setDivStyle({ height: `${innerHeight}px`, transition });
        window.requestAnimationFrame(() => {
          setCollapseState({ ...collapseState, type: "closing" });
        });
        break;
      case "closing":
        setDivStyle({ height: closedHeight ?? 0, transition });
        // triggers transitionEnd
        break;
      case "closed":
        setDivStyle({ height: closedHeight ?? 0 });
        break;
    }
  }, [closedHeight, collapseState, transition]);

  const innerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!innerRef.current) {
      return;
    }

    const innerHeight = innerRef.current.clientHeight;
    if (open) {
      setCollapseState({ type: "start-opening", innerHeight });
    } else {
      setCollapseState({ type: "start-closing", innerHeight });
    }
  }, [open]);

  const handleTransitionEnd = useCallback(() => {
    setCollapseState({ type: open ? "opened" : "closed" });
  }, [open]);

  // outer hidden: hide contents after height, inner hidden: stop collapsing margins
  return (
    <div
      style={{ overflow: "hidden", ...divStyle }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div style={{ overflow: "hidden" }} ref={innerRef}>
        {children}
      </div>
    </div>
  );
};
