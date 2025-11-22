import comp from "D:/前端提升教程/前端编码规范工程化/01-fei-spec/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroText\":\"菲菲子的笔记\",\"tagline\":\"前端编码规范工程化\",\"actions\":[{\"text\":\"立刻进入 →\",\"link\":\"/coding/html.md\"}],\"features\":[{\"title\":\"全面的前端生态\",\"details\":\"支持前端全部生态，无需关注环境，支持直接使用\"},{\"title\":\"完善的规范配件\",\"details\":\"支持对全部前端配置实现一键接入、一键扫描、一键修复、一键升级\"},{\"title\":\"完整的测试用例\",\"details\":\"配套完整的测试用例，帮助您提升项目健壮性\"}]},\"git\":{\"updatedTime\":1763197310000,\"contributors\":[{\"name\":\"yangif\",\"username\":\"\",\"email\":\"19803006837@163.com\",\"commits\":1}],\"changelog\":[{\"hash\":\"17c6548f6592ca93d7cf8b51c68efb0f03ac483c\",\"time\":1763197310000,\"email\":\"19803006837@163.com\",\"author\":\"yangif\",\"message\":\"123\"}]},\"filePathRelative\":\"index.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
