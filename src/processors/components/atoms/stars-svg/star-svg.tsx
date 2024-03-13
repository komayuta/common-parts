import * as React from "react";

interface FullStarSvgProps {
    className: string;
    fillCurrentColor?: boolean;
}

export const StarSvg: React.VFC<FullStarSvgProps> = ({className, fillCurrentColor}) => {
    return (
        <svg className={className} width="17" height="16" viewBox="0 0 17 16">
            <path
                d="M8.4276 0.368652L10.8643 5.30662L16.3132 6.09833L12.3704 9.94178L13.3009 15.3687L8.4276 12.8058L3.55429 15.3687L4.4848 9.94178L0.541992 6.09833L5.99095 5.30662L8.4276 0.368652Z"
                fill={fillCurrentColor ? "currentColor" : "#dddddd"}
            />
        </svg>
    );
};
