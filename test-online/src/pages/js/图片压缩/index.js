/**
 * 利用canvas画布压缩图片
 */

const oImgFileSelector = document.querySelector("#imgFileSelector");
const oOriginImgPreview = document.querySelector("#originImgPreview");
const oCompressedImgPreview = document.querySelector("#compressedImgPreview");
// 使用 File 或 Blob 对象指定要读取的文件或数据。
const reader = new FileReader();

// 图片信息
let imgFile = null;
let quality = 90;
let compressedImgSrc = "";

// 支持图片类型
const IMG_TYPES = {
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
  "image/gif": "image/gif",
};
// 初始化函数
const init = () => {
  bindEvent();
};
// 事件绑定
function bindEvent() {
  oImgFileSelector.addEventListener("change", handleFileSelectorChange, false);
}

// 上传图片
function handleFileSelectorChange(e) {
  imgFile = e.target.files[0];
  console.log("--imgFile--11-", imgFile);
  if (!imgFile || !IMG_TYPES[imgFile.type]) {
    alert("请选择正确格式的图片");
    setImgFileEmpty();
    return;
  }
  setImgPreview(imgFile);
}

// 清空图片
function setImgFileEmpty() {
  oImgFileSelector.value = "";
  imgFile = null;

  setPreviewVisible(oOriginImgPreview, false);
  setPreviewVisible(oCompressedImgPreview, false);
}

function setImgPreview(imgFile) {
  //   console.log("--imgFile--22-", imgFile);
  if (imgFile instanceof File) {
    reader.onload = async () => {
      const originImgSrc = reader.result;
      //   console.log(originImgSrc);

      const compressedImgSrc = await createCompressedImage({
        imgSrc: originImgSrc,
        type: imgFile.type,
      });

      console.log("---compressedImgSrc---", compressedImgSrc);

      oOriginImgPreview.src = originImgSrc;
      oCompressedImgPreview.src = compressedImgSrc;

      setPreviewVisible(oOriginImgPreview, true);
      setPreviewVisible(oCompressedImgPreview, true);

      console.log(
        "---length---99--",
        originImgSrc.length,
        compressedImgSrc.length,
        quality
      );
    };
    reader.readAsDataURL(imgFile);
  }
}

function createCompressedImage({ imgSrc, type }) {
  // 创建画布
  const oCan = document.createElement("canvas");
  const oImg = document.createElement("img");
  const ctx = oCan.getContext("2d");

  oImg.src = imgSrc;

  return new Promise((resolve) => {
    oImg.onload = () => {
      const imgWidth = oImg.width;
      const imgHeight = oImg.height;

      oCan.width = imgWidth;
      oCan.height = imgHeight;

      ctx.drawImage(oImg, 0, 0, imgWidth, imgHeight);
      // 画布方法toDataURL
      const compressedImgSrc = oCan.toDataURL(type, quality / 100);
      console.log("---compressedImgSrc---00----", compressedImgSrc);
      doCompress(oCan, imgSrc, type);
      resolve(compressedImgSrc);
    };
  });
}

/**
 * 图片压缩
 * @param {*} canvas
 * @param {*} imgSrc
 * @param {*} type
 */
function doCompress(canvas, imgSrc, type) {
  compressedImgSrc = canvas.toDataURL(type, quality / 100);

  if (compressedImgSrc.length >= imgSrc.length && quality > 10) {
    quality -= 10;
    doCompress(canvas, imgSrc, type);
  }
}

/**
 * 设置图片显示/隐藏
 * @param {*} node 节点
 * @param {*} visible 显示隐藏
 */
function setPreviewVisible(node, visible) {
  switch (visible) {
    case true:
      node.classList.remove("hide");
      node.classList.add("show");
      break;
    case false:
      node.classList.remove("show");
      node.classList.add("hide");
      break;
    default:
      break;
  }
}

init();
