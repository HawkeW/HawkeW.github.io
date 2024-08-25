import { viteBundler } from '@vuepress/bundler-vite'
import UnoCSS from 'unocss/vite'
import { defineUserConfig } from "vuepress/cli";
import theme from "./theme.js";
import { getDirname, path } from "vuepress/utils";
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
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Once°",
      description: "Home",
    },
  },

  theme,

  shouldPrefetch: false,
});
