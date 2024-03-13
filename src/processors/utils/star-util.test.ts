import {rateToColor, rateToStars, showRate} from "./star-util";

describe("star-util", () => {
    describe("rateToStars", () => {
        it("rateToStars generates stars that described starCount", () => {
            expect(rateToStars(0, 5)).toEqual(["empty", "empty", "empty", "empty", "empty"]);
        });

        it("rateToStars generates full stars", () => {
            expect(rateToStars(2, 3)).toEqual(["full", "full", "empty"]);
            expect(rateToStars(1.75, 3)).toEqual(["full", "full", "empty"]);
        });

        it("rateToStars generates a half star", () => {
            expect(rateToStars(2.5, 3)).toEqual(["full", "full", "half"]);
            expect(rateToStars(1.25, 3)).toEqual(["full", "half", "empty"]);
        });
    });
    describe("rateToColor", () => {
        it("rateToColor generates blue", () => {
            expect(rateToColor(3.49)).toBe("blue");
            expect(rateToColor(2)).toBe("blue");
            expect(rateToColor(0)).toBe("blue");
            expect(rateToColor(-1)).toBe("blue");
        });
        it("rateToColor generates yellow", () => {
            expect(rateToColor(3.5)).toBe("yellow");
            expect(rateToColor(3.83)).toBe("yellow");
            expect(rateToColor(3.99)).toBe("yellow");
        });
        it("rateToColor generates red", () => {
            expect(rateToColor(4)).toBe("red");
            expect(rateToColor(4.2)).toBe("red");
            expect(rateToColor(5)).toBe("red");
            expect(rateToColor(10)).toBe("red");
        });
    });
    describe("showRate", () => {
        describe("when decimal = 1", () => {
            it("returns strings with a value of first decimal place whatever the value of n.", () => {
                const decimal = 1;
                expect(showRate(3, decimal)).toBe("3.0");
                expect(showRate(3.0, decimal)).toBe("3.0");
                expect(showRate(3.0, decimal)).toBe("3.0");
                expect(showRate(3.5, decimal)).toBe("3.5");
                expect(showRate(3.5, decimal)).toBe("3.5");
                expect(showRate(3.92, decimal)).toBe("3.9");
                expect(showRate(3.97, decimal)).toBe("4.0");
            });
        });
        describe("when decimal = 2", () => {
            const decimal = 2;
            describe("returns strings with a value of first decimal place", () => {
                it("when the value of n is integer.", () => {
                    expect(showRate(3, decimal)).toBe("3.0");
                    expect(showRate(3.0, decimal)).toBe("3.0");
                });
                it("when the value of n multiplid by 10 is integer.", () => {
                    expect(showRate(3.5, decimal)).toBe("3.5");
                });
            });
            describe("returns strings with a value of second decimal place", () => {
                it("when the value of n is the other than those above.", () => {
                    expect(showRate(3.92, decimal)).toBe("3.92");
                    expect(showRate(3.97, decimal)).toBe("3.97");
                });
            });
        });
    });
});
