import {stripAssetUrl} from "./asset-url-util";

// ASSET_PREFIX is created in deploy step of publish job.
// see .circleci/config.yml
// "assets/${CIRCLE_TAG:1}" or "assets/build/$CIRCLE_BUILD_NUM"

// emptyAssetUrl example:
//  https://example.com/assets/build/12345 <- editor, cloud, non-tagged build
//  https://example.com/assets/1.2.3 <- editor, cloud, tagged-build
//  https://localhost:4000 <- local
//  /assets/build/12345 <- site, cloud, non-tagged-build
//  /assets/1.2.3 <- site, cloud, tagged-build

describe("asset-url-util", () => {
    describe("stripAssetUrl", () => {
        test("localhost", () => {
            expect(
                stripAssetUrl(
                    () => "http://localhost:3000",
                    "http://localhost:3000/images/article/no-image.svg",
                ),
            ).toEqual("/images/article/no-image.svg");
        });

        test("localhost with trailing slash", () => {
            expect(
                stripAssetUrl(
                    () => "http://localhost:3000/",
                    "http://localhost:3000//images/article/no-image.svg",
                ),
            ).toEqual("/images/article/no-image.svg");
        });

        test("siteurl/assets/version emptyAssetUrl and url have same version", () => {
            expect(
                stripAssetUrl(
                    () => "https://example.com/assets/1.7.2",
                    "https://example.com/assets/1.7.2/images/article/no-image.svg",
                ),
            ).toEqual("/images/article/no-image.svg");
        });

        test("siteurl/assets/version emptyAssetUrl and url have different version", () => {
            expect(
                stripAssetUrl(
                    () => "https://example.com/assets/2.8.0",
                    "https://example.com/assets/1.7.2/images/article/no-image.svg",
                ),
            ).toEqual("/images/article/no-image.svg");
        });

        test("/assets/version emptyAssetUrl and url have same version", () => {
            expect(
                stripAssetUrl(() => "/assets/1.7.2", "/assets/1.7.2/images/article/no-image.svg"),
            ).toEqual("/images/article/no-image.svg");
        });

        test("/assets/version emptyAssetUrl and url have different version", () => {
            expect(
                stripAssetUrl(() => "/assets/2.8.0", "/assets/1.7.2/images/article/no-image.svg"),
            ).toEqual("/images/article/no-image.svg");
        });

        test("siteurl/assets/build/version emptyAssetUrl and url have same version", () => {
            expect(
                stripAssetUrl(
                    () => "https://example.com/assets/build/12345",
                    "https://example.com/assets/build/12345/images/article/no-image.svg",
                ),
            ).toEqual("/images/article/no-image.svg");
        });

        test("siteurl/assets/build/version emptyAssetUrl and url have different version", () => {
            expect(
                stripAssetUrl(
                    () => "https://example.com/assets/build/12345",
                    "https://example.com/assets/build/54321/images/article/no-image.svg",
                ),
            ).toEqual("/images/article/no-image.svg");
        });

        test("/assets/build/version emptyAssetUrl and url have same version", () => {
            expect(
                stripAssetUrl(
                    () => "/assets/build/12345",
                    "/assets/build/12345/images/article/no-image.svg",
                ),
            ).toEqual("/images/article/no-image.svg");
        });

        test("/assets/build/version emptyAssetUrl and url have different version", () => {
            expect(
                stripAssetUrl(
                    () => "/assets/build/12345",
                    "/assets/build/54321/images/article/no-image.svg",
                ),
            ).toEqual("/images/article/no-image.svg");
        });

        test("src is external site", () => {
            expect(
                stripAssetUrl(
                    () => "https://example.com/assets/1.7.2",
                    "https://example.com/image/image.svg",
                ),
            ).toEqual("https://example.com/image/image.svg");
        });

        test("emptyAssetUrl is empty", () => {
            expect(stripAssetUrl(() => "", "https://example.com/image/image.svg")).toEqual(
                "https://example.com/image/image.svg",
            );
        });

        test("src is empty", () => {
            expect(stripAssetUrl(() => "https://example.com/assets/1.7.2", "")).toEqual("");
        });

        test("emptyAssetUrl and src is empty", () => {
            expect(stripAssetUrl(() => "", "")).toEqual("");
        });
    });
});
