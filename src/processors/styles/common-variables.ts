export const minWidthMiddle = 768;
export const minWidthDesktop = 1040;

// https://stackoverflow.com/questions/51566916/why-does-bootstrap-use-a-0-02px-difference-between-screen-size-thresholds-in-its
const exclusiveGap = 0.02;

export const mediaUpToSmall = `@media screen and (max-width: ${minWidthMiddle - exclusiveGap}px)`;
export const mediaMiddleUp = `@media screen and (min-width: ${minWidthMiddle}px)`;
export const mediaTablet = `@media screen and ((min-width: ${minWidthMiddle}px) and (max-width: ${minWidthDesktop}px))`;
export const mediaDesktop = `@media screen and (min-width: ${minWidthDesktop}px)`;
export const screenMiddleUp = `screen and (min-width: ${minWidthMiddle}px)`;
export const screenUpToSmall = `screen and (max-width: ${minWidthMiddle}px)`;

export const darkColor12 = "#E4E2E1";
export const darkColor24 = "#C9C5C3";
export const darkColor38 = "#A9A4A1";
export const darkColor60 = "#776F6A";
export const darkColor87 = "#50433B";
export const darkColor100 = "#2b2b27";

export const themePrimaryColor = "#F9D128";
export const themeSecondaryColor = "#FCF7D7";
export const themeAltoColor20 = "#F8F7F6";
export const themeAltoColor50 = "#B9A38C";
export const themeAltoColor80 = "#827262";

export const globalBackgroundColor = "white";
export const themeBackgroundColorDeep = "#FFF3E0";
export const themeBackgroundColorLight = "#FFFCEE";
export const themeBorderColor = "#1A9AD1";

export const themeAccentColor = "#2B98C7";
export const themeAccentColorStrong = "#116F97";
export const themeAccentColorWideArea = "#FFA000";
export const themeAccentColorWideAreaDark = "#535353";

export const articleButtonLinkColor = `${themeAccentColor}`;
export const articleButtonLinkTextColor = "white";

export const articleTextColor = "#1C1C1C";
export const articleHeadlineColor = "#0c7baa";
export const articleHeadlineBackgroundColor = "#f0fbfc";
export const articleLinkColor = "#3366CC";
export const articleLinkColorHover = "#2A6496";
export const articleBorderColor = darkColor12;
export const articleBorderColorLight = "#A0D6ED";
export const articleTextColorLight = darkColor60;
export const articleTableBackgroundColor = "#F0F0F0";
export const articleBackgroundColor = "#fff5ee";
export const articleBackgroundColorGray = "#f7f7f7";
export const articleListColor = "#d2693c";

export const articleLinkButtonColorAmazon = "#F9981D";
export const articleLinkButtonColorRakuten = "#C50000";
export const articleLinkButtonColorYahoo = "#F61542";
export const articleLinkButtonColorStrong = "#009EE3";
export const articleLinkButtonColorWeak = "#39B4EA";

export const articleCriteriaBorderColor = "#98DCF9";

export const articleSimpleProductBackgroundColor = "#FFF5EE";

export const articleRatingStarsColorRed = "#F4322D";
export const articleRatingStarsColorYellow = "#F7A300";
export const articleRatingStarsColorBlue = "#538BA4";

export const mainBackgroundColor = "#ffefe8";

export const headerAccentColor = "#D2693C";
export const headerMenuBaseColor = mainBackgroundColor;

export const footerTextColor = "#3C3C3C";
export const footerTopBorderColor = "#E9E9E9";
export const footerBottomBorderColor = "#9E9E9E";
export const footerBackGroundColor = "#F6F6F6";

export const mainColumnWidthDesktop = 720;
export const articleBodyWidthDesktop = 560;
export const articleOverflowWidthDesktop = (mainColumnWidthDesktop - articleBodyWidthDesktop) / 2;

export const articleBodyPaddingWidthMobile = 24;
export const articleBodyPaddingWidthDesktop = 15;

export const articleBodyParagraphMargin = 25;

export const articleTableScrollWrapperLeftTopCellZindex = 3;
export const articleTableScrollWrapperFixedCellZindex = 2;
export const articleTableExpansionAfterZindex = -1;
export const articleGalleryCarouselArrowZindex = 1;
export const articleTableExpansionLabelZindex = 1;
export const articleTableExpansionStickyZindex = 2;
export const tableDecoratorNoteZindex = 2;

export const mainTextColor = "#1c1c1c";
export const baseTextColor = "#1E2A37";
export const subTextColor = "#646D79";
export const menuBackgroundColorNormal = "#FFFCEE";
export const bodyBackgroundColor = "#E1F2FA";
export const outlineBackgroundColor = "#F7F7F7";

export const headingLineColor = "#1A9AD1";
export const outlineDottedLineColor = "#1A9AD1";
export const accentColor = "#148ABD";
export const titleBorderColor = "#0C7BAA";

export const tableBorder = `1px solid #cccccc`;

export const normalFont =
    "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif";

export const normalFontWeight = 500;
export const strongFontWeight = 700;
