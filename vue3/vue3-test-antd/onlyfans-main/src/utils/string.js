import CryptoJS from 'crypto-js';
export function formatBallNumber(n) {
  return String(n).padStart(2, '0');
}

export function leftPad(s, cnt, c) {
  while (s.length < cnt) {
    s = c + s;
  }
  return s;
}

/**
 * 校验字符串是否IP地址
 */
export function isIpAddr(str) {
  return str.match(/^([0-9]{1,3}\.{1}){3}[0-9]{1,3}$/);
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = ''
  Object.keys(params).forEach((key) => {
    if (!Object.is(params[key], undefined) && !Object.is(params[key], null) && !Object.is(JSON.stringify(params[key]), '{}')) {
      result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
    }
  })
  return result
}
// 加密
export function encryptByDES(message) {
  const key = 'nishishabi.com'
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}
// 解密
export function decryptByDES(ciphertext) {
  const key = 'nishishabi.com'
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  const resultvalue = decrypted.toString(CryptoJS.enc.Utf8);
  return resultvalue;
}