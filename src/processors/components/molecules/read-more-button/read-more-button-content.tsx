import classNames from "classnames";

export interface ReadMoreButtonContentProps {
    open?: boolean;
}

export const ReadMoreButtonContent: React.VFC<ReadMoreButtonContentProps> = ({open}) => (
    <div className="read-more-button-content">
        <span className="read-more-button-text">{open ? "閉じる" : "続きを読む"}</span>
        <i
            className={classNames(
                "read-more-button-icon",
                open ? "article-icon-read-more-button-close" : "article-icon-read-more-button-open",
            )}
        />
    </div>
);
