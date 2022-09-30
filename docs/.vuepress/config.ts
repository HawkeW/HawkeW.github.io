import {defineUserConfig} from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

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
