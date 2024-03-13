import * as React from "react";

interface HalfStarSvgProps {
    className: string;
}

export const HalfStarSvg: React.VFC<HalfStarSvgProps> = ({className}) => {
    return (
        <svg className={className} width="17" height="16" viewBox="0 0 17 16">
            <path
                d="M8.19908 0.368652L10.6357 5.30662L16.0847 6.09833L12.1419 9.94178L13.0724 15.3687L8.19908 12.8058L3.32578 15.3687L4.25628 9.94178L0.313477 6.09833L5.76243 5.30662L8.19908 0.368652Z"
                fill="#DDDDDD"
            />
            <path
                d="M5.76243 5.30662L0.313477 6.09833L4.25628 9.94178L3.32578 15.3687L8.19908 12.8058V0.368652L5.76243 5.30662Z"
                fill="currentColor"
            />
        </svg>
    );
};
