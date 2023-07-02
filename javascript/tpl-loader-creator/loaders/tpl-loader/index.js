const { tplReplace } = require("../utils");
// const { getOptions } = require("loader-utils");  // webpack5 已经去除了getOptions
function tplLoader(source) {
  // 去除空格和换行   <div><h1>{{name}}</h1><p>{{age}}</p><p>{{career}}</p><p>{{hobby}}</p></div>
  source = source.replace(/\s+/g, "");

  console.log("---this----", this);
  //   const {log} = getOptions(this);

  console.log("---source---", source);

  // tplReplace.toString() 将方法转为字符串
  return `
        export default (options)=>{
            ${tplReplace.toString()}  
            return tplReplace('${source}', options);
        }
    `;
}

module.exports = tplLoader;

// function tpl (options){
//     function tplReplace(template, replaceObject){
//         return template.replace(/\{\{(.*?)\}\}/g, (node,key)=>{
//             return replaceObject[key]
//         })
//     }
//     return tplReplace(`${source}`, options)
// }
