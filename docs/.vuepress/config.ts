import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Once°",
      description: "Once I live, once I aim",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Once°",
      description: "曾梦想仗剑走天涯",
    },
  },
  
  theme,

  shouldPrefetch: false,

});
