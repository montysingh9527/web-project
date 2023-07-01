/**
 * 删除cell  自定义指令
 */

export default {
  mounted(el, bindings) {
    console.log("===bindings===", el, bindings.value);
    const oRemoveBtn = el.querySelector(".remove-btn");
    const { cellData, weekday, timeSlot } = bindings.value;

    oRemoveBtn.addEventListener("click", handleRemovePanel, false);

    function handleRemovePanel() {
      delete cellData[`${weekday}-${timeSlot}`];
    }
  },
};
