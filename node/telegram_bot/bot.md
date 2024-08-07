#### telegram 申请 bot 机器人

> https://core.telegram.org/bots/features#botfather

- 1.在 telegram 官方机器人 `@BotFather` 中发送 `/newbot` 获取自己的 bot 机器人, 机器人的用户名必须以“bot”结尾，例如“tetris_bot”或“TetrisBot”
- 2.将 bot 机器人添加到 `频道` 或 `群组`
  > 注意: 频道不能是私人频道

#### 开发机器人

- 1.安装插件 `node-telegram-bot-api`
- 2.插件使用

```
const Agent = require('socks5-https-client/lib/Agent');  // 设置代理
// 创建bot
const bot = new TelegramBot(token, {
    polling: true,
    // request: { // 设置代理
    //    agentClass: Agent,
    //    agentOptions: {
    //        socksPassword: config.socksPassword
    //    }
    // }
});
// 监听消息
bot.on("message", (msg) => {})
// 删除消息   聊天室id,消息id
bot.deleteMessage(chatId, messageId).then((res)=>{})
```

#### 设置机器人页面的菜单

- 1.在 `@BotFather` 中输入 `/setcommands`

#### 消息下方的按钮配置 reply_markup : { inline_keyboard: [[text:"链接", url: "www.baidu.com"]] }

```
bot.sendMessage(chatId, '消息msg', {
    reply_markup: {
        inline_keyboard: todoList.map((item, index) => [
            {
                text: `${index + 1}. ${item}`,
                callback_data: JSON.stringify({ command: 'delete', index })
            },
        ]),
    },
});

// 按钮事件处理
bot.on("callback_query", function (data) {})
```

#### 设置消息格式 parse_mode: "MarkdownV2"

```
在消息内容 添加要回复的消息 id
bot.sendMessage(chatId, '<a>http:www.mi.com</a>',{
    reply_to_message_id: 64,
    parse_mode: "MarkdownV2", // "html"
});
```

#### 回复消息 reply_to_message_id

```
在消息内容 添加要回复的消息 id
bot.sendMessage(chatId, '消息msg',{
    reply_to_message_id: 64,
});
```

#### 发送图片 sendPhoto

```
在消息内容 添加要回复的消息 id
bot.sendPhoto(chat.id, "/path/to/image.jpg", {
    ...reply_markup_config,
    caption: "通过URL发送的图片", // 为发送的图片添加的描述文字
});
```

#### 发送多张图片 sendMediaGroup

```
 bot.sendMediaGroup(
    chatId,
    [
      {
        type: "photo",   // 格式 photo/video
        media: "https://example.com/path/to/image1.jpg",
        caption: "第一张图片",
        reply_markup: {
          inline_keyboard: keyboard_config,
        },
      },
    ],
    {
      // ...reply_markup_config,
    }
  );
```

#### 问题

- 1.如何删除一个时间段的消息?

```
注意: 无法根据时间段删除消息, 只能根据id来删除消息.
1.监听消息 bot.on("message", (msg) => {})
2.将聊天室id和消息id存入, 使用定时任务删除聊天室时间段存入的消息

```

### 需求功能

- 1.进群验证
- 2.进群欢迎
- 3.定时广告
- 4.自动回复
- 5.自动禁言
- 6.字数限制
- 7.删除链接
- 8.删除转发
- 9.敏感词设置
- 10.按钮设置
- 11.添加 VIP
- 12.管理员命令
- 13.共享群组
- 14.小程序
