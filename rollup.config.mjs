import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import externals from "rollup-plugin-node-externals";
import ts from "rollup-plugin-ts";

export default {
    input: "src/index.ts",
    output: [
        {
            dir: "dist/esm",
            format: "esm",
            sourcemap: true,
        },
        {
            dir: "dist/cjs",
            format: "commonjs",
            sourcemap: true,
        },
    ],
    plugins: [
        externals({deps: true}),
        nodeResolve({browser: true}),
        commonjs(),

        ts({browserslist: false}),

        replace({
            "process.env.NODE_ENV": JSON.stringify("production"),
            "preventAssignment": true,
        }),
    ],
};
