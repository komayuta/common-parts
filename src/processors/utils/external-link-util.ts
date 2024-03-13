export function isExternalSite(url?: string) {
    return /^https?:\/\/*/.test(url ?? "");
}
