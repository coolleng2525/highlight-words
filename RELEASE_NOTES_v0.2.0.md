# 🎉 Highlight Words v0.2.0 - 正式发布

## 📦 发布信息

- **版本**: 0.2.0
- **发布日期**: 2025-11-28
- **文件**: `highlight-words-0.2.0.vsix`
- **文件大小**: 1.3 MB

## 🚀 安装方法

### 方法 1: 命令行安装（推荐）

```bash
code --install-extension highlight-words-0.2.0.vsix
```

### 方法 2: VS Code 图形界面

1. 打开 VS Code
2. 进入扩展面板（Ctrl+Shift+X 或 Cmd+Shift+X）
3. 点击右上角的 `...` (更多操作)
4. 选择 **"从 VSIX 安装..."**
5. 选择 `highlight-words-0.2.0.vsix` 文件
6. 重启 VS Code

### 方法 3: 拖放安装

直接将 `.vsix` 文件拖放到 VS Code 的扩展面板中。

## ✨ 主要新功能

### 1. 📂 层级树视图
- 在侧边栏的 **HIGHLIGHTS** 面板中展开任意高亮词
- 查看该词在所有打开文件中的匹配位置
- 每个位置显示格式：`Line X  filename.ext:X`

**示例**：
```
HIGHLIGHTS
  ▼ registerCommand  [default]
    ├─ 📄 Line 10   extension.ts:10
    ├─ 📄 Line 38   extension.ts:38
    ├─ 📄 Line 42   extension.ts:42
    └─ 📄 Line 15   config.ts:15
       ◀ ▶
```

### 2. 🔗 跨文件导航
- **点击位置项**：自动打开对应文件并跳转到精确行号
- **箭头导航**：使用 ← → 按钮在所有匹配项之间循环跳转
- **自动排序**：按文件路径和位置智能排序
- **无缝切换**：自动打开其他文件中的匹配项

### 3. 💡 智能显示
- 文件图标显示
- 完整路径工具提示
- 实时更新匹配计数
- 多编辑器支持

## 📋 完整功能列表

### 基础功能
✅ 高亮当前选中的文本  
✅ 支持正则表达式高亮  
✅ 忽略大小写选项  
✅ 完整单词匹配选项  
✅ 可自定义高亮颜色  
✅ 多个高亮词同时显示  

### 新增功能 (v0.2.0)
🆕 层级树视图显示所有匹配  
🆕 跨文件位置导航  
🆕 增强的箭头导航  
🆕 文件名和行号显示  
🆕 鼠标悬停显示完整路径  
🆕 文件图标标识  

## 🎯 快速开始

### 第一步：高亮文本
1. 选中任意文本
2. 按 `Ctrl+Shift+P`（Mac: `Cmd+Shift+P`）
3. 输入 "Highlight Toggle Current"

### 第二步：查看匹配
- 打开左侧边栏的 **HIGHLIGHTS** 面板
- 展开高亮词查看所有匹配位置

### 第三步：导航跳转
- 点击任意位置项跳转到对应文件
- 或使用 ← → 箭头在匹配项之间循环

## 🎨 命令列表

| 命令 | 描述 |
|------|------|
| `Highlight Toggle Current` | 切换选中文本的高亮 |
| `Highlight Expression` | 使用正则表达式高亮 |
| `Highlight Selection with Options` | 带选项高亮 |
| `Highlight Remove` | 移除指定高亮 |
| `Highlight Remove All` | 清除所有高亮 |
| `Set Highlight Mode` | 设置默认模式 |
| `Highlight Toggle Sidebar` | 切换侧边栏显示 |

## ⚙️ 配置选项

```json
{
  "highlightwords.colors": [...],          // 自定义高亮颜色
  "highlightwords.box": {...},             // 边框或背景样式
  "highlightwords.defaultMode": 0,         // 默认模式
  "highlightwords.showSidebar": true       // 显示侧边栏
}
```

## 🔧 技术改进

- 升级到 TypeScript 4.7
- 现代化依赖管理
- 改进的类型安全
- 更好的错误处理
- 优化的性能

## 📝 升级说明

从旧版本升级：
1. 卸载旧版本（可选）
2. 安装新的 `.vsix` 文件
3. 重启 VS Code
4. 原有的高亮配置会自动保留

## 🐛 已知问题

- 大文件（>10000 行）可能导致性能下降
- 某些主题的高亮颜色可能需要手动调整

## 💬 反馈与支持

如遇到问题：
1. 打开 VS Code 开发者工具（Help > Toggle Developer Tools）
2. 查看 Console 标签页的错误信息
3. 提交问题报告，包含错误日志

## 📄 文档

- [完整安装说明](INSTALLATION.md)
- [快速测试指南](QUICK_TEST.md)
- [更新日志](CHANGELOG.md)

## 📜 许可证

MIT License - 详见 [LICENSE.md](LICENSE.md)

## 🙏 致谢

感谢原作者 rsbondi 创建了这个优秀的扩展！

---

**享受编码，高亮人生！** ✨🎨🚀

