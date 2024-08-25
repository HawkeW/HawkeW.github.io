import { defineClientConfig } from "vuepress/client";
import BasicLayout from './layout/BasicLayout.vue'
import ResumeLayout from './layout/ResumePage.vue'
import 'uno.css'
import '/fonts/PingFangSC-Thin.subset.otf';

export default defineClientConfig({
  // 你可以在这里添加或覆盖布局
  layouts: {
    BasicLayout,
    ResumeLayout
  },
});