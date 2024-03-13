import * as React from "react";

export interface ILinkProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    data?: string;
    href?: string;
    name?: string;
    rel?: string;
    target?: string;
    title?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const Link: React.FC<ILinkProps> = ({
    id,
    className,
    style,
    children,
    data,
    href,
    name,
    rel,
    target,
    title,
    onClick,
}) => {
    return (
        <a
            id={id}
            className={className}
            style={style}
            {...data}
            href={href}
            {...{name}}
            rel={rel}
            target={target}
            title={title}
            onClick={onClick}
        >
            {children}
        </a>
    );
};
