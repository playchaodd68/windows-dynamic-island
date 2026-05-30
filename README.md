# Windows 灵动岛

一个面向 Windows 的桌面灵动岛助手。它以顶部悬浮胶囊的形态常驻桌面，需要时展开为轻量控制面板，用于剪贴板智能处理、专注计时、快速记录和最近动态查看。

## 功能

- 顶部居中的无边框悬浮胶囊窗口。
- 空闲、处理中、完成、警告、展开等明确状态。
- iOS 灵动岛风格的深色玻璃、弹性展开、光晕和按压反馈。
- 全中文界面和托盘菜单。
- 本地模拟 AI 动作：总结、润色、翻译、提取任务、转 Markdown。
- 专注计时、快速记录、最近动态和结果复制。
- Electron 托盘控制和全局快捷键。

## 隐私默认值

当前版本不会把剪贴板内容发送到远程服务。所有智能动作都通过本地模拟 provider 返回确定性结果。后续接入 OpenAI provider 时，应继续保留显式配置和 provider 边界。

## 快捷键

- `Ctrl+Shift+Space`：显示或隐藏灵动岛。
- `Ctrl+Shift+I`：显示并展开灵动岛。

## 本地开发

```powershell
npm install
npm run dev
```

## 验证

```powershell
npm run validate:openspec
npm run typecheck
npm test
npm run build
npm run smoke
```

或运行完整检查：

```powershell
npm run check
```

## 发布到 GitHub

安装并登录 GitHub CLI 后，运行：

```powershell
gh auth login
.\scripts\publish-github.ps1
```

## 项目结构

- `src/main`：Electron 主进程、原生窗口、托盘、快捷键和 IPC。
- `src/preload`：渲染进程桥接 API。
- `src/renderer`：React 灵动岛界面。
- `src/shared`：状态、AI 动作、计时器和动态列表等可测试领域逻辑。
- `src/tests`：Vitest 单元和组件测试。
- `openspec`：OpenSpec proposal、design、specs 和 tasks。
