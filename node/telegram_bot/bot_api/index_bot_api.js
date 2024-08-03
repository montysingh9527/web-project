/*
 * @Description: telegram机器人
 * @Date: 2024-07-19 22:34:54
 * @FilePath: \web-project\node\telegram_bot\bot_api\index_bot_api.js
 */
// https://core.telegram.org/bots/features#botfather
/**
 * https://github.com/deepred5/yande-telegram-bot
 * https://github.com/brickspert/blog/issues/65
 */
const TelegramBot = require("node-telegram-bot-api");
const { token, keyboard_config } = require("./config.js");

// 创建bot实例
const bot = new TelegramBot(token, {
  polling: true, // polling模式
});

// 定义匹配http或https链接的正则表达式
const urlRegex = /https?:\/\/[^\s]+/;

// 删除消息聊天室id 及 消息id
let chat_list = [];

// 消息按钮
const reply_markup_config = {
  reply_markup: {
    inline_keyboard: keyboard_config,
  },
};

// 监听所有新的消息
bot.on("message", (msg) => {
  console.log(`-${new Date().toLocaleString()}-msg-`, msg);
  // 获取消息的chatId和消息内容
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const messageId = msg.message_id;
  // 检查消息是否来自指定的频道
  if (msg.chat.username === "sanhaobot_test") {
    chat_list.push({
      chatId,
      messageId,
    });
    console.log(
      `-${new Date().toLocaleString()}-来自频道 @${
        msg.chat.username
      }聊天室:${chatId} 的消息: ${messageText}`
    );
    // 包含https/http 链接 || 图片
    if (urlRegex.test(messageText) || msg.photo?.length) {
      // 删除消息
      bot
        .deleteMessage(chatId, messageId)
        .then(() => {
          console.log(`消息 ${messageId} 已删除`);
        })
        .catch((err) => {
          console.error(`删除消息 ${messageId} 时出错:`, err);
        });
    } else {
      console.log(`-${new Date().toLocaleString()}--未匹配-`);
    }
  }
});

/**
 * 指令
 */
bot.onText(/\/menu/, (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  bot.sendMessage(chatId, "菜单", {
    ...reply_markup_config,
  });
});

/**
 * date指令
 */
bot.onText(/\/date/, (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  console.log("---logs-msg, match--", msg, match);
  bot.sendMessage(chatId, `当前时间: ${new Date().toLocaleString()}`, {
    ...reply_markup_config,
  });
});

/**
 * 按钮事件-指令处理
 */
bot.on("callback_query", function (data) {
  const callbackData = JSON.parse(data.data);
  const { chat, message_id } = data.message;
  console.log("---logs-data--", data);
  if (callbackData.command === "abouts") {
    bot.answerCallbackQuery(
      data.id,
      `当前时间: ${new Date().toLocaleString()}`
    );
  } else if (callbackData.command == "welcome") {
    bot.sendMessage(chat.id, `欢迎: ${chat.first_name} 进群.`, {
      ...reply_markup_config,
    });
  } else {
    bot.answerCallbackQuery(data.id, { text: "指令不存在,开发中..." });
  }
});

bot.on("polling_error", (error) => {
  console.log("---polling_error---", error.code); // => 'EFATAL'
});

// setInterval(() => {
//   if (chat_list.length) {
//     chat_list.forEach((item) => {
//       bot
//         .deleteMessage(item.chatId, item.messageId)
//         .then(() => {
//           console.log(
//             `${new Date().toLocaleString()}-消息--${item.messageId} 已删除`
//           );
//         })
//         .catch((err) => {
//           console.error(
//             `${new Date().toLocaleString()}-删除消息--${
//               item.messageId
//             } 时出错:`,
//             err
//           );
//         });
//     });
//   }
// }, 2000 * 60);
