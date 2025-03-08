import { viteBundler } from '@vuepress/bundler-vite'
import UnoCSS from 'unocss/vite'
import { defineUserConfig } from "vuepress/cli";
import theme from "./theme.js";
import { getDirname, path } from "vuepress/utils";
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { markdownIncludePlugin } from '@vuepress/plugin-markdown-include'
import {markdownImagePlugin} from '@vuepress/plugin-markdown-image'
import { revealJsPlugin } from '@vuepress/plugin-revealjs'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { markdownTabPlugin } from '@vuepress/plugin-markdown-tab'
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
      description: "Home",
    },
  },

  theme,

  shouldPrefetch: false,
  plugins: [
  ]
});
