
/**
 * 盒子参数
 * 1、根据数据画出盒子
 * 2、盒子在浏览器可视区域之内可任意移动
 * 3、可以大于宽50高50的尺寸进行拖动大小
 * 4、移动和改变大小要把size和pos数据改变
 */

export default [
    {
        id: "box-1",
        classList: ["box","box-1"],
        size: [100, 200],
        bgColor: "skyblue",
        pos: [0, 0]
    },{
        id: "box-2",
        classList: ["box","box-2"],
        size: [150, 200],
        bgColor: "orange",
        pos: [50, 0]  
    },{
        id: "box-3",
        classList: ["box","box-3"],
        size: [150, 200],
        bgColor: "pink",
        pos: [100, 150]  
    }
]