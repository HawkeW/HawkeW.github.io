import {sidebar} from "vuepress-theme-hope";

export const mySideBar = sidebar({
  "/": [
    "",
    {
      text: "技术路线",
      link: "/roadmap/README.md",
      icon: "creative",
      activeMatch: "^/roadmap/$",
    },
    {
      text: "Articles",
      icon: "note",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
});
