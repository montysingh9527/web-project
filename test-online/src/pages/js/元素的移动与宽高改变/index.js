import DraggableBox from "./DraggableBox.js";   // 操作类
import boxInfo from "./box-info.js";   // 盒子大小/偏移量数据

const init = () => {
  boxInfo.forEach((info) => {
    // 操作盒子类
    new DraggableBox(".container", info);
  });
};

init();
