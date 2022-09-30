import {navbar} from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {text: "RoadMap", icon: "discover", link: "/roadmap/"},
  {
    text: "Posts",
    icon: "edit",
    prefix: "/",
    children: [],
  },
]);
