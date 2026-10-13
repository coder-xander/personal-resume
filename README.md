# Xander 的个人主页

简单的个人介绍页面，包含介绍、技术方向、个人签名和 GitHub 链接。内容来自 [GitHub Profile](https://github.com/coder-xander) 和 [Profile README](https://github.com/coder-xander/coder-xander/blob/main/README.md)，于 2026 年 10 月 13 日核对。页面暂不展示项目、工作经历或教育信息。

访问：[个人主页](https://coder-xander.github.io/personal-resume/)。

## 修改内容

编辑 `profile.js` 中的 `window.PROFILE`，可以修改介绍、技术方向、个人签名和链接。`index.html` 保留了相同内容作为不启用 JavaScript 时的默认展示。更新个人资料时，也应同步修改 HTML 中的默认文字、标题和描述。

`style.css` 提供响应式布局、浅色、深色和打印样式。`app.js` 渲染配置文件并保存主题选择。所有样式、脚本和图标均在站点本地，不加载第三方字体或 CDN 脚本。图示由 CSS 绘制。

## 本地预览

直接用 Chrome 打开 `index.html`，或在仓库目录运行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:4173/`。无需安装依赖或构建。

## 自动发布

推送到 `main` 会触发 `.github/workflows/pages.yml`。工作流先检查 JavaScript 语法、资源文件和页面锚点，再部署到 GitHub Pages。也支持在 Actions 页面手动运行。

仓库的 Settings → Pages → Source 使用 GitHub Actions。网站产物只包含 `index.html`、`style.css`、`app.js`、`profile.js`、`favicon.svg` 和 `.nojekyll`，不包含 README、验证脚本或 Git 元数据。

[GitHub Pages 工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
