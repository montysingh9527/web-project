/*
 * @Description: telegram机器人bot   https://core.telegram.org/bots
 * @Date: 2024-07-19 20:20:53
 * @FilePath: \web-project\node\telegram_bot\demo.js
 */
const axios = require("axios");

const token_bot = "900353384:AA26Km432M7-D20i4342VoFp4sMMokFT5339k";

const BASE_URL = `https://api.telegram.org/bot${token_bot}/`;

/**
 * 获取信息
 */
async function getMe_bot() {
  const bot = await axios({
    method: "get",
    url: BASE_URL + "getMe",
  });
  console.log("---logs-bot--", bot.data);
}

// getMe_bot();

/**
 * 获取更新信息
 */
async function getUpdates_bot() {
  const bot = await axios({
    method: "get",
    url: BASE_URL + "getUpdates",
  });

  const res = bot.data.result;
  console.log("---logs-bot-11-", JSON.stringify(res));
}

getUpdates_bot();

// 获取频道所有信息
async function getUpdates_room_bot(text) {
  try {
    const bot = await axios({
      method: "post",
      url: BASE_URL + "sendMessage",
      //   params: {
      data: {
        chat_id: "@bot_test",
        text: `bot发送消息test${text}`,
      },
    });
    const res = bot.data;
    console.log("---logs-bot--", JSON.stringify(res));
  } catch (error) {
    console.log("---error---", error);
  }
}


for(let i = 1; i <= 5; i ++){
    // getUpdates_room_bot(i);
}

