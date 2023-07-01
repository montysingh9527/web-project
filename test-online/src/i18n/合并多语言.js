/**
 * 多语言json合并
 * {
 *  "route.tion":{
 *      "key": "route.tion",
 *      "zh" : "文档",
 *      "en" : "documt"
 *  },
 *  "route.routers.0": {
 *      "key": "route.routers.0",
 *      "zh": "首页",
 *      "en": "home"
 *  }
 * }
 */

let fileObj = {
  zh: require("./zh/index.json"),
  en: require("./en/index.json"),
};
// console.log(fileObj);
function deepObj(filesObj) {
    let assObj = []
  for (let key in filesObj) {
    const objes = deepCloneObj(key, fileObj[key]);
    // Object.assign(assObj, objes)
    assObj.push({...objes})
  }
  let oleobj = {...assObj[1],...assObj[0]}
//   assObj.forEach(item=>{
//     oleobj = {...item}
//   })
  console.log("====",oleobj)
}
// deepObj(fileObj);

function deepCloneObj(lug, fileObj) {
  let result = {};
  for (let key in fileObj) {
    // 用 . 连接
    // let prefix = `${title ? title + "." : ""}` + `${key}`;
    // 判断是否是对象
    if (typeof fileObj[key] == "object") {
        // console.log("--fileObj[key]---", fileObj[key])
        // result[fileObj[key]] = {
        //     "key": fileObj[key],
        //     [lug]: fileObj[key],
        //     [lug]: fileObj[key],
        // }
      // 合并对象   prefix连接的键
    //   Object.assign(tempObj, deepObj(listobj[key], prefix));
    } else {
    //   tempObj[prefix] = listobj[key];
        result[key] = {
            "key": key,
            [lug]: fileObj[key],
        }
        // console.log(key,'-----', fileObj[key])
    }
  }
  console.log(result)
  return result;
//   console.log("===", key, fileObj);
}



// =====================================================================================


let filearr = [ "zh",require("./zh/index.json"),]

function deepObjs (zh, value, filobj){
  
}




