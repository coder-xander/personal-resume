# Xander 的工程项目主页

使用 Astro、Markdown 和 Pagefind，展示 Ropedia 的工程经历与 xanderPool 个人开源项目。

- [访问主页](https://coder-xander.github.io/personal-resume/)
- [搜索项目](https://coder-xander.github.io/personal-resume/search/)

主页按“身份 → 精选项目 → 全部项目索引 → 工程范围 → 联系”组织：首屏说明身份与交付范围，精选 5 个项目按系统层级展开，完整 14 个项目以紧凑行列表呈现并支持关键词与方向筛选，能力矩阵按 8 个方向汇总关注点与代表项目。每个项目有独立详情页，说明背景、职责、关键实现和交付情况。视觉参考 Ropedia 官网的黑底、浅绿色、网格与编号排版，保留个人主页品牌、明暗双主题与移动端导航。

## 内容结构

`src/content/projects/` 下每个 Markdown 文件对应一个项目。当前有 14 篇，覆盖系统与固件、设备与数据、连接协议、云端、客户端、产线标定、AI 和个人开源。

`src/content.config.ts` 校验标题、摘要、分类、职责、实现语言、技术栈和架构步骤。首页精选、项目索引、能力矩阵、项目路径、详情页目录和搜索索引均由内容生成。

各项目独立完成架构设计与完整实现，技术细节结合项目资料整理。AI 工作是 Vera Agent，各项目说明架构、实现与交付范围。Ropedia 项目和个人开源项目使用不同归属标签。

## 本地开发

需要 Node.js 22.12 及以上，推荐与工作流一致的 Node.js 24。

```sh
npm ci
npm run dev
```

开发地址包含 `/personal-resume/` 前缀。Pagefind 索引在构建后生成，完整搜索应使用生产预览：

```sh
npm run check
npm run build
npm run validate
npm run test:search
npm run preview
```

`check` 检查 Astro 与 TypeScript。`build` 生成静态页面和中文搜索索引。`validate` 检查页面内部链接、锚点、静态资源和索引条目。`test:search` 使用实际构建索引核对中文、英文、空结果和子目录路径。`preview` 提供构建产物预览。

## 修改与新增项目

直接编辑 `src/content/projects/` 中的 Markdown。文件名决定项目地址，`order` 决定项目索引和相邻项目顺序，`featured: true` 决定首页精选（当前 5 篇；未标记时回退为前 5 篇）。`category` 使用 `src/data/site.ts` 中已有的分类 ID。

每篇内容需要以下 frontmatter 字段：

| 字段           | 内容                                  |
| -------------- | ------------------------------------- |
| `title`        | 项目标题                              |
| `summary`      | 首页卡片与页面描述                    |
| `category`     | 工程方向 ID                           |
| `order`        | 排序数字                              |
| `role`         | 项目职责                              |
| `languages`    | 实现语言与对应模块数组                |
| `technologies` | 技术名称数组                          |
| `pipeline`     | 架构或流程步骤数组                    |
| `featured`     | 可选，是否进入首页精选，默认 false    |
| `context`      | 可选的项目归属，默认 Ropedia 项目实践 |
| `repository`   | 可选的公开源码地址                    |

正文的二级标题自动进入详情页目录。项目间链接使用相对地址，例如 `../device-core/`。站点身份、联系邮箱与分类定义在 `src/data/site.ts`，样式入口为 `src/styles/global.css`。

## 搜索

Pagefind 在构建阶段索引项目正文，按页面语言启用中文分词。搜索页支持项目名称、中文描述和英文技术词；项目标题、摘要和标签还提供原词匹配，补充中文复合词分词差异，例如“线程池”。两类结果合并并去重，完整项目名优先。

搜索在访问者浏览器中运行，不需要后端服务。任意页面按 Ctrl/Cmd + K 进入搜索页；首页项目索引另提供即时关键词筛选，按标题、摘要、语言、技术栈与方向匹配，不需要等待索引加载。

搜索结果路径配置了 GitHub Pages 的子目录前缀。页头、页脚、目录与主页重复摘要不进入项目全文索引。页面脚本、搜索索引与字体均随网站发布，不依赖外部字体或脚本 CDN。

## 自动发布

推送到 `main` 会触发 `.github/workflows/pages.yml`：安装锁定依赖，运行类型检查，构建页面与搜索索引，验证生成链接和搜索，再发布 `dist/` 到 GitHub Pages。也支持手动运行。

仓库 Settings → Pages → Source 使用 GitHub Actions。部署前缀和站点地址在 `astro.config.mjs` 中配置。

## 框架选择

Astro 的内容集合适合让项目经历各自保存在 Markdown 文件中，同时保留自定义主页和详情页设计。Pagefind 为构建后的静态页面提供中文全文搜索。VitePress 也支持 Markdown 和本地搜索，但默认主题偏技术文档，因此这里使用 Astro 组织作品展示。

- [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)
- [Astro 与 GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Pagefind 多语言搜索](https://pagefind.app/docs/multilingual/)
- [Pagefind 搜索 API](https://pagefind.app/docs/api/)
- [Ropedia 官网](https://ropedia.com/)
