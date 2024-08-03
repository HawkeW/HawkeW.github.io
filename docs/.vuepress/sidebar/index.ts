import {sidebar} from "vuepress-theme-hope";

export const mySideBar = sidebar({
  "/": [
    {
      text: "学习笔记",
      link: "/roadmap/README.md",
      icon: "creative",
      children: "structure",
    },
  ],
});
