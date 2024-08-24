/*
 * @Description: 指令
 * @Date: 2024-08-12 23:49:12
 * @FilePath: \web-project\node-egg-demo\admin-project\src\boot\directive.js
 */
// 默认占位图
import DEFAULT_IMG from "src/assets/loading.svg";

/**
 * 图片懒加载指令
 */
const imglazy = {
  mounted(el, binding) {
    el.src = DEFAULT_IMG;
    const loadImage = () => {
      const img = new Image();
      img.src = binding.value;

      img.onload = () => {
        el.src = binding.value;
        el.classList.add("imglazy"); // 图片加载后添加样式类
      };

      img.onerror = () => {
        el.src = DEFAULT_IMG; // 加载失败时使用备选图片
      };
    };

    el.imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // loadImage();
            fetch_img(el, binding.value);
            el.imgObserver.unobserve(el);
          }
        });
      },
      {
        // root: null, // 观察容器 document.querySelector("#scrollArea")
        // rootMargin: "0px", // 缩小root元素的边界,用来控制什么时候触发可见性变化, 只有一个值四个方向都使用同一个
        threshold: 0.01, // 0-1 回调函数被触发的时机, 可见部分超过目标元素 50% 可见时触发回调
      }
    );

    el.imgObserver.observe(el);
  },
  unmounted(el, binding) {
    if (el.imgObserver) {
      //   el.imgObserver.disconnect();
      el.imgObserver.unobserve(el);
    }
  },
};

// 图片错误次数
let img_error = 0;
/**
 * 图片错误重试
 * @param {*} el
 */
function fetch_img(el, imgUrl) {
  if (!imgUrl) {
    return;
  }
  el.src = imgUrl;
  // el.onload = () => {
  //   el.src = imgUrl;
  //   el.classList.add("imglazy"); // 图片加载后添加样式类
  //   console.log('---logs--el-',el);
  // };
  el.onerror = async () => {
    if (img_error > 3) {
      el.src = DEFAULT_IMG;
      return;
    }
    try {
      const res_img = await fetch(imgUrl);
      if (res_img.ok) {
        img_error++;
        el.src = res_img.url;
      } else {
        if (img_error < 3) {
          img_error++;
          fetch_img(el, imgUrl);
        }
      }
    } catch (error) {
      el.src = DEFAULT_IMG;
      console.log("---error--", error);
    }
  };
}

export const setupDirective = (app) => {
  app.directive("lazy", imglazy);
};
