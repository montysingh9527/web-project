/*
 * @Description: 
 * @Date: 2024-02-27 23:49:20
 * @FilePath: \web-project\node-egg-demo\admin-project\src\boot\utils.js
 */
import { i18n, i18n_t } from "src/i18n/index.js";

/**
 * 常用全局方法
 */

import { Notify, Dialog } from "quasar";

/**
 * Notify消息提示
 * @param {message} 消息
 * @param {position} 展示位置
 * @param {color}  negative红色  warning黄色  info  negative红色
 */
const showNotify = ({ message = "成功。", position = "top", color = "teal" }) => {
  Notify.create({
    message,
    position,
    color,
    timeout: 3000,
  });
};

/**
 * 二次确认弹窗
 * @param {title} 标题
 * @param {msg} 提示语
 * @param {content} 内容
 * @returns
 */
const showDialog = ({ title = "删除", message = "确认删除吗 ?", content = "" }) => {
  const innerMsg = `<div class="text-body2">${content}</div> <div class="text-red q-mt-md text-subtitle1">${message}</div>`;
  // 创建Dialog实例
  const initDialog = Dialog.create({
    title,
    message: innerMsg,
    cancel: true,
    persistent: true,
    html: true, // 开启内容支持html
    ok: {
      // push: true
      label: "确定",
    },
    cancel: {
      label: "取消",
      color: "grey-8", // 'negative'
    },
  });

  const result = new Promise((resolve, reject) => {
    // 确认删除
    initDialog.onOk((data) => {
      return resolve(true);
    });
    // 取消删除
    initDialog.onCancel(() => {
      return resolve(false);
    });
  });
  return result;
};

export const setupUtils = (app) => {
  app.config.globalProperties.$showNotify = showNotify;
  app.config.globalProperties.$showDialog = showDialog;
  app.config.globalProperties.$i18n = i18n;
  app.config.globalProperties.$i18n_t = i18n_t;
  window.$i18n_t = i18n_t;
};
