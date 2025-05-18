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





















---

#### css隐藏元素的方法

| 方法                                         | 是否占位  | 是否可被访问（可点击/读屏） |
| -------------------------------------------- | --------- | --------------------------- |
| `display: none`                              | ❌ 不占位  | ❌ 不可访问                  |
| `visibility: hidden`                         | ✅ 占位    | ❌ 不可访问                  |
| `opacity: 0`                                 | ✅ 占位    | ✅ 可访问（可点击）          |
| `width: 0; height: 0; overflow: hidden`      | ❌（几乎） | ❌（通常）                   |
| `position: absolute; left: -9999px`          | ❌         | ✅ 可访问（常用于读屏隐藏）  |
| `clip-path: inset(100%)` / `clip: rect(...)` | ❌         | ✅ 常用于可访问隐藏          |



---

#### Flex 布局常用属性有哪些？

- **容器属性（Flex Container）**
- 















---

#### 写出一个居中 div 的 CSS（水平 + 垂直）

- 推荐方法：使用 **Flexbox**

  ```css
  <div class="container">
    <div class="center-box">内容</div>
  </div>
  
  .container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;      /* 垂直居中 */
    height: 100vh;            /* 父容器要有高度，通常是全屏 */
  }
  
  .center-box {
    width: 200px;
    height: 100px;
    background: lightblue;
  }
  ```

- 使用 **绝对定位 + transform使用 **

  ```css
  .container {
    position: relative;
    height: 100vh;
  }
  
  .center-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  ```

- **Grid**

  ```css
  .container {
    display: grid;
    place-items: center; /* 水平+垂直居中 */
    height: 100vh;
  }
  ```

- 使用 **margin + 定宽高（老方法）**

  ```css
  .center-box {
    width: 200px;
    height: 100px;
    margin: auto;
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
  }
  ```

---

#### 用 Flex 实现九宫格布局

**父容器 .grid-container**

- `display: flex`: 使用 Flexbox 布局。
- `flex-wrap: wrap`: 允许子元素换行，从而实现九宫格的多行布局。
- `justify-content: space-between`: 在主轴方向（水平）上，子项之间均匀分布。
- `align-items: center`: 在交叉轴方向（垂直）上，子项垂直居中。
- `gap: 10px`: 子项之间的间隔，可以根据需要调整。

**子项 .grid-item**

- `width` 和 `height`: 每个子项的固定尺寸。
- `display: flex`: 子项内部使用 Flexbox 使内容居中。
- `justify-content: center` 和 `align-items: center`: 分别在水平和垂直方向上居中子项内容。
- `background-color` 和 `border`: 为子项添加背景和边框，使其更具可见性。

```css
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>
</div>

.grid-container {
  display: flex;
  flex-wrap: wrap;         /* 允许子项换行 */
  justify-content: space-between; /* 子项之间的间距 */
  align-items: center;     /* 垂直居中对齐 */
  gap: 10px;               /* 设置子项之间的间隔 */
  width: 300px;            /* 可以设置固定宽度，或者根据需要调整 */
  margin: 0 auto;          /* 使容器水平居中 */
}

.grid-item {
  width: 90px;             /* 每个子项的宽度 */
  height: 90px;            /* 每个子项的高度 */
  display: flex;
  justify-content: center; /* 水平居中子项内容 */
  align-items: center;     /* 垂直居中子项内容 */
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  font-size: 18px;
}
```

---

#### 写出一个响应式两栏布局（左固定宽度，右自适应）

✅ 左侧 `200px` 宽度固定

✅ 右侧内容区域自动填满剩余空间

✅ 移动端自适应：小屏时左右栏变成上下布局（响应式）

````css
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>两栏布局</title>
  <style>
    .container {
      display: flex;
      min-height: 100vh; /* 占满全屏高度，可选 */
    }

    .sidebar {
      width: 200px; /* 左栏固定宽度 */
      background-color: #f4f4f4;
      padding: 20px;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    }

    .content {
      flex: 1; /* 右栏自适应 */
      background-color: #fff;
      padding: 20px;
    }

    @media (max-width: 600px) {
      .container {
        flex-direction: column; /* 小屏幕下改为上下布局 */
      }

      .sidebar {
        width: 100%;
        box-shadow: none;
        border-bottom: 1px solid #ddd;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="sidebar">左侧栏（固定宽度）</div>
    <div class="content">右侧内容区域（自适应宽度）</div>
  </div>

</body>
</html>
````

----

#### 用 CSS 实现一个三角形

```css
<div class="triangle-up"></div>

.triangle-up {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;  /* 左边透明 */
  border-right: 50px solid transparent; /* 右边透明 */
  border-bottom: 50px solid red;        /* 底部为红色 */
}
```

---

#### 写一个鼠标 hover 后变色的按钮

```css
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hover Button</title>
  <style>
    .hover-button {
      background-color: #3498db; /* 初始颜色：蓝色 */
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .hover-button:hover {
      background-color: #2ecc71; /* 悬停颜色：绿色 */
    }
  </style>
</head>
<body>

  <button class="hover-button">悬停我试试</button>

</body>
</html>
```

