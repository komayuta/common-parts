export function stripAssetUrl(assetUrlFactory: (path: string) => string, url: string) {
    const emptyAssetUrl = assetUrlFactory("");

    if (/\/assets\//.test(emptyAssetUrl)) {
        const emptyAssetUrlNoVersion = emptyAssetUrl // https://localhost/assets/hoge/12345/
            .replace(/\/+$/, "") // https://localhost/assets/hoge/12345
            .replace(/\/[^/]*$/, ""); // https://localhost/assets/hoge

        if (url.indexOf(emptyAssetUrlNoVersion) === 0) {
            return url // https://localhost/assets/hoge/98765/hoge.jpg
                .substring(emptyAssetUrlNoVersion.length) // /98765/hoge.jpg
                .replace(/^\/+[^/]*/, ""); // /hoge.jpg
        }
    }

    if (url.indexOf(emptyAssetUrl) === 0) {
        return url.substring(emptyAssetUrl.length);
    }

    return url;
}
