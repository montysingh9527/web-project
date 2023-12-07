import CryptoJS from 'crypto-js'

// 加密
export function Encrypt(word) {
    let key = '8051d3f3db347550';
    // let iv = '偏移量要个后台一致';
    
    key = CryptoJS.enc.Utf8.parse(key);
    // iv = CryptoJS.enc.Utf8.parse(iv);
    
    let srcs = CryptoJS.enc.Utf8.parse(word);
    // 加密模式为ECB，补码方式为PKCS5Padding（也就是PKCS7）
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
            // iv: iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
    });

    //返回base64
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

}


export function Decrypt(word) {

    let key = '8051d3f3db347550';
    // let iv = '偏移量要个后台一致';

    key = CryptoJS.enc.Utf8.parse(key);
    // iv = CryptoJS.enc.Utf8.parse(iv);

    let base64 = CryptoJS.enc.Base64.parse(word);
    
    let src = CryptoJS.enc.Base64.stringify(base64);

    // 解密模式为ECB，补码方式为PKCS5Padding（也就是PKCS7）
    let decrypt = CryptoJS.AES.decrypt(src, key, {
            // iv: iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
    });

    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();

}

