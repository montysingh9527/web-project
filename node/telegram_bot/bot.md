#### telegram申请bot机器人
> https://core.telegram.org/bots/features#botfather
- 1.在telegram官方机器人 `@BotFather` 中发送 `/newbot` 获取自己的bot机器人, 机器人的用户名必须以“bot”结尾，例如“tetris_bot”或“TetrisBot”
- 2.将bot机器人添加到 `频道` 或 `群组` 
> 注意: 频道不能是私人频道
#### 开发机器人
- 1.安装插件 `node-telegram-bot-api`
- 2.插件使用
```
// 创建bot
const bot = new TelegramBot(token, { polling: true });
// 监听消息
bot.on("message", (msg) => {})
// 删除消息   聊天室id,消息id
bot.deleteMessage(chatId, messageId).then((res)=>{})
```

#### 问题
- 1.如何删除一个时间段的消息?
```
注意: 无法根据时间段删除消息, 只能根据id来删除消息.
1.监听消息 bot.on("message", (msg) => {})
2.将聊天室id和消息id存入, 使用定时任务删除聊天室时间段存入的消息

```
