import {ICustomContainerProps} from "@syginc/aomjs";
import * as React from "react";

import {ComponentEditMode} from "../../../utils/component-mode-util";
import {rateToColor, rateToStars, showRate} from "../../../utils/star-util";
import {HalfStarSvg} from "../../atoms/stars-svg/half-star-svg";
import {StarSvg} from "../../atoms/stars-svg/star-svg";

export const ArticleRatingStarsTypeList = ["normal", "single", "number-top"] as const;

export type ArticleRatingStarsType = (typeof ArticleRatingStarsTypeList)[number];

export interface IArticleRatingStarsContentProps extends ICustomContainerProps {
    numerator?: number;
    denominator?: number;
    type?: ArticleRatingStarsType;
    editMode?: ComponentEditMode;
    decimal?: 1 | 2;
}

const StarSequence: React.VFC<{numerator: number; denominator: number}> = ({
    numerator,
    denominator,
}) => {
    return (
        <>
            {rateToStars(numerator, denominator).map((x, i) =>
                x === "full" ? (
                    <StarSvg className="ratingstars-full" fillCurrentColor={true} key={i} />
                ) : x === "half" ? (
                    <HalfStarSvg className="ratingstars-half" key={i} />
                ) : (
                    <StarSvg className="ratingstars-blank" key={i} />
                ),
            )}
        </>
    );
};

export const RatingStarsContent: React.VFC<IArticleRatingStarsContentProps> = (props) => {
    const {numerator, denominator, type, decimal = 1, editMode} = props;
    if (numerator === undefined || denominator === undefined || type === undefined) {
        return <span className="ratingstars" />;
    }

    return (
        <span
            className="ratingstars"
            data-rating-numerator={numerator}
            data-rating-denominator={denominator}
            data-rating-color={rateToColor(numerator)}
            data-rating-type={type}
        >
            {editMode === "serialize" ? null : (
                <span className="ratingstars-container">
                    <StarSequence
                        numerator={type === "single" ? 1 : numerator}
                        denominator={type === "single" ? 1 : denominator}
                    />
                </span>
            )}
            <span className="ratingstars-number">{showRate(numerator, decimal)}</span>
        </span>
    );
};
