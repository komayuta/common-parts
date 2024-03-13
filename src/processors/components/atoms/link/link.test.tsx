import {render, screen} from "@testing-library/react";
import * as React from "react";

import {Link} from "./link";

describe("Link", () => {
    test("content rendered", () => {
        render(<Link href="#">ABC</Link>);
        expect(screen.getByText("ABC")).toBeInTheDocument();
    });
});
