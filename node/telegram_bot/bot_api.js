// https://core.telegram.org/bots/features#botfather
const TelegramBot = require("node-telegram-bot-api");

// 从BotFather获取的API令牌
const token = "900353384:AA26Km432M7-D20i4342VoFp4sMMokFT5339k";

// 创建bot实例
const bot = new TelegramBot(token, { polling: true });

// 定义匹配http或https链接的正则表达式
const urlRegex = /https?:\/\/[^\s]+/;

// 删除消息聊天室id 及 消息id
let chat_list = [];

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

bot.on("polling_error", (error) => {
  console.log("---polling_error---", error.code); // => 'EFATAL'
});

setInterval(() => {
  if (chat_list.length) {
    chat_list.forEach((item) => {
      bot
        .deleteMessage(item.chatId, item.messageId)
        .then(() => {
          console.log(
            `${new Date().toLocaleString()}-消息--${item.messageId} 已删除`
          );
        })
        .catch((err) => {
          console.error(
            `${new Date().toLocaleString()}-删除消息--${
              item.messageId
            } 时出错:`,
            err
          );
        });
    });
  }
}, 2000 * 60);
