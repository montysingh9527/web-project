<!--
 * @Description: 走势图-测试1
 * @Date: 2024-07-18 12:13:51
 * @FilePath: \web-project\node-egg-demo\admin-project\src\page\css_test\lottery\lottery_test1.vue
-->
<template>
    <div class="canvas-chart">
        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true,
            default: () => [
                "long,long,long",
                "hu",
                "long",
                "hu",
                "long,long,long,long,long",
                "hu,hu,hu,hu",
                "long,long,long",
                "hu",
                "long,long,long,long,long,long,long,long,long",
                "hu,hu,hu,hu,hu,hu,hu,hu,hu",
            ]
        }
    },
    data() {
        return {
            canvasWidth: 350, // 根据需要设置适当宽度
            canvasHeight: 150, // 每列固定6个格子，高度调整为6*80 = 480
            cellWidth: 25, // 每列的宽度
            cellHeight: 25, // 每行的高度
            maxRows: 6, // 每列显示6个单元格
        };
    },
    mounted() {
        this.drawChart();
    },
    methods: {
        drawChart() {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 清除画布

            let currentColumn = 0; // 当前列索引
            let currentRow = 0; // 当前行索引

            this.data.forEach(item => {
                const values = item.split(",");

                // 如果当前行已经满了, 切换到下一列
                values.forEach((value, index) => {
                    let x = currentColumn * this.cellWidth;
                    let y = currentRow * this.cellHeight;

                    // 设置背景颜色
                    ctx.fillStyle = value === "long" ? "yellow" : (value === "hu" ? "lightblue" : "white");

                    ctx.fillRect(x, y, this.cellWidth, this.cellHeight); // 绘制矩形
                    ctx.strokeRect(x, y, this.cellWidth, this.cellHeight); // 绘制边框

                    // 绘制文本
                    ctx.fillStyle = value === "long" ? "red" : (value === "hu" ? "purple" : "black");
                    ctx.font = "16px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle"; // 垂直居中
                    if (value) {
                        const text = value === "long" ? "龙" : "虎";
                        ctx.fillText(text, x + this.cellWidth / 2, y + this.cellHeight / 2); // 在矩形中央显示文本
                    }

                    // 更新行列索引
                    currentRow++;
                    if (currentRow >= this.maxRows) {
                        currentRow = 0;
                        currentColumn++;
                    }
                });

                // 处理完当前数据项后，确保列填满
                while (currentRow < this.maxRows) {
                    let x = currentColumn * this.cellWidth;
                    let y = currentRow * this.cellHeight;

                    // 绘制空白格子
                    ctx.fillStyle = "white";
                    ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
                    ctx.strokeRect(x, y, this.cellWidth, this.cellHeight);

                    currentRow++;
                }

                // 如果当前列的高度已满，移动到下一列
                if (currentRow >= this.maxRows) {
                    currentRow = 0;
                    currentColumn++;
                }
            });

            // 绘制两列额外的空白格子
            for (let i = 0; i < 2; i++) { // 额外的2列
                for (let j = 0; j < this.maxRows; j++) {
                    let x = currentColumn * this.cellWidth;
                    let y = j * this.cellHeight;

                    // 绘制空白格子
                    ctx.fillStyle = "white";
                    ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
                    ctx.strokeRect(x, y, this.cellWidth, this.cellHeight);
                }
                currentColumn++;
            }
        }
    }
};
</script>

<style scoped lang="scss">
canvas {
    border: 1px solid #ccc;
}
</style>