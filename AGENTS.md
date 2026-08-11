# GLITCH Robotics 官网 - 技术上下文

## Dependencies
- **lucide-react**: 图标库，提供统一的 SVG 图标组件
- **@tanstack/react-router**: 文件路由系统，支持嵌套路由和类型安全导航
- **sonner**: Toast 通知系统，用于表单提交反馈
- **@supabase/supabase-js**: Meoo Cloud 客户端，提供数据库、认证、存储等后端能力

## Architecture
- **多页面架构**: TanStack Router 文件路由，7+ 独立页面（Home/About/Robot/Road/Gallery/Contact/Join/Academy）
- **嵌套路由模式**: About 和 Academy 使用父布局 + Outlet + 子路由结构
  - 父路由 (`about.tsx`, `academy.tsx`) 提供 Navbar/Footer 布局壳
  - 子路由 (`about.index.tsx`, `academy.programming.tsx` 等) 只返回内容组件
- **共享组件**: `src/components/` 存放可复用 UI 区块（Navbar/Footer/Hero/News 等）
- **设计令牌**: `src/styles.css` 集中定义 oklch 颜色、字体、动画 token
- **类型定义**: `src/types/index.ts` 集中管理共享接口和数据结构

## Patterns / Constraints
- **组件内禁止裸色**: 必须使用语义 token（`text-primary`/`bg-background`）和工具类（`.glass`/`.text-gradient`）
- **滚动渐入统一用 class="reveal"**: 模板运行时自动处理，严禁手写 IntersectionObserver
- **表单后端集成**: Contact 和 Join 页面使用 Meoo Cloud Supabase 数据库，匿名优先 RLS 策略
- **RLS 写入验证**: insert/update/delete 后必须 `.select()` 确认实际写入行数，避免 RLS 静默拦截
- **Toast 反馈**: 所有表单提交必须提供成功/失败的用户可见反馈
- **图片资源**: Gallery 使用 Unsplash 真实图片，fallback 到渐变占位符；Team 成员使用姓名首字母圆形徽章（无外部头像）
- **固定背景层**: 首页背景使用 `fixed inset-0 z-0` 固定在视口，滚动时保持不变，内容层使用 `relative z-10`
- **自定义鼠标光标**: CustomCursor 组件渲染彩色像素特效，同时显示白心黑边的圆形系统光标（SVG data URI）
- **多层动态背景**: 包含梯度网格、六边形图案、电路网格、数据流线条、随机浮动光斑、科技圆环、粒子效果、脉冲光环、旋转几何图形、点阵图案、菱形浮块和扫描光束（共13层）

## What Didn't Work
- ❌ Swarms 修改 academy 子路由时删除了 import 但未完全清理 JSX → 手动修复残留的 Navbar/Footer/main 标签
- ❌ 尝试在首页堆砌 mock 数据 → 改为导入 News 组件保持单一职责
- ❌ 光标轨迹用弹簧物理（vx/vy 速度累积）→ 产生旋转振荡 → 改为纯 lerp 链式跟随
- ❌ 光标轨迹组件写好但未在 index.tsx 引入 → 页面无效果，必须显式渲染 `<CustomCursor />`

## Lessons
- **CustomCursor 架构**: Catmull-Rom 样条 + 6 层主丝带束 + 5 条飘散细丝 + 水平故障切片；颜色 #00FF88/#00D9FF/#3B82F6/#A020F0，中心青色、上缘紫、下缘绿
- **嵌套路由关键**: 父路由必须有 `<Outlet />`，子路由不能重复 Navbar/Footer
- **Academy 与 About 同构**: 两者都采用 parent layout + index page + child routes 模式
- **Gallery 图片优化**: 使用 `loading="lazy"` 和 `object-cover` 确保性能和视觉一致性
- **Lightbox 交互**: 点击背景关闭，点击内容区域阻止冒泡
- **背景分层策略**: 将复杂背景移到 `fixed` 层可实现滚动时背景不变的效果，避免在每个 section 重复渲染
- **性能优化**: DynamicBackground 粒子数量从25减至12，添加 prefers-reduced-motion 媒体查询支持无障碍访问
- **Gallery 截断修复**: 增加网格底部 padding (pb-8 → pb-16) 确保第三行完整显示
- **视差效果修复**: VEX U Logo 视差transform改为累加模式（translateY(-50%) + translate），避免覆盖CSS定位；添加willChange优化性能
- **CustomCursor短尾箭头造型**: 光标采用紧凑箭头形状（尖顶+适度缩短尾部至80%，头部加宽至s*0.20），旋转角度-0.45弧度使整体大幅倾斜，保留四色叶子渐变（#00FF88→#00D9FF→#3B82F6→#A020F0）及所有装饰特效
- **VEX Logo完全固定**: Logo从DynamicBackground组件移出，作为独立`fixed`元素直接放在index.tsx中（z-index:5），彻底脱离背景层，滚动时绝对静止
