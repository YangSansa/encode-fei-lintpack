import { GitContributors } from "D:/前端提升教程/前端编码规范工程化/01-fei-spec/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_6c909dbfa1e484b81c93de444397d7dc/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "D:/前端提升教程/前端编码规范工程化/01-fei-spec/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_6c909dbfa1e484b81c93de444397d7dc/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
