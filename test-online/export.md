##### export 和 export default 区别

> 总结：
> 1、单个 js 文件
> **export** 可以导出多个变量和函数。
> **export default** 只能导出一个,一个文件内不能有多个 export default。
> 2、import 导入时
> **export** 方式导出，在 import 导入时要加{ }
> **export default** 则不需要，并可以起任意名称

###### export / import 示例

```
// a.js 单个导出
export const str = "export的内容";
export const year = 2019;
export function message(sth) {
    return sth;
}

// a.js 批量导出
const str = "export的内容";
const year = 2019;
function message(sth) {
    return sth;
}
export {str,year,message}

// 2、export输出的变量就是本来的名字，但是可以使用as关键字重命名。
//a.js
 var str = "export的内容";
 var year =2019;
 function message(sth) {
  return sth;
}
export {
    str as newname1,
    year as newname2,
    message as newname3
};

// 3、import
import { str,year, message } from './a';
import { str as newname1, year as newname2, message as newname3 } from './a';
```
###### export default / improt 示例
```
export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。一个文件内不能有多个export default。

//a.js
const str = "export default的内容";
export default str
在另一个文件中的导入方式： 
//b.js 
import StrFile from 'a'; 
//导入的时候没有花括号
//本质上，a.js文件的export default输出一个叫做default的变量，然后系统允许你引入的时候为它取任意名字。

```
