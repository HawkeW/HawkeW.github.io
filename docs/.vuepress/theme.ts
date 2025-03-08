import {enNavbar} from "./navbar/index.js";
import {mySideBar} from "./sidebar/index.js";
import { hopeTheme } from "vuepress-theme-hope";
import { path } from 'vuepress/utils'
import {mdEnhancePlugin} from 'vuepress-plugin-md-enhance'

export default hopeTheme({
  encrypt: {
    config: {
      // 这会加密整个 guide 目录，并且两个密码都是可用的
      "/ideas/": ["1234", "5678"],
    },
  },
  hostname: "https://oncew.com",

  author: {
    name: "一度一度",
    url: "https://oncew.com",
  },

  logo: "/logo.jpg",

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "docs",

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    medias: {},
  },

  locales: {
    "/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: mySideBar,

      footer: "",

      displayFooter: true,

      blog: {
        description: "无限进步",
        intro: "/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },
  },

  plugins: {
    blog: {
      excerpt: false,
    },

    // If you don't need comment feature, you can remove following option
    // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.
    // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",

      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },
    icon: {
      assets: "/iconfont",
    },
    feed: {
      rss: true,
    },
    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cacheImage: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [],
        shortcuts: [
          {
            name: "Demo",
            short_name: "Demo",
            url: "/demo/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
    markdown: {
      chartjs: true,
      demo: true,
      echarts: true,
      flowchart: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      vuePlayground: true,
      align: true,
      attrs: true,
      sub: true,
      sup: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({tag}) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: {type: "tip"},
                content: "Recommanded",
              };
          },
        },
      ],
      gfm: true,
      vPre: true,
      tabs: true,
      codeTabs: true,  
      katex: true,
      lazyload: true,
      include: {
        deep: true,
        resolvePath: (file) => {
          if (file.startsWith("@components/")) 
            return file.replace(
              "@components",
              path.resolve(__dirname, "../../../components/src"),
            );
          return file;
        },
        resolveLinkPath: false,
      },
      revealJs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      }
    },
  },
});