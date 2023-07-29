import { getDateInfo } from "./utils";

import { render, update } from "./render";
import event from "./event";

export default (handler) => {
  const oContainer = document.createElement("div");
  // oContainer.border = "1"
  oContainer.className = "my-calendar";

  event(oContainer, handler);
  return {
    render: render(oContainer),
    update,
    getDateInfo,
  };
};
