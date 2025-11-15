export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/cli/feicode-fei-lint.html", { loader: () => import(/* webpackChunkName: "cli_feicode-fei-lint.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/cli/feicode-fei-lint.html.js"), meta: {"title":""} }],
  ["/coding/css.html", { loader: () => import(/* webpackChunkName: "coding_css.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/coding/css.html.js"), meta: {"title":""} }],
  ["/coding/html.html", { loader: () => import(/* webpackChunkName: "coding_html.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/coding/html.html.js"), meta: {"title":""} }],
  ["/coding/javascript.html", { loader: () => import(/* webpackChunkName: "coding_javascript.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/coding/javascript.html.js"), meta: {"title":""} }],
  ["/coding/node.html", { loader: () => import(/* webpackChunkName: "coding_node.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/coding/node.html.js"), meta: {"title":""} }],
  ["/coding/typescript.html", { loader: () => import(/* webpackChunkName: "coding_typescript.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/coding/typescript.html.js"), meta: {"title":""} }],
  ["/engineering/changelog.html", { loader: () => import(/* webpackChunkName: "engineering_changelog.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/engineering/changelog.html.js"), meta: {"title":""} }],
  ["/engineering/doc.html", { loader: () => import(/* webpackChunkName: "engineering_doc.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/engineering/doc.html.js"), meta: {"title":""} }],
  ["/engineering/git.html", { loader: () => import(/* webpackChunkName: "engineering_git.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/engineering/git.html.js"), meta: {"title":""} }],
  ["/npm/commitlint.html", { loader: () => import(/* webpackChunkName: "npm_commitlint.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/npm/commitlint.html.js"), meta: {"title":""} }],
  ["/npm/eslint-plugin.html", { loader: () => import(/* webpackChunkName: "npm_eslint-plugin.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/npm/eslint-plugin.html.js"), meta: {"title":""} }],
  ["/npm/eslint.html", { loader: () => import(/* webpackChunkName: "npm_eslint.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/npm/eslint.html.js"), meta: {"title":""} }],
  ["/npm/markdownlint.html", { loader: () => import(/* webpackChunkName: "npm_markdownlint.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/npm/markdownlint.html.js"), meta: {"title":""} }],
  ["/npm/stylelint.html", { loader: () => import(/* webpackChunkName: "npm_stylelint.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/npm/stylelint.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
