/*
 * @Description: 汇总设置
 * @Date: 2024-03-18 01:17:53
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\schedule\update_img.js
 */
// https://www.eggjs.org/zh-CN/basics/schedule#%E4%BB%BB%E5%8A%A1
// cron: '0 0 2 * * ?', // 每日2点执行
let index = 0;
// module.exports = app => { schedule: {} }
module.exports = {
  schedule: {
    // interval: '1m', // 1分钟间隔
    // interval: "20s", // 20秒间隔
    // interval: 2000, // 2秒间隔
    cron: "0 0 */3 * * *", // 每三小时准点执行一次, 参考: https://www.eggjs.org/zh-CN/basics/schedule#cron
    type: "all", // 两种类型: all/worker   worker 类型：只有一个会执行这个定时任务,每次执行是随机的。 all 类型：都会执行这个定时任务。
    // cronOptions：配置 cron 的时区等，参见 cron-parser 文档。
    // immediate：配置该参数为 true 时，这个定时任务会在应用启动并 ready 后立即执行一次这个定时任务。
    // disable: require('os').hostname() !== app.config.sync.hostname, 配置该参数为 true 时，这个定时任务不会被启动。
    // env: [ 'prod' ], 数组，仅在指定的环境下才启动该定时任务。
  },
  async task(ctx) {
    ctx.logger.warn("--定时任务-task--55--", index++);
    // const res = await ctx.curl("http://www.api.com/cache", {
    //   dataType: "json",
    // });
    // ctx.app.cache = res.data;
  },
};
