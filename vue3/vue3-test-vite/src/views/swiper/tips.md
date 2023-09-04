#### swiper参数说明
```
direction：确定滑块的滑动方向。可以设置为 'horizontal'（水平）或 'vertical'（垂直）。
slidesPerView：每次显示几个轮播图，设置在视口中同时可见的幻灯片数量
spaceBetween：每个轮播图之间的间距（单位：px）
slidesPerGroup: 这个选项允许你指定每组包含的幻灯片数量，从而实现一次前进多步的效果。确保 slidesPerView（可见的幻灯片数量）和 slidesPerGroup 的值相同，以确保每次移动的是一个完整的组。如果你有更多的幻灯片，可以根据需要添加更多的幻灯片。
centeredSlides: 用于设置轮播中的幻灯片是否居中显示。当设置为 true 时，当前活动的幻灯片会居中显示在视口中。这在创建一个居中轮播的效果时非常有用
loop：是否循环滚动
centeredSlides：是否居中对齐（true:居中，false：左对齐），默认 false 左对齐，
autoplay：是否自动播放
navigation：是否启用左右切换箭头，可以自定义导航按钮的外观。
pagination：分页配置，可以自定义分页样式和位置。
clickable：在点击分页圆点的时候，是否进行切换
effect：指定幻灯片之间的过渡效果。常见选项包括 'slide'、'fade'、'cube'、'coverflow' 等。
grabCursor：在拖动滑块时将光标更改为抓取器图标。
keyboard：启用键盘控制以导航滑块。
mousewheel：启用鼠标滚轮控制滑块。
scrollbar：显示滚动条
draggable：滚动条可拖动
autoplay：切换图片的频率（毫秒为单位）
delay：切换的时间（单位：2500毫秒ms）
disableOnInteraction：滑动图片后不禁用自动播放
disableOnInteraction: false,
:slidesPerColumn="4"
```

##### 分页pagination
```
绑定在swiper上
<swiper :pagination="{ clickable: true, el: '.swiper-paginations' }" />

可以绑定el 类名，可以在swiper外定义容器, 设置分页显示位置及样式
<div class="swiper-paginations"></div>
```

##### 左右切换箭头 navigation
```
绑定在swiper上
<swiper :navigation="{ nextEl: '.button-next', prevEl: '.button-prev'}" />

绑定左右箭头类名.button-next ，.button-prev 可以在swiper外定义容器
<!-- 左右两侧的方向按钮 -->
<div class="button-prev" @click.stop="prevEl">
    <span style="border: 1px solid">&lt;</span>
</div>
<div class="button-next" @click.stop="nextEl">
    <span style="border: 1px solid">&gt;</span>
</div>
```