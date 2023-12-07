import moment from 'moment';
//格式化时间
export function dateformat(val, pattern = "yyyy-MM-DD HH:mm:ss") {
  return moment(val).format(pattern);
};

export function getLocalTime(nS) {
  // 将时间戳（十三位时间搓，也就是带毫秒的时间搓）比如：1563013956094 转换成时间格式
  // d.cTime = 1539083829787
  let date = new Date(nS);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  date = year + '-' + month + '-' + day;
  return date;
}

export function convertDate(time) { // 中国标准时间转为yyyy-mm-dd
  var d = new Date(time);
  var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

  return datetime;
}

export function convertDateTime(time) { // 中国标准时间转为yyyy-mm-dd
  var d = new Date(time);
  var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

  return datetime;
}

export function moneyFormat(value) {
  // if (!value && value !== 0) return '-';
  var intPart = parseInt(value) || 0 // 获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
  var floatPart = '.00'; // 预定义小数部分
  var value2Array = value.toString().split('.');

  //= 2表示数据有小数位
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString(); // 拿到小数部分

    if (floatPart.length === 1) { // 补0,实际上用不着
      return intPartFormat + '.' + floatPart + '0';
    } else {
      return intPartFormat + '.' + floatPart;
    }
  } else {
    return intPartFormat + floatPart;
  }
}

// export function formatUTC(utc_datetime) {

// // 2018-07-03T10:18:58.000Z是什么时间格式
// // UTC：时间标准时间，世界标准时间
// // GMT：格林尼治时间
// // GST：北京时间  把世界标准时间转为北京时间
//  // 转为正常的时间格式 年-月-日 时:分:秒
//  var T_pos = utc_datetime.indexOf('T');
//  var Z_pos = utc_datetime.indexOf('Z');
//  var year_month_day = utc_datetime.substr(0,T_pos);
//  var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
//  var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

//  // 处理成为时间戳
//  timestamp = new Date(Date.parse(new_datetime));
//  timestamp = timestamp.getTime();
//  timestamp = timestamp/1000;

//  // 增加8个小时，北京时间比utc时间多八个时区
//  var timestamp = timestamp+8*60*60;

//  // 时间戳转为时间
//  var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
//  return beijing_datetime;
//   }
/**
 * 倒计时工具
 * @param {起始时间} from
 * @param {终止时间} to
 * @param {到时回调函数} cb
 * @returns counter
 */
export const timeCountDown = function (from, to, cb) {
  from = Number(from) || 0;
  to = Number(to) || 0;
  cb = typeof cb === 'function' ? cb : () => { }

  let timer = null;
  const interval = 500;
  const counter = {
    clear: () => clearInterval(timer),
    hour: 0,
    minute: 0,
    second: 0,
    timeleft: 0
  }

  if (to === 0 && from === 0) {
    return counter;
  }
  const calcTime = () => {
    const dur = moment.duration(moment(to).diff(moment(from)));
    counter.hour = Math.max(0, Math.floor(dur.asHours()));
    counter.minute = Math.max(0, dur.minutes());
    counter.second = Math.max(0, dur.seconds());
    counter.timeleft = dur.asMilliseconds();

    if (counter.timeleft <= 0) {
      clearInterval(timer);
      cb(counter);
    }
  }
  let lastDate = Date.now();
  timer = setInterval(() => {
    const now = Date.now();
    from += (now - lastDate);
    lastDate = now;
    calcTime();
  }, interval);

  calcTime();

  return counter;
}
export function add([...item]) {
  var args = item
  var d = 0
  var sum = 0
  for (const key in args) {
    var str = '' + args[key];
    if (str.indexOf('.') !== -1) {
      var temp = str.split('.')[1].length;
      d = d < temp ? temp : d;
    }
  }
  var m = Math.pow(10, d);
  for (const key in args) {
    sum += args[key] * m;
  }
  return sum / m;
}
