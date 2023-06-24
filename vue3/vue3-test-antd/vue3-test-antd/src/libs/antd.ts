// 引入样式
// import "ant-design-vue/dist/antd.less";
// import { Button, message, Modal } from "ant-design-vue";

// const components = [Button, message, Modal];
// export default {
//   install(app) {
//     app.config.globalProperties.$message = message;
//     app.config.globalProperties.$confirm = Modal.confirm;
//     components.forEach((comp) => {
//       app.use(comp);
//     });
//   },
// };


import {
  Modal,
  Table,
  Menu,
  Input,
  Form,
  Card,
  Checkbox,
  Radio,
  Col,
  Row,
  Select,
  DatePicker,
  Button,
  message
} from 'ant-design-vue';

const components = [Modal,
  Table,
  Menu,
  Input,
  Form,
  Card,
  Checkbox,
  Radio,
  Col,
  Row,
  Select,
  DatePicker,
  Button];
// import { AButton } from '@/components/basic/button/index';

// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.variable.min.css';
// import 'dayjs/locale/zh-cn';

export function setupAntd(app:any) {
  // app.component('AButton', AButton);
    app.config.globalProperties.$message = message;
    app.config.globalProperties.$confirm = Modal.confirm;
    components.forEach((comp) => {
      app.use(comp);
    });
  // app
  //   .use(Form)
  //   .use(Input)
  //   .use(Modal)
  //   .use(Table)
  //   .use(Menu)
  //   .use(Card)
  //   .use(Checkbox)
  //   .use(Radio)
  //   .use(Col)
  //   .use(Row)
  //   .use(Select)
  //   .use(DatePicker)
  //   .use(Button);
}