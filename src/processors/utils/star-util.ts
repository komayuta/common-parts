export type StarType = "full" | "half" | "empty";

export function rateToStars(rate: number, starCount: number): StarType[] {
    return Array(Math.floor(starCount))
        .fill(0)
        .map((_, i) => {
            if (i + 0.75 <= rate) {
                return "full";
            } else if (i + 0.25 <= rate) {
                return "half";
            } else {
                return "empty";
            }
        });
}

export type StarColorType = "red" | "yellow" | "blue";

export function rateToColor(rate: number): StarColorType {
    if (rate < 3.5) {
        return "blue";
    } else if (4 <= rate) {
        return "red";
    } else {
        return "yellow";
    }
}

export function clipNumber(n: number, rangeStart?: number, rangeEnd?: number) {
    if (isNaN(n) || rangeStart === undefined || rangeEnd === undefined) {
        return undefined;
    }
    return Math.max(Math.min(n, rangeEnd), rangeStart);
}

export function showRate(n: number, decimal: 1 | 2) {
    if (decimal === 1) {
        return n.toFixed(1);
    }
    if (decimal === 2) {
        if (Number.isInteger(n)) {
            return n.toFixed(1);
        }
        if (Number.isInteger(n * 10)) {
            return n.toFixed(1);
        }
        return n.toFixed(2);
    }
}
