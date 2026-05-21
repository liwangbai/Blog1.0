# 项目概述

个人博客 & 作品集网站，基于 Next.js 16 (App Router) 构建，支持 MDX 内容、RSS、sitemap、深色模式、Docker 部署。

## 技术栈

- Next.js 16 + React 19 + TypeScript 5 (strict)
- Tailwind CSS v4 + `@tailwindcss/typography`
- MDX: `next-mdx-remote` + `remark-gfm` + `rehype-pretty-code` (Shiki)
- 深色模式: `next-themes` v0.4
- 构建: `output: 'standalone'`，多阶段 Docker

## 命令

```bash
npm run dev      # 开发服务器 localhost:3000
npm run build    # 生产构建
npm run start    # 生产服务器
npm run lint     # ESLint 检查
```

## 目录结构

```
src/
├── app/            # App Router — 页面、布局、sitemap、RSS、robots
│   ├── blog/       # /blog 列表 + /blog/[slug] 详情
│   ├── projects/   # /projects 列表 + /projects/[slug] 详情
│   ├── about/      # /about
│   └── feed.xml/   # RSS feed route handler
├── components/
│   ├── blog/       # BlogCard, BlogList, PostMeta
│   ├── projects/   # ProjectCard, ProjectGrid
│   ├── home/       # Hero, FeaturedPosts, FeaturedProjects
│   ├── layout/     # Header, Footer, MobileNav, ThemeToggle
│   └── ui/         # Card, Tag, Pagination, PageHeader, BackLink
├── lib/            # mdx.ts, posts.ts, projects.ts, reading-time.ts, constants.ts
└── types/          # Post, Project 类型定义
content/
├── posts/          # MDX 博客文章
└── projects/       # MDX 作品集
```

## 代码约定

### TypeScript
- 严格模式，严禁 `any`
- 路径别名: `@/*` → `./src/*`
- 类型定义集中在 `src/types/`

### React / Next.js
- 服务端组件优先，仅在需要交互时用 `'use client'`
- 页面级组件放在 `src/app/`，通过 `src/lib/` 获取数据
- 使用 `next-mdx-remote` 的 `compileMDX` + `MDXRemote` 渲染内容
- 元数据用 `export const metadata: Metadata`，动态路由用 `generateMetadata`

### 样式
- Tailwind CSS v4，类名直接写在 `className` 中
- 深色模式: `dark:` 前缀（由 `next-themes` 根据 `class` 属性切换）
- 响应式: `sm:` / `md:` / `lg:` 断点，移动优先

### 内容 (MDX)
- Frontmatter: `title`, `description`, `date`, `tags`, `featured`（可选 `draft: true`）
- 文章通过 `src/lib/posts.ts` 的 `getAllPosts()` / `getPostBySlug()` 获取
- 作品集通过 `src/lib/projects.ts` 的对应方法获取

## Next.js 版本警告

这是一个特殊版本的 Next.js（16.2.6）— API、约定、文件结构可能与训练数据中的 Next.js 不同。在编写页面、布局或数据获取逻辑之前，先阅读 `node_modules/next/dist/docs/` 中的相关指南，并留意废弃通知。

## 行为规则

- 所有对话、代码注释、git commit message 使用**中文**
- 修改代码前先阅读相关文件，了解现有模式
- 优先编辑现有文件，避免创建新文件
- 不添加未被请求的依赖、功能或重构
- 遵循项目现有的组件结构和命名约定
- 新增组件放入 `src/components/` 对应子目录
