import {css} from "linaria";
import {styled} from "linaria/react";

import {ISiteArticleImgProps, SiteArticleImg} from "../../../aom/standard/img/site-article-img";
import {articleTextColorLight, mediaUpToSmall} from "../../../styles/common-variables";
import {LinkContainer} from "../../atoms/link-container/link-container";
import {useGalleryCarouselItemType} from "./gallery-carousel";
import {GalleryCarouselImageFit} from "./gallery-carousel-image-fit";

const GalleryCarouselItemDiv = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    &:before {
        display: block;
        content: "";
        padding-top: ${(9 / 16) * 100}%;
    }
`;

const ImageContainClassName = css`
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    max-width: 100%;
    max-height: 100%;
`;

const ImageHorizontalClassName = css`
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
`;

const ImageVerticalClassName = css`
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
`;

const GalleryCarouselItemFooterDiv = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 14px;
    line-height: 1.1em;
    background-color: rgba(255, 255, 255, 0.75);
    color: ${articleTextColorLight};
    ${mediaUpToSmall} {
        font-size: 6px;
    }
    font-size: 10px;
`;

const GalleryCarouselItemFooterCite = styled.cite`
    font-style: italic;
    &::before {
        content: "出典：";
    }
`;

const StyledLinkContainer = styled(LinkContainer)`
    a& {
        color: ${articleTextColorLight};
    }
`;

export type GalleryCarouselItemType = "normal" | "thumbnail";

export interface GalleryCarouselItemProps {
    carouselImageFit?: GalleryCarouselImageFit;
    image?: ISiteArticleImgProps;
    alt?: string;
    authorityTitle?: string;
    authorityUrl?: string;
    imageLinkUrl?: string;
}

export const GalleryCarouselItem: React.VFC<GalleryCarouselItemProps> = ({
    carouselImageFit,
    image,
    alt,
    imageLinkUrl,
    authorityTitle,
    authorityUrl,
}) => {
    const imageClasses: Record<GalleryCarouselImageFit, string> = {
        contain: ImageContainClassName,
        horizontal: ImageHorizontalClassName,
        vertical: ImageVerticalClassName,
    };

    const {itemType} = useGalleryCarouselItemType();

    const isExternalSite = /^https?:\/\/*/.test(imageLinkUrl ?? "");

    return (
        <GalleryCarouselItemDiv>
            <LinkContainer
                href={itemType === "thumbnail" ? undefined : imageLinkUrl}
                target={isExternalSite ? "_blank" : undefined}
                rel={isExternalSite ? "nofollow noopener" : undefined}
            >
                <SiteArticleImg
                    {...image}
                    className={imageClasses[carouselImageFit ?? "contain"]}
                    alt={alt}
                />
            </LinkContainer>
            {itemType !== "thumbnail" && authorityTitle && (
                <GalleryCarouselItemFooterDiv>
                    <GalleryCarouselItemFooterCite>
                        <StyledLinkContainer
                            href={authorityUrl}
                            target="_blank"
                            rel="nofollow noopener"
                        >
                            {authorityTitle}
                        </StyledLinkContainer>
                    </GalleryCarouselItemFooterCite>
                </GalleryCarouselItemFooterDiv>
            )}
        </GalleryCarouselItemDiv>
    );
};
