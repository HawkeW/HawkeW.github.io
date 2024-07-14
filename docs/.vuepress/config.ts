import { viteBundler } from '@vuepress/bundler-vite'
import {defineUserConfig} from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  bundler: viteBundler({
    viteOptions: {},
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
