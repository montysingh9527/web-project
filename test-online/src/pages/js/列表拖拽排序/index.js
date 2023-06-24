const listData = [
  "11111111111111111",
  "22222222222222222",
  "33333333333333333",
  "44444444444444444",
];

(() => {
  const oWrapper = document.querySelector(".draggable-list-wrapper");

  const init = () => {
    render();
    bindEvent();
  };

  function render() {
    const oList = createList();
    oWrapper.appendChild(oList);
  }

  // 事件绑定
  function bindEvent() {
    const oDraggableList = oWrapper.querySelector(".draggable-list");
    const oDraggableItems = oDraggableList.querySelectorAll(".draggable-item");
    oDraggableList.addEventListener("dragover", handleDragOver, false);
    window.addEventListener("dragover", (e) => e.preventDefault(), false);
    oDraggableList.addEventListener(
      "dragenter",
      (e) => e.preventDefault(),
      false
    );
    window.addEventListener("dragenter", (e) => e.preventDefault(), false);

    oDraggableItems.forEach((item) => {
      item.addEventListener("dragstart", handleDragStart, false);
      item.addEventListener("dragend", handleDragEnd, false);
    });
  }

  //   开始拖拽
  function handleDragStart() {
    const item = this;
    // 拖拽后延迟添加类。 （否则鼠标选中的元素也会看不见）
    setTimeout(() => item.classList.add("dragging"), 0);
  }
  // 结束拖拽
  function handleDragEnd() {
    const item = this;
    item.classList.remove("dragging");
  }
  function handleDragOver(e) {
    e.preventDefault();
    const oDraggableList = this;

    const oDraggableItem = oDraggableList.querySelector(".dragging");
    // 查找出所有不是拖拽的元素
    const oSibItems = oDraggableList.querySelectorAll(
      ".draggable-item:not(.dragging"
    );

    // 查找相邻的元素，是相邻元素高度的2/1
    const oSibItem = [...oSibItems].find(
      (item) => e.clientY <= item.offsetTop + item.offsetHeight / 2
    );
    // 将拖动的元素放置在相邻元素后面
    oDraggableList.insertBefore(oDraggableItem, oSibItem);
  }

  // 创建节点
  function createList() {
    const oDraggableList = document.createElement("ul");
    oDraggableList.className = "draggable-list";

    listData.forEach((item) => {
      const oItem = document.createElement("li");
      oItem.className = "draggable-item";
      // 设置可拖拽属性
      oItem.draggable = true;
      oItem.innerHTML = `<p>${item}</p>`;
      oDraggableList.appendChild(oItem);
    });

    return oDraggableList;
  }

  init();
})();
