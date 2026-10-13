# 个人简历模板

一页式静态简历，使用 HTML、CSS 和原生 JavaScript。所有样式、脚本和图标均随源码提供，不加载外部字体、CDN 脚本或统计服务。

## 文件

| 文件          | 用途                                             |
| ------------- | ------------------------------------------------ |
| `index.html`  | 页面结构与导航                                   |
| `style.css`   | 浅色、深色、手机和打印样式                       |
| `app.js`      | 内容渲染、导航、主题、项目详情和打印             |
| `resume.js`   | 姓名、介绍、工作经历、项目、技能、教育与联系方式 |
| `favicon.svg` | 网站图标                                         |
| `.nojekyll`   | GitHub Pages 的纯静态资源标记                    |

## 预览

解压后用 Chrome 打开 `index.html`。也可以在文件所在目录运行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

访问 `http://127.0.0.1:4173/`。页面无需安装依赖或执行构建。

## 填写简历

编辑 `resume.js` 中的 `window.RESUME`。姓名默认使用账号昵称“十月”，英文名使用 Xander。岗位、介绍、工作经历、项目、技能和教育信息都是初版示例，正式发布前请替换。

- `name`、`englishName`、`initials`：中文名、英文名和头像文字。
- `role`、`location`、`status`：岗位、城市和首页状态文字。
- `tagline`：首页标题，用 `\n` 换行。
- `intro`、`about`、`focus`：简短介绍、详细介绍和关注方向。
- `email`：联系邮箱。留空时按钮提示尚未填写，不会发送邮件。
- `gitee`：代码主页的完整地址。留空可以隐藏代码主页链接。
- `experience`：工作经历。每项包含时间、公司、岗位、职责、成果和技术标签。
- `projects`：项目。`type` 可填 `app` 或 `system`，用于选择插图。`detail` 是弹窗说明，`url` 是源码或演示地址，支持 HTTP 和 HTTPS。没有地址时只显示说明。
- `skills`、`education`：实际掌握的技能和教育信息。

填写真实内容后，将 `demo` 改成 `false`，隐藏示例提示，并修改 `status`。如果保持 `demo: true`，页面会标注示例内容。`index.html` 的初始标题、描述和不启用 JavaScript 时的内容也应随个人资料更新。头像文字在 `resume.js` 中修改，浏览器标签页图标在 `favicon.svg` 中修改。

主题按钮保存当前选择。导出 PDF 按钮打开浏览器打印窗口，请选择“另存为 PDF”。打印样式会隐藏侧栏、插图和操作按钮。

## 部署

上传网站文件时保持目录结构，使 `index.html` 位于站点根目录。资源使用相对路径，也可以部署到子目录。只上传网站文件即可，README 不需要放到公开站点。

### 国内静态托管

这份模板可上传到阿里云 OSS 或腾讯云静态托管，不需要维护服务器。配置默认首页为 `index.html`，绑定自定义域名并配置 HTTPS。选择中国内地 OSS 节点时，绑定域名需要完成 ICP 备案。

- [阿里云 OSS 静态网站说明](https://help.aliyun.com/zh/oss/user-guide/static-website-hosting/)
- [腾讯云 CloudBase 静态托管说明](https://cloud.tencent.com/document/product/876/46900)

具体费用、域名和备案条件以所选服务当前控制台为准。本交付包未创建云资源或购买服务。

### GitHub Pages 自动发布

仓库使用 `.github/workflows/pages.yml`。推送到 `main` 或手动运行工作流，会先检查 JavaScript 语法、资源文件和页面锚点，再打包并部署网站。

GitHub 仓库的 Settings → Pages → Source 应设置为 GitHub Actions。工作流只上传 `index.html`、`style.css`、`app.js`、`resume.js`、`favicon.svg` 和 `.nojekyll`。README、验证脚本和 Git 元数据不会作为网站文件发布。

目标源码仓库：[coder-xander/personal-resume](https://github.com/coder-xander/personal-resume)。目标站点：[个人简历](https://coder-xander.github.io/personal-resume/)。实际部署结果可在仓库 Actions 页面查看。

[GitHub Pages 工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

### Gitee

Gitee 可以保存源码。2026 年 10 月 13 日检查的官方反馈中，维护者表示 Pages 服务已下线，暂无再次上线计划，因此本交付未部署到 Gitee Pages。

[Gitee 官方反馈](https://gitee.com/oschina/git-osc/issues/IA4MXO)

初版包含示例内容，发布前或首次填写时应核对个人资料。正式简历需要自己填写真实经历。
