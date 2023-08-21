<template>
  <div class="live-anchor">
    <div class="live-anchor-top">
        <img src="img/live/about.png" alt="" >
    </div>
    <div class="live-content">
        <img src="img/live/title.png" alt="">
        <div class="live-content-text">content</div>
    </div>
    <div class="footer">
        <div class="footer-title">底部-footer</div>
        <img src="img/live/footer.png" alt="">
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">

.live-anchor {
    &-top {
        img {
            width: 100%;
        }
    }
    .live-content {
        margin-top: -100px;
        img {
            width: 100%;
        }
        &-text {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            color: #fff;
            margin-top: -50px;
            // background: url("~public/img/live/about.png");
        }
    }
    .footer {
        position: relative;
        img {
            width: 100%;
        }
        &-title {
            position: absolute;
            top: 0;

        }
    }
}
</style>
