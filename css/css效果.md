

##### 利用 **i** 标签加background-image设置虚线 取代 border: dashed
![Alt text](./mdimgs/i2023-09-20_22-11-52.png)
```css
.border-i {
    background-image: repeating-linear-gradient(90deg,#0000,#0000 8px,#ffca98cc 0,#ffca98cc 15px,#0000 0);
    display: block;
    height: 1px;
    left: 0;
    position: absolute;
    top: 75px;
    width: 100%;
}
```