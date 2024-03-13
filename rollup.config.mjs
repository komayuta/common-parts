import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-ts";
import babel from "@rollup/plugin-babel";
import wyw from "@wyw-in-js/rollup";
import css from "rollup-plugin-css-only";
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";

// 共通の設定を関数として定義
function createConfig(inputFile, outputFile) {
  return {
    input: inputFile,
    output: [
      {
        file: `dist/esm/${outputFile}.js`,
        format: "esm",
        sourcemap: true,
      },
      {
        file: `dist/cjs/${outputFile}.js`,
        format: "commonjs",
        sourcemap: true,
      },
    ],
    external: [
      "react",
      "react-dom",
      "@syginc/aomjs",
      "@syginc/aqua-ckeditor-util",
      "@syginc/aqua-ckeditor",
      "@types/ckeditor",
      "@syginc/aqua-client",
    ], //バンドルから除外
    plugins: [
      nodeResolve({ browser: true }), // node_modules内のパッケージを解決
      commonjs(), // CommonJS モジュールを ES6 に変換
      ts({ browserslist: false }),
      url(),
      wyw({
        sourceMap: process.env.NODE_ENV !== "production", // css生成
      }),
      svgr({ icon: true }), // SVGを扱えるようにする
      css({
        output: "styles.css", // css生成ディレクトリ
      }),
      babel({
        exclude: "node_modules/**", // node_modulesはトランスパイルから除外
        extensions: [".js", ".jsx", ".ts", ".tsx"], // トランスパイルするファイルの拡張子
      }),
    ],
  };
}

// 具体的な設定
export default [
  createConfig("src/processors/processors.ts", "processors"),
  createConfig("src/plugins/plugins.ts", "plugins"),
];
