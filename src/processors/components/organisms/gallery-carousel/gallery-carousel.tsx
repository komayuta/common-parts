import classNames from "classnames";
import {styled} from "linaria/react";
import * as React from "react";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    articleBorderColor,
    articleGalleryCarouselArrowZindex,
    articleTextColor,
    mediaMiddleUp,
    mediaUpToSmall,
} from "../../../styles/common-variables";
import {GalleryCarouselItemType} from "./gallery-carousel-item";

const GalleryCarouselSlideAreaDiv = styled.div`
    display: grid;
`;

const GalleryCarouselSlideDiv = styled.div`
    grid-column: 1 / 3;
    grid-row: 1 / 2;
`;

const GalleryCarouselSlideControlLeftDiv = styled.div`
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    z-index: ${articleGalleryCarouselArrowZindex};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    pointer-events: none;
    ${mediaUpToSmall} {
        padding-left: 6px;
    }
    ${mediaMiddleUp} {
        padding-left: 8px;
    }
`;

const GalleryCarouselSlideControlRightDiv = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    z-index: ${articleGalleryCarouselArrowZindex};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    pointer-events: none;
    ${mediaUpToSmall} {
        padding-right: 6px;
    }
    ${mediaMiddleUp} {
        padding-right: 8px;
    }
`;

const carouselButtonSVG = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="18.5" width="18" height="18" rx="4" transform="rotate(-90 0 18.5)" fill="none"/>
<path d="M2.8 5.5L6.26667 9.5L2.8 13.5" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M7.26666 5.5L10.7333 9.5L7.26666 13.5" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M11.7333 5.5L15.2 9.5L11.7333 13.5" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
</svg>
`;

const GalleryCarouselButton = styled.button<{reverse: boolean}>`
    width: 18px;
    height: 18px;
    background-image: url("data:image/svg+xml;utf8,${encodeURIComponent(carouselButtonSVG)}");
    border: none;
    background-color: rgb(220, 122, 80, 1);
    background-position: center;
    background-repeat: no-repeat;
    transform: rotate(${(props) => (props.reverse ? 180 : 0)}deg);

    cursor: pointer;
    transition: all 0.25s ease-in;

    &:hover {
        background-color: rgb(220, 122, 80, 0.5);
    }
    pointer-events: auto;
`;

const GalleryCarouselThumbsAreaDiv = styled.div`
    ${mediaUpToSmall} {
        margin: 4px 0;
    }
    ${mediaMiddleUp} {
        margin: 6px 0;
    }
`;

const GalleryCarouselThumbsDiv = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
`;

const GalleryCarouselThumbsUl = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    ul& {
        list-style: none;
        padding-left: 0;
    }
    ${mediaUpToSmall} {
        gap: 4px;
    }
    ${mediaMiddleUp} {
        gap: 6px;
    }
`;

const GalleryCarouselThumbsLi = styled.li`
    border: 2px solid transparent;
    &:hover {
        border-color: ${articleBorderColor};
    }
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: transparent;
    overflow: hidden;
    transition: border 0.15s ease-in;
    &.selected {
        border-color: ${articleTextColor};
    }
`;
const GalleryCarouselItemConteinerDiv = styled.div`
    overflow-x: hidden;
    width: 100%;
`;

const GalleryCarouselItemInnerDiv = styled.div<{isTransition: boolean}>`
    width: 100%;
    flex-direction: row;
    display: flex;
    overflow-x: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: ${(props) => (props.isTransition ? "smooth" : "auto")};

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const GalleryCarouselItemDiv = styled.div`
    width: 100%;
    flex-shrink: 0;
    overflow: auto;
    scroll-snap-align: center;
    scroll-snap-stop: always;
`;
export interface GalleryCarouselProps {
    children?: ReactNode;
}

const GalleryCarouselItemTypeContext = createContext<{itemType: GalleryCarouselItemType}>({
    itemType: "normal",
});

export const useGalleryCarouselItemType = () => {
    return useContext(GalleryCarouselItemTypeContext);
};

export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({children}) => {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [sliding, setSliding] = useState<boolean>(false);
    const [isTransition, setIsTransition] = useState<boolean>(false);
    const [carouselItemSize, setCarouselItemSize] = useState<number>(0);

    const refSlider = useRef<HTMLDivElement>(null);

    const itemElements = React.Children.toArray(children).filter((x) => React.isValidElement(x));

    const allItemElements = [
        itemElements[itemElements.length - 1],
        ...itemElements,
        itemElements[0],
    ];
    const mod = useCallback((n, m) => {
        const q = n % m;
        return q < 0 ? q + m : q;
    }, []);

    useEffect(() => {
        //init
        setSlideIndex(1);
    }, []);

    useEffect(() => {
        //auto play
        const intervalId = setInterval(() => {
            setSlideIndex((prev) => {
                return allItemElements.length - 1 >= prev + 1 ? prev + 1 : prev;
            });
        }, 2000);
        return () => clearInterval(intervalId);
    });

    useEffect(() => {
        //carouselItemSize observation
        const onResize = () => {
            if (!refSlider.current) {
                return;
            }
            setCarouselItemSize(refSlider.current.clientWidth);
        };
        onResize();

        window.addEventListener("resize", onResize);
        window.addEventListener("load", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("load", onResize);
        };
    }, [carouselItemSize]);

    useEffect(() => {
        //slide move
        if (!refSlider.current) {
            return;
        }
        refSlider.current.scrollTo({
            left: slideIndex * carouselItemSize,
        });
        const eleRef = refSlider.current;

        //infinite loop
        let timeoutId: NodeJS.Timeout;
        const handleScrollEnd = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setSliding(false);
                if (slideIndex >= allItemElements.length - 1) {
                    setIsTransition(false);
                    setSlideIndex(1);
                }
                if (slideIndex <= 0) {
                    setIsTransition(false);
                    setSlideIndex(allItemElements.length - 2);
                }
                setIsTransition(true);
            }, 100);
        };
        eleRef.addEventListener("scroll", handleScrollEnd);

        return () => {
            eleRef.removeEventListener("scroll", handleScrollEnd);
        };
    }, [allItemElements.length, carouselItemSize, slideIndex]);

    return (
        <div>
            <GalleryCarouselSlideAreaDiv>
                <GalleryCarouselSlideDiv>
                    <GalleryCarouselItemConteinerDiv>
                        <GalleryCarouselItemInnerDiv ref={refSlider} isTransition={isTransition}>
                            {allItemElements.map((item, i) => {
                                return (
                                    <GalleryCarouselItemDiv key={i}>
                                        <GalleryCarouselItemTypeContext.Provider
                                            value={{itemType: "normal"}}
                                        >
                                            {item}
                                        </GalleryCarouselItemTypeContext.Provider>
                                    </GalleryCarouselItemDiv>
                                );
                            })}
                        </GalleryCarouselItemInnerDiv>
                    </GalleryCarouselItemConteinerDiv>
                </GalleryCarouselSlideDiv>
                <GalleryCarouselSlideControlLeftDiv>
                    <GalleryCarouselButton
                        reverse={true}
                        onClick={() => {
                            if (sliding) {
                                return;
                            }
                            setSliding(true);
                            setIsTransition(true);
                            setSlideIndex((prev) => prev - 1);
                        }}
                    />
                </GalleryCarouselSlideControlLeftDiv>
                <GalleryCarouselSlideControlRightDiv>
                    <GalleryCarouselButton
                        reverse={false}
                        onClick={() => {
                            if (sliding) {
                                return;
                            }
                            setSliding(true);
                            setIsTransition(true);
                            setSlideIndex((prev) => prev + 1);
                        }}
                    />
                </GalleryCarouselSlideControlRightDiv>
            </GalleryCarouselSlideAreaDiv>
            <GalleryCarouselThumbsAreaDiv>
                <GalleryCarouselThumbsUl>
                    {itemElements.map((item, i) => {
                        return (
                            <GalleryCarouselThumbsLi
                                key={i}
                                className={classNames({
                                    selected: mod(slideIndex - 1, itemElements.length) === i,
                                })}
                                onClick={() => {
                                    setSlideIndex(
                                        (prev) =>
                                            prev + (i - mod(slideIndex - 1, itemElements.length)),
                                    );
                                }}
                            >
                                <GalleryCarouselThumbsDiv>
                                    <GalleryCarouselItemTypeContext.Provider
                                        value={{itemType: "thumbnail"}}
                                    >
                                        {item}
                                    </GalleryCarouselItemTypeContext.Provider>
                                </GalleryCarouselThumbsDiv>
                            </GalleryCarouselThumbsLi>
                        );
                    })}
                </GalleryCarouselThumbsUl>
            </GalleryCarouselThumbsAreaDiv>
        </div>
    );
};
