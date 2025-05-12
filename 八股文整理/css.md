## 基础选择器与样式题

1. **CSS 有哪些常见选择器？**
   - 举例：通配符、标签、类、ID、属性、伪类、伪元素等。
2. **伪类和伪元素的区别？**
   - 举例说明 `:hover` 和 `::before` 的区别。
3. **行内元素、块级元素、行内块元素区别？如何相互转换？**
4. **如何让一个元素隐藏？有什么区别？**
   - `display: none`、`visibility: hidden`、`opacity: 0`、`position: absolute + left:-9999px` 等。
5. **盒模型有哪些？box-sizing: border-box 有什么用？**

------

##  布局与响应式题

1. **水平垂直居中的实现方式？**
   - 说出至少 5 种，包括 Flex、Grid、margin、transform 等。
2. **Flex 布局常用属性有哪些？**
   - 举例：`justify-content`、`align-items`、`flex-grow`、`flex-shrink` 等。
3. **Grid 和 Flex 有什么区别？分别适用于什么场景？**
4. **清除浮动的几种方式？**
5. **移动端适配有哪些方式？**
   - 例如媒体查询、rem、vw/vh、flexible.js、viewport 等。

------

## 🔵 动画与视觉题

1. **实现一个元素从左向右移动的动画有哪些方式？**
   - transition、animation、transform、JS 操作样式等。
2. **如何实现 loading 动画？写一个简单的例子。**
3. **CSS 动画和 JS 动画的优劣？**
4. **如何实现一个弹性过渡效果？**

------

## 🔴 性能与架构相关题

1. **CSS 加载会阻塞 DOM 渲染吗？为什么？**
2. **如何优化 CSS 性能？**
   - 减少嵌套、避免通配选择器、合理合并文件、使用 BEM、Critical CSS 等。
3. **BFC 是什么？有什么作用？**
   - 如何触发 BFC？有哪些常见场景（如防止 margin 合并）？
4. **常见的 CSS 预处理器有哪些？它们的作用是什么？**
5. **如何避免样式冲突？**
   - 命名规范、BEM、模块化、CSS-in-JS、scoped 等方式。

------

## ✍️ 手写题

1. 写出一个居中 div 的 CSS（水平 + 垂直）
2. 写出一个响应式两栏布局（左固定宽度，右自适应）
3. 用 CSS 实现一个三角形
4. 写一个鼠标 hover 后变色的按钮
5. 用 Flex 实现九宫格布局