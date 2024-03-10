// const CryptoJS = require('crypto-js');
const CryptoJS = require('crypto');
import JsEncrypt from 'jsencrypt'

import { param, getUrlParameters, deepClone } from '../assets/js/util.js'

const pubKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0CZTn+50HHM0QkziEuno
fDfIG77buLuRwItL8My9EYAyuLSW1qkLgqta2z2bIedx7Ro6enOZ0PZNFnqsztlt
GctwTwAVQDGoB+kpqUi5gs5jRTcoRkytgaLs7xZey45H0c2Hof4W+rcdHR/xc7C0
hT5fBNqEDjBmGvoLlYpHag/p4m7h+JgpWHmKGWg7ijHMPWJQSFD1JPnP7upQlTJ8
BKl24em6n2lSyH8qkoJKoEzUfQ7HricpF4S6MVCm36BSfkz35Oy4La7WxDrwW8KD
s3ahKHM4uifgDlupZ+nV/dgzCQWDi5lNiQlvWR0xKsjwwrnXTdHPnMYDX8NdDTvT
cQIDAQAB
-----END PUBLIC KEY-----`

// 需要md5加密一次的参数字段
const needMd5Key = ['pwd', 'fund_pwd', 'login_pwd', 'old_pwd', 'new_pwd', 'fundPwd']

// EDE3加密过
function Encrypt(encrypt, _key) {

	// let keyHex = CryptoJS.enc.Utf8.parse(_key);
	// let encrypted = CryptoJS.DES.encrypt(encrypt, keyHex, {
	// 	mode: CryptoJS.mode.ECB,
	// 	padding: CryptoJS.pad.Pkcs7
	// });
	// return encrypted.ciphertext.toString();


	const encryptBuffer = new Buffer(encrypt);
	const md5Key = new Buffer(_key);
	// iv表示初始化向量
	const iv = new Buffer(0);
	const cipher = CryptoJS.createCipheriv('des-ede3', md5Key, iv);
	cipher.setAutoPadding(true);
	let ciph = cipher.update(encryptBuffer, 'utf8', 'base64');	//输入为utf8，输出为base格式
	ciph += cipher.final('base64');

	//	输出时是EDE3加密过后的base64编码
	return ciph;
}

// RSA 加密sign 签名
function encryptRsa(keyStr) {
	let jse = new JsEncrypt();

	// 设置公钥
	jse.setPublicKey(pubKey);

	// 字符串加密
	let encrypted = jse.encrypt(keyStr)

	return encrypted
}


// 生成一个24位随机字符窜
function randomHex() {
	let str = "0123456789abcd".split('')
	let arr = Array.from({length: 24}).map(v => str[Math.floor(Math.random() * str.length)])

	return arr.join('')
}

// md5加密
export function md5(str = '') {

	// return CryptoJS.MD5(str)

	// 创建一个hash对象
	const hash = CryptoJS.createHash('md5');

	hash.update(str);

	//使用编码格式的参数，输出的是一个字符串格式的摘要内容
	return hash.digest('hex')
}

// 参数加密 二次封装
function encryption(params = {}, _key = '') {

	let data = deepClone(params)

	for(let key in data) {

		// 如果是需要 md5加密一次的字段, 先转md5再EDE3加密
		// 如: pwd, fundpwd

		let v = data[key]

		// 一次加密
		if (needMd5Key.includes(key)) {
			v = md5(v)
		}

		// 二次加密
		data[key] = trs(v, _key)
	}

	_key && (data.sign = encryptRsa(_key))

	return data
}

/** 递归处理 数组 对象
  * 参数任意类型
  * 主要处理参数 对象或数组多层嵌套 情况
 **/
function trs(v, _key) {
    // 如果是对象
    if (typeof v === 'object' && v !== null) {
        for(let key in v) {
            let newVal = v[key]
            v[key] = trs(newVal, _key)
        }
        // 如果是数组
    } else if (Array.isArray(v)) {
        v = v.map(value => trs(value, _key))
    } else {
		if(_key) {
			v = Encrypt(String(v), _key)
		} else {
			v = v
		}
    }

    return v
}

export function encryptionThirdUrl(oldUrl, api) {

	const keyStr = randomHex()

	let arr = oldUrl.split(api)

	let params = getUrlParameters(arr[1])

	let data = encryption(params, keyStr)

	let newUrl = arr[0] + api + 'checkSign=true&' + param(data)

	return newUrl
}


export default {
	encryption,
	randomHex,
	encryptionThirdUrl
}
