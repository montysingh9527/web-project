### Egg3.0 + mongodb

###### 跨域

```
安装跨域插件： npm i egg-cors --save

在config-plugin.js配置
  cors: {
    enable: true,
    package: "egg-cors",
  },
```

##### 分页插件

```
网址: https://www.npmjs.com/package/mongoose-paginate-v2#with-custom-return-labels
npm install mongoose-paginate-v2

import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

// declare your schema
export const institutionSchema = new mongoose.Schema({ name: String });

// 注册到mongoose
institutionSchema.plugin(paginate);


// 使用
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'itemsList',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};

const options = {
  page: 1,
  limit: 10,
  customLabels: myCustomLabels,
};

Model.paginate({}, options, function (err, result) {});
```
