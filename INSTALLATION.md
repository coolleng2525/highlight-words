# Highlight Words 扩展安装和使用说明

## ✅ 编译完成

您的扩展已经成功编译！所有 TypeScript 源代码已编译为 JavaScript 文件，位于 `out/` 目录中。

## 🆕 新增功能

此版本在原有功能基础上，增加了以下重要功能：

### 1. 层级树视图显示
- **第一级**：高亮表达式（如 "registerCommand"）
- **第二级**：该表达式在各个文件中的匹配位置
  - 显示行号（例如：Line 14）
  - 显示文件名和行号（例如：extension.ts:14）
  - 鼠标悬停显示完整文件路径

### 2. 跨文件位置跳转
- 点击树视图中的任意位置节点，自动打开对应文件并跳转到指定行
- 支持在多个打开的编辑器中查找所有匹配项
- 完整的文件路径显示，方便识别

### 3. 改进的箭头导航
- 左右箭头支持跨文件导航
- 自动按文件路径和位置排序
- 循环导航（到达末尾后回到开头）

## 📦 安装方式

### 方式一：在开发模式下测试（推荐）

1. 打开 VS Code
2. 按 `F5` 或选择 **运行 > 启动调试**
3. 会打开一个新的 VS Code 窗口（扩展开发主机）
4. 在新窗口中测试扩展的所有功能

### 方式二：作为未打包扩展安装

1. 将整个 `highlight-words` 文件夹复制到 VS Code 扩展目录：
   - **Linux**: `~/.vscode/extensions/`
   - **macOS**: `~/.vscode/extensions/`
   - **Windows**: `%USERPROFILE%\.vscode\extensions\`

2. 重启 VS Code

3. 扩展会自动加载

### 方式三：使用符号链接（开发者推荐）

```bash
ln -s /sdb/debug/highlight-words ~/.vscode/extensions/highlight-words
```

然后重启 VS Code。这样修改代码后只需重新编译，不用复制文件。

## 🎯 使用方法

### 基本功能

1. **高亮选中的文本**：
   - 选中任意文本
   - 按 `Ctrl+Shift+P`（或 `Cmd+Shift+P`）
   - 输入 "Highlight Toggle Current"

2. **查看所有匹配项**：
   - 打开侧边栏的 "HIGHLIGHTS" 面板
   - 展开任意高亮词，查看所有匹配的文件和行号

3. **跳转到匹配位置**：
   - 在 HIGHLIGHTS 面板中，点击任意位置项（如 "Line 14 extension.ts:14"）
   - 自动打开对应文件并跳转到该行

4. **使用箭头导航**：
   - 点击高亮词旁边的 ← 或 → 箭头
   - 在所有匹配项之间跳转（包括跨文件）

### 高级功能

- **正则表达式高亮**：输入 "Highlight Expression"
- **移除高亮**：输入 "Highlight Remove"
- **清除所有高亮**：输入 "Highlight Remove All"
- **设置高亮模式**：输入 "Set Highlight Mode"

## 🛠️ 重新编译

如果您修改了源代码，重新编译：

```bash
cd /sdb/debug/highlight-words
npm run compile
```

或者使用监视模式（自动重新编译）：

```bash
npm run watch
```

## 📝 文件结构

```
highlight-words/
├── out/                   # 编译后的 JavaScript 文件
│   └── src/
│       ├── config.js      # 配置管理
│       ├── extension.js   # 主扩展文件
│       ├── highlight.js   # 高亮逻辑
│       └── tree.js        # 树视图提供程序
├── src/                   # TypeScript 源代码
│   ├── config.ts
│   ├── extension.ts
│   ├── highlight.ts
│   └── tree.ts
├── resources/             # 图标资源
├── package.json           # 扩展清单
└── tsconfig.json          # TypeScript 配置
```

## 🐛 故障排除

### 扩展未显示在扩展列表中
- 确保文件夹复制到了正确的扩展目录
- 重启 VS Code
- 检查 VS Code 开发者工具的控制台（帮助 > 切换开发人员工具）

### 功能不工作
- 确保已经编译（`npm run compile`）
- 检查 `out/` 目录是否存在并包含 .js 文件
- 查看 VS Code 开发者工具的控制台是否有错误信息

### 树视图未显示文件和行号
- 确保有打开的文件包含高亮的内容
- 尝试添加新的高亮词
- 刷新编辑器窗口

## 📚 技术细节

### 主要改进

1. **tree.ts**
   - 添加了 `LocationMatch` 接口支持
   - 实现两级树状结构
   - 为位置节点添加点击命令

2. **highlight.ts**
   - 添加 `allLocations` Map 存储跨文件位置
   - 改进 `updateDecorations` 方法收集所有编辑器的匹配项
   - 导出 `LocationMatch` 接口

3. **extension.ts**
   - 添加 `goToLocation` 命令处理位置跳转
   - 改进 `findNext` 和 `findPrevious` 支持跨文件导航
   - 自动排序和循环导航

4. **package.json**
   - 更新依赖到现代版本
   - 添加新命令的配置
   - 改进构建脚本

## ✨ 享受使用！

如有任何问题或建议，请查看 VS Code 开发者工具控制台获取详细信息。

