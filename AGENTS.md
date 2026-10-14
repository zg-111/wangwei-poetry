# AGENTS.md - 诗中有画：王维的山水诗世界

## 项目概览
唐代诗人王维山水诗主题展示网站，采用中国传统水墨山水风格设计。

## 技术栈
- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI**: shadcn/ui + Tailwind CSS 4
- **Font**: Noto Serif SC (Google Fonts)

## 目录结构
```
src/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页（所有模块）
│   ├── globals.css         # 全局样式（水墨风格）
│   └── poem/[id]/page.tsx  # 诗歌详情页
├── lib/
│   ├── data.ts             # 诗歌数据（诗作、意象、随机诗句）
│   └── utils.ts            # 工具函数
└── components/ui/          # shadcn/ui 组件
```

## 页面结构
1. **首页** (`/`) - 单页滚动，包含：
   - Hero 区域（水墨远山、月色、主标题）
   - 诗人介绍
   - 代表诗作卡片（5首）
   - 诗中意象（6个意象，可点击展开）
   - "诗中有画"专题
   - 趣味互动（随机诗句）
   - 页脚

2. **诗歌详情** (`/poem/[id]`) - 展示：
   - 诗歌全文
   - 白话译文
   - 诗歌意境
   - 赏析
   - 名句赏析
   - 其他诗作导航

## 设计风格
- 主色：宣纸白 `#F5F0E6`
- 文字：墨色 `#2C2C2C`
- 辅助：青灰 `#7B8B9A`
- 点缀：朱砂 `#B8423A`
- 字体：Noto Serif SC（思源宋体）

## 关键命令
- 开发：`pnpm dev`（底层由 `scripts/dev.sh` 驱动，读 `.preview` 端口，默认 5000，绑定 0.0.0.0）
- 构建：`pnpm build`（`scripts/build.sh`：装依赖 + next build + tsup 打包 `src/server.ts` → `dist/server.js`）
- 启动部署产物：`pnpm start`（`scripts/start.sh` → `node dist/server.js`，监听 5000）
- 类型检查：`pnpm ts-check`
- Lint：`pnpm lint`

## 运行与预览
- 项目为 `project_type = "web"`，预览入口按根 `.coze` 的 `[dev]` 执行 `scripts/prepare.sh` + `scripts/dev.sh`，对外只暴露 5000（取自 `.preview` 的 `expose_port`）。
- 项目根与工作区根重合（均在工作区根目录，`.coze` 就在根下，`[subprojects].path = ["."]` 单层结构）。曾因脚手架建在嵌套的 `projects/` 子目录而被抬升到工作区根，后续不再有 `projects/` 前缀路径。
- 首次进入预览链路时已生成 `.preview`（`[preview.port] expose_port = 5000`），该文件已加入 `.gitignore`，不提交。
- 交付验收统一走 `test_run`（静态检查 + 服务探活 + 页面/接口冒烟），不直接用 shell 自验证。
- 项目是纯展示型 Next.js（无 `app/api` 路由），页面数据来自 `src/lib/data.ts`，无需后端接口。
- 页面在标准 Chromium 移动视口下本地与线上（`coze.site`）均实测滚动正常；普通 Chromium 无法复现用户报告的"手机划不动"。曾在 `globals.css` 的 `html,body` 上设置 `overscroll-behavior-y: none`，被怀疑是微信内置 WebView（小米/MIUI）滚动异常的元凶，已移除。若再遇此类环境滚动问题，优先排查微信内置 WebView 层（如 `overscroll-behavior`、`100vh`）而非页面结构。

## 用户偏好与长期约束
- 诗歌 ID 为英文 slug（如 `shan-ju-qiu-ming`），详情页 `/poem/[id]` 只对该 id 返回 200，其他返回 404。
