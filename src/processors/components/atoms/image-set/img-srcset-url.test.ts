import {generateSrcSet, optimizeImageUrl} from "./img-srcset-url";

describe("generate-srcset", () => {
    test("generate srcset from list", () => {
        expect(
            generateSrcSet([
                ["https://example.com/1.jpg", "100w"],
                ["https://example.com/2.jpg", "200w"],
                [undefined, "300w"],
            ]),
        ).toEqual("https://example.com/1.jpg 100w,https://example.com/2.jpg 200w");
    });

    test("non-imagefront url returns undefined", () => {
        expect(optimizeImageUrl("https://example.com", [100], 100)).toBeUndefined();
    });

    test("imagefront url returns images of widths", () => {
        expect(optimizeImageUrl("https://localhost/c/test1/hogehoge.jpg", [100, 200], 150)).toEqual(
            {
                srcSet: "https://localhost/c/s100/hogehoge.webp 100w,https://localhost/c/s200/hogehoge.webp 200w",
                src: "https://localhost/c/s150/hogehoge.jpg",
            },
        );
    });
});
