import {render} from "@testing-library/react";
import * as React from "react";

import {LinkContainer} from "./link-container";

describe("LinkContainer", () => {
    test("renders <a> if href exists", () => {
        // act
        const element = render(
            <LinkContainer href={"/abc"} className={"test-class"}>
                <b>test</b>
            </LinkContainer>,
        ).container.firstChild as Element;

        // assert
        expect(element.tagName.toLowerCase()).toBe("a");
        expect(element).toContainHTML("<b>test</b>");
        expect(element).toHaveAttribute("class", "test-class");
        expect(element).toHaveAttribute("href", "/abc");

        expect(element).toMatchSnapshot();
    });

    test("does not render <a> if href is invalid", () => {
        // act
        const element = render(
            <LinkContainer href={""} className={"test-class"}>
                <b>test</b>
            </LinkContainer>,
        ).container.firstChild as Element;

        // assert
        expect(element.tagName.toLowerCase()).toBe("b");
        expect(element).toContainHTML("test");

        expect(element).toMatchSnapshot();
    });
});
