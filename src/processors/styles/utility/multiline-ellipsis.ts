export const multilineEllipsis = (lineNumber: number) => `
display: -webkit-box;
overflow: hidden;
-webkit-line-clamp: ${lineNumber};
-webkit-box-orient: vertical;
`;
