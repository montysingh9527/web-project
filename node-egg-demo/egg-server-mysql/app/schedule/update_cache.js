/*
 * @Description: 测试worker随机执行
 * @Date: 2024-03-18 00:19:14
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\schedule\update_cache.js
 */
const Subscription = require("egg").Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: "10m", // 10分钟间隔
      // interval: "3s", // 3秒间隔
    //   interval: 2000, // 2秒间隔
      //   cron: "0 0 */3 * * *", // 每三小时准点执行一次, 参考: https://www.eggjs.org/zh-CN/basics/schedule#cron
      type: "worker", // 两种类型: all/worker   worker 类型：只有一个会执行这个定时任务,每次执行是随机的。 all 类型：都会执行这个定时任务。
      // cronOptions：配置 cron 的时区等，参见 cron-parser 文档。
      // immediate：配置该参数为 true 时，这个定时任务会在应用启动并 ready 后立即执行一次这个定时任务。
      // disable：配置该参数为 true 时，这个定时任务不会被启动。
      // env：数组，仅在指定的环境下才启动该定时任务。
    };
  }
  async subscribe() {
    this.logger.info("--定时任务-subscribe--11-", new Date().toLocaleString());
  }
  async subcache() {
    this.logger.info("--定时任务-subcache--22", new Date().toLocaleString());
  }
  async subLocal() {
    this.logger.info("--定时任务-subLocal--33", new Date().toLocaleString());
  }
}

module.exports = UpdateCache;
