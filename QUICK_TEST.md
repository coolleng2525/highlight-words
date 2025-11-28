# 🚀 快速测试新功能

## 立即测试扩展（3 步搞定）

### 步骤 1: 启动扩展开发模式

在当前目录中，按 `F5` 键或：

```bash
# 在 VS Code 中打开这个项目
code /sdb/debug/highlight-words

# 然后按 F5 启动调试
```

这会打开一个新的 VS Code 窗口，扩展已经加载。

### 步骤 2: 创建测试文件

在新打开的窗口中，创建一些测试文件：

**test1.js**
```javascript
function registerCommand() {
    console.log("registerCommand in file 1");
}

function registerCommand(name) {
    return "registerCommand again";
}
```

**test2.js**
```javascript
// Another registerCommand
const registerCommand = () => {
    // registerCommand implementation
};

function registerCommand() {
    console.log("registerCommand in file 2");
}
```

### 步骤 3: 测试新功能

1. **添加高亮词**：
   - 选中任意 `registerCommand`
   - 按 `Ctrl+Shift+P`（Mac 用 `Cmd+Shift+P`）
   - 输入 "Highlight Toggle Current" 并回车
   - 文本会被高亮显示

2. **查看树视图**：
   - 在左侧边栏找到 **HIGHLIGHTS** 面板
   - 展开 "registerCommand" 节点
   - 你会看到类似这样的结构：
     ```
     ▼ registerCommand  [default 3/5]
       ├─ Line 1  test1.js:1
       ├─ Line 2  test1.js:2
       ├─ Line 5  test1.js:5
       ├─ Line 2  test2.js:2
       └─ Line 5  test2.js:5
     ```

3. **测试跨文件跳转**：
   - 点击任意一个位置项（例如 "Line 2 test2.js:2"）
   - 应该自动打开 test2.js 并跳转到第 2 行
   - ✅ 成功！

4. **测试箭头导航**：
   - 点击 "registerCommand" 旁边的 **→** 箭头
   - 光标会跳转到下一个匹配项
   - 继续点击，会在所有匹配项之间循环（包括跨文件）
   - 点击 **←** 箭头可以向后导航
   - ✅ 成功！

## 🎨 测试其他功能

### 测试多个高亮词

1. 选中 "console"，添加高亮
2. 选中 "function"，添加高亮
3. 在 HIGHLIGHTS 面板中，你会看到所有高亮词的层级列表
4. 每个词都可以独立展开查看其匹配位置

### 测试正则表达式

1. 按 `Ctrl+Shift+P`
2. 输入 "Highlight Expression"
3. 输入正则表达式，例如：`/register\w+/i`
4. 会高亮所有匹配的内容

### 测试选项

1. 在 HIGHLIGHTS 面板中，右键点击某个高亮词
2. 选择 "Change Options"
3. 选择选项：
   - `ignore case` - 忽略大小写
   - `whole word` - 仅匹配完整单词
   - `both` - 两者都启用
   - `default` - 默认模式

## 📊 预期结果

✅ **树视图显示**：
- 每个高亮词下显示所有匹配的文件和行号
- 格式：`Line X  filename.ext:X`

✅ **位置跳转**：
- 点击位置项自动打开文件并跳转
- 光标定位到准确的行和列

✅ **箭头导航**：
- 支持在所有文件的匹配项之间跳转
- 按文件路径和位置顺序排列
- 到达最后一项后循环回第一项

✅ **工具提示**：
- 鼠标悬停在位置项上显示完整文件路径
- 例如：`/sdb/debug/highlight-words/test1.js:2`

## 🐛 如果遇到问题

### 树视图是空的
- 确保至少有一个文件被打开
- 确保添加了高亮词
- 尝试切换到另一个文件再切换回来

### 点击位置不跳转
- 检查 VS Code 开发者工具控制台（Help > Toggle Developer Tools）
- 查看是否有错误信息

### 编译错误
```bash
cd /sdb/debug/highlight-words
npm run compile
```

### 查看日志
在扩展开发窗口中：
- 按 `Ctrl+Shift+I`（或 `Cmd+Option+I`）打开开发者工具
- 查看 Console 标签页
- 所有错误和调试信息都会显示在这里

## 📸 截图预期

HIGHLIGHTS 面板应该看起来像这样：

```
HIGHLIGHTS
  ▼ registerCommand  [default]
    ├─ 📄 Line 1   test1.js:1
    ├─ 📄 Line 5   test1.js:5
    ├─ 📄 Line 6   test1.js:6
    ├─ 📄 Line 2   test2.js:2
    └─ 📄 Line 5   test2.js:5
       ◀ ▶  (箭头按钮)
```

点击任意 📄 项都会跳转到对应位置！

## ✨ 恭喜！

如果一切正常，您的扩展已经成功编译并且新功能正在工作！

现在您可以：
1. 继续在开发模式下测试
2. 安装到本地使用（参见 INSTALLATION.md）
3. 与他人分享这个扩展

享受编码！ 🎉

