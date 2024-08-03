/*
 * @Description: 机器人配置
 * @Date: 2024-08-03 23:34:40
 * @FilePath: \web-project\node\telegram_bot\bot_api\config.js
 */

// 从BotFather获取的API令牌
const token = "900353384:AA26Km432M7-D20i4342VoFp4sMMokFT5339k"

// 消息下方按钮配置
const keyboard_config = [
  [
    {
      text: "联系我们",
      callback_data: JSON.stringify({ command: "abouts", index: 1 }),
    },
    {
      text: "进群欢迎",
      callback_data: JSON.stringify({ command: "welcome", index: 2 }),
    },
    {
      text: "自动回复",
      callback_data: JSON.stringify({ command: "reply", index: 3 }),
    },
  ],
  [
    {
      text: "敏感词过滤",
      callback_data: JSON.stringify({ command: "words", index: 10 }),
    },
    {
      text: "推广链接",
      callback_data: JSON.stringify({ command: "link", index: 11 }),
    },
  ],
  [
    {
      text: "定时广告",
      callback_data: JSON.stringify({ command: "bill", index: 20 }),
    },
  ],
];

module.exports = {
  token,
  keyboard_config,
};
