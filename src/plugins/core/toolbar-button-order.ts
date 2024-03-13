let seq = 1;
export const TOOLBAR_GROUP_INSERT_ELEMENT = "custom-group-insert-element";
export const TOOLBAR_GROUP_ELEMENTS = "custom-group-elements";
export const TOOLBAR_GROUP_OUTLINE = "custom-group-outline";
export const TOOLBAR_GROUP_TABLE_SCROLL = "custom-group-table-scroll";
export const TOOLBAR_GROUP_OTHERS = "custom-group-others";
export const TOOLBAR_GROUPS = [
    TOOLBAR_GROUP_INSERT_ELEMENT,
    TOOLBAR_GROUP_ELEMENTS,
    TOOLBAR_GROUP_OUTLINE,
    TOOLBAR_GROUP_TABLE_SCROLL,
    TOOLBAR_GROUP_OTHERS,
];

export const TOOLBAR_BUTTON_INSERT_ELEMENT = `${TOOLBAR_GROUP_INSERT_ELEMENT},${seq++}`;
export const TOOLBAR_BUTTON_LINK_BUTTON = `${TOOLBAR_GROUP_ELEMENTS},${seq++}`;

export const TOOLBAR_BUTTON_IMAGE_CONTAINER = `${TOOLBAR_GROUP_ELEMENTS},${seq++}`;
export const TOOLBAR_BUTTON_GALLERY = `${TOOLBAR_GROUP_ELEMENTS},${seq++}`;
export const TOOLBAR_BUTTON_COMMENT = `${TOOLBAR_GROUP_ELEMENTS},${seq++}`;
export const TOOLBAR_BUTTON_BLOCK = `${TOOLBAR_GROUP_ELEMENTS},${seq++}`;
export const TOOLBAR_BUTTON_YOUTUBE = `${TOOLBAR_GROUP_ELEMENTS},${seq++}`;
export const TOOLBAR_BUTTON_RATING_STAR = `${TOOLBAR_GROUP_ELEMENTS},${seq++}`;
export const TOOLBAR_BUTTON_CONVERSATION = `${TOOLBAR_GROUP_ELEMENTS},${seq++}`;
export const TOOLBAR_BUTTON_TABLE_EXPANSION = `${TOOLBAR_GROUP_ELEMENTS},${seq++}`;
export const TOOLBAR_BUTTON_TWITTER_BOX = `${TOOLBAR_GROUP_ELEMENTS},${seq++}`;

export const TOOLBAR_BUTTON_OUTLINE_GENERATE = `${TOOLBAR_GROUP_OUTLINE},${seq++}`;
export const TOOLBAR_BUTTON_OUTLINE_ENABLE = `${TOOLBAR_GROUP_OUTLINE},${seq++}`;

export const TOOLBAR_BUTTON_TABLE_SCROLL = `${TOOLBAR_GROUP_TABLE_SCROLL},${seq++}`;
export const TOOLBAR_BUTTON_REPLACE_ALT = `${TOOLBAR_GROUP_OTHERS},${seq++}`;
