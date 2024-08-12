<!--
 * @Description: 星空效果
 * @Date: 2024-07-18 12:14:17
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\scss_star.vue
-->
<template>
    <div class="scss-star">
        <div class="title">SCSS星空效果</div>
        <div class="layer1"></div>
        <div class="layer2"></div>
        <div class="layer3"></div>
        <div class="layer4"></div>
        <div class="layer5"></div>
    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.scss-star {
    height: 80vh;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    overflow: hidden;
}

.title {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    font-family: "lato", sans-serif;
    font-weight: 300;
    font-size: 50px;
    letter-spacing: 10px;
    margin-top: -60px;
    padding-left: 10px;
    background-clip: text;
    color: #fff;
}

// random 生成随机数
// unquote 去除""
// $size: unquote("#{random(100)}px");
// $shadows: "";
$duration: 400s; // 动画时间
$count: 500; // 数量

@function getShadows($n) {
    $shadows: "#{random(100)}vw #{random(100)}vh #fff";
    @for $i from 2 through $n {
        $shadows: "#{$shadows}, #{random(100)}vw #{random(100)}vh #fff"
    }

    @return unquote($shadows);
}

@for $i from 1 through 5 {
    $duration: calc($duration / 2);
    $count: floor(calc($count / 2));

    .layer#{$i} {
        $size: #{$i}px;
        position: fixed;
        width: $size;
        height: $size;
        border-radius: 50%;
        left: 0;
        top: 0;
        background: #f40;
        // box-shadow: 20vw 30vh #fff, 40vw 40vh #fff;
        box-shadow: getShadows($count);
        animation: move $duration linear infinite;

        // 复制一份数据
        &::after {
            content: "";
            position: fixed;
            left: 0;
            top: 80vh;
            border-radius: inherit;
            width: inherit;
            height: inherit;
            box-shadow: inherit;
        }
    }
}

@keyframes move {
    to {
        transform: translateY(-100vh);
    }

}
</style>
