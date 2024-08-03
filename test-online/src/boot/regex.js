/*
 * @Description: regex正则表达式汇总
 * @Date: 2024-07-22 23:42:47
 * @FilePath: \web-project\test-online\src\boot\regex.js
 */

// 正则练习网址：https://regexr.com/

// 正则表达式命名捕获组
const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const match = reg.exec('2021-02-23');


// 判断是否是数字  isFinite("11")
const is_number = /^\d+$/.test("11")


/**
 * 匹配以 http 或 https 开头并以 .com 结尾的网址 
 */ 

const regex = /^https?:\/\/[^\s]+\.com$/i;
解释
^：表示匹配输入的开始位置。
https?：表示匹配 http 或 https。? 表示 s 是可选的。
:\/\/：匹配 ://，这是 http 和 https 后面的分隔符。
[^\s]+：匹配一个或多个非空白字符，这部分会匹配网址的主机名和路径部分。
\.com：匹配 .com，其中 \. 表示字面意义上的点（.）字符。
$：表示匹配输入的结束位置。
i：表示忽略大小写。

const urls = [
    'ftp://example.com',
    'https://example.com/page',
    'http://example.com?query=string'
  ];
  
  urls.forEach(url => {
    if (regex.test(url)) {
      console.log(`${url} matches the pattern.`);
    } else {
      console.log(`${url} does not match the pattern.`);
    }
  });