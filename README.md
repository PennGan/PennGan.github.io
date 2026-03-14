# 基于 Quartz 的个人知识网站

这个仓库提供一个面向学术研究者的个人知识网站骨架，内容源自 Obsidian Markdown 笔记，通过 GitHub Actions 使用 Quartz 自动构建并发布到 GitHub Pages。

当前方案的重点是：

- 使用 `content/` 作为 Quartz 内容目录
- 保留 Obsidian 风格的 `[[内部链接]]` 和 `#标签`
- 首页提供学术型导航结构
- 使用简洁、稳定、便于长期维护的样式
- 通过同步脚本把 Obsidian Vault 中的笔记复制到 `content/`

## 目录结构

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages 自动部署
├── content/                     # 网站内容，建议由 Obsidian 同步而来
│   ├── index.md                 # 首页
│   ├── 个人简介.md
│   ├── 研究方向/
│   ├── 最新笔记/
│   ├── 项目/
│   ├── 文献阅读/
│   ├── 实验方法/
│   └── 分析方法/
├── quartz/
│   └── styles/
│       └── custom.scss          # Quartz 自定义样式
├── quartz.config.ts             # Quartz 配置
├── quartz.layout.ts             # Quartz 布局
├── scripts/
│   └── sync-obsidian.mjs        # Obsidian -> content 同步脚本
├── .gitignore
├── package.json
└── README.md
```

## 已完成内容

- 学术型首页结构：个人简介、研究方向、最新笔记、项目、文献阅读、实验方法、分析方法
- 中文站点配置
- Obsidian 风格链接与标签支持
- GitHub Actions 自动部署到 GitHub Pages
- Obsidian 笔记同步脚本
- 面向长期维护的简洁样式

## 首次使用

### 1. 修改站点基础信息

编辑以下文件：

- `quartz.config.ts`
- `quartz.layout.ts`
- `quartz/styles/custom.scss`
- `content/index.md`
- `content/个人简介.md`

你至少需要修改：

- `baseUrl`
  - 如果仓库地址是 `https://github.com/yourname/knowledge-site`
  - GitHub Pages 地址通常是 `https://yourname.github.io/knowledge-site`
  - 那么 `baseUrl` 应写成 `yourname.github.io/knowledge-site`
- 页脚里的 GitHub 仓库链接
- 首页与个人简介里的真实信息

### 2. 配置 GitHub Pages

在 GitHub 仓库中：

1. 打开 `Settings`
2. 进入 `Pages`
3. 在 `Build and deployment` 下把 `Source` 设为 `GitHub Actions`

之后每次推送到 `main` 分支，GitHub Actions 会自动构建并发布网站。

## 如何从 Obsidian 同步笔记

### 方式一：命令行传参

```bash
npm run sync:obsidian -- --vault /path/to/your/obsidian-vault
```

### 方式二：环境变量

```bash
export OBSIDIAN_VAULT=/path/to/your/obsidian-vault
npm run sync:obsidian
```

### 可选参数

```bash
node scripts/sync-obsidian.mjs --help
```

支持的参数：

- `--vault`：Obsidian Vault 路径
- `--target`：目标目录，默认是当前仓库的 `content/`
- `--no-clean`：不同步删除目标目录中已不存在的文件
- `--dry-run`：仅查看将要同步的内容

### 脚本行为说明

同步脚本会：

- 复制 Markdown 笔记和常见附件到 `content/`
- 跳过 `.obsidian`、`.git`、`node_modules`、`.trash`
- 默认删除 `content/` 中已经在 Obsidian 里不存在的文件，确保两边结构一致

当前允许同步的文件类型包括：

- `.md`
- 图片：`.png` `.jpg` `.jpeg` `.gif` `.svg` `.webp`
- 附件：`.pdf` `.csv` `.tsv`

## 以后如何更新网站

推荐维护流程：

1. 在 Obsidian 里新增或修改笔记
2. 运行同步脚本，把笔记更新到 `content/`
3. 检查首页和栏目页是否需要补充入口链接
4. 提交并推送到 GitHub
5. 等待 GitHub Actions 自动部署完成

一个常见的日常更新流程如下：

```bash
export OBSIDIAN_VAULT=/path/to/your/obsidian-vault
npm run sync:obsidian
git add .
git commit -m "Update notes"
git push origin main
```

## 内容组织建议

为了让网站更适合作为研究者知识库，建议这样维护：

- `研究方向/`：按研究主题整理问题、概念和计划
- `文献阅读/`：每篇文献一条笔记，统一模板
- `实验方法/`：沉淀实验流程、参数、复现经验
- `分析方法/`：整理统计分析、可视化、建模方法
- `项目/`：按课题或项目维护进展、数据与输出
- `最新笔记/`：放近期更新、工作流和阶段性记录

## Obsidian 写作建议

- 使用 `[[笔记名]]` 或 `[[路径/笔记名|显示标题]]` 建立内部链接
- 为笔记添加标签，例如 `#文献阅读`、`#实验方法`
- 在笔记 frontmatter 中加入 `title`、`description`、`tags`
- 如果某篇内容不想公开，可以加入 `draft: true`

## 说明

这个仓库当前采用“内容仓库 + GitHub Actions 中 Quartz 构建”的方式发布。这样仓库更轻，维护成本更低，也更适合把重点放在你的 Obsidian 内容本身。
