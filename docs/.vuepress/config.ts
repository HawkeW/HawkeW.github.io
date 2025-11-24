import { viteBundler } from '@vuepress/bundler-vite'
import UnoCSS from 'unocss/vite'
import { defineUserConfig } from "vuepress/cli";
import theme from "./theme.js";
import { getDirname, path } from "vuepress/utils";
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { markdownIncludePlugin } from '@vuepress/plugin-markdown-include'
import { revealJsPlugin } from '@vuepress/plugin-revealjs'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { markdownTabPlugin } from '@vuepress/plugin-markdown-tab'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance';
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",
  bundler: viteBundler({
    viteOptions: {
      plugins: [
        UnoCSS(),
      ]
    },
    vuePluginOptions: {},
  }),
  dest: "./dist",
  alias: {
    "@components": path.resolve(__dirname, "components/src"),
  },
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Once°",
      description: "feedId:73967150202997760+userId:73595302294285312",
    },
  },

  theme,

  shouldPrefetch: false,
  
  plugins: [
    // mdEnhancePlugin({
    //   demo: true,
    //   // chartjs: true,
    //   // echarts: true,
    //   // flowchart: true,
    //   // mermaid: true,
    //   playground: {
    //     presets: ["ts", "vue"],
    //   },
    //   vuePlayground: true,
    // }),
    // revealJsPlugin({
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // }),
    // markdownIncludePlugin({
    //   deep: true,
    //   resolvePath: (file) => {
    //     if (file.startsWith("@components/")) 
    //       return file.replace(
    //         "@components",
    //         path.resolve(__dirname, "../../../components/src"),
    //       );
    //     return file;
    //   },
    //   resolveLinkPath: false,
    // }),
    // markdownTabPlugin({
    //   tabs: true,
    //   codeTabs: true,  
    // }),
    // markdownMathPlugin({
    //   type: 'katex'
    // }),
    // markdownExtPlugin({
    //   gfm: true,
    //   vPre: true,
    // }),
    // markdownStylizePlugin({
    //   sub: true,
    //   sup: true,
    //   mark: true,
    //   attrs: true,
    //   align: true,
    //   custom: [
    //     {
    //       matcher: /^Recommanded$/,
    //       replacer: ({ tag }) => ({
    //         tag: 'Badge',
    //         attrs: { type: 'tip' },
    //         content: 'Recommanded',
    //       }),
    //     },
    //   ],
    // }),
  ]
});
