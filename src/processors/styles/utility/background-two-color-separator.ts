export const backgroundTwoColorSeparator = (
    colorLeft: string,
    colorRight: string,
    point: number,
) => `
background: linear-gradient(to right, ${colorLeft} 0% ${point}%, ${colorRight} ${point}% 100%);
`;
