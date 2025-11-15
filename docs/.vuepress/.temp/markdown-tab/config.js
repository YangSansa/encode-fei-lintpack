import { CodeTabs } from "D:/前端提升教程/前端编码规范工程化/01-fei-spec/node_modules/.pnpm/@vuepress+plugin-markdown-t_72e760bdbdbe2c17ca7c7575caefe3e6/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "D:/前端提升教程/前端编码规范工程化/01-fei-spec/node_modules/.pnpm/@vuepress+plugin-markdown-t_72e760bdbdbe2c17ca7c7575caefe3e6/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "D:/前端提升教程/前端编码规范工程化/01-fei-spec/node_modules/.pnpm/@vuepress+plugin-markdown-t_72e760bdbdbe2c17ca7c7575caefe3e6/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
