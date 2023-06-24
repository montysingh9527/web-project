module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String },
    nickname: { type: String },
    password: { type: String },
    phone: { type: String },
    email: { type: String },
    gender: {
      type: String,
      default: "男", //默认值
      enum: ["男", "女", "保密"],
    },
    age: {
      type: Number, // 类型
      required: true, // 校验规则 - 必须
      default: 18, // 默认值
      min: [10, "年龄不能小于10"], // 校验规则
      validate: {
        // 自定义校验方法
        validator(v) {
          return v <= 100;
        },
        message: "{VALUE} 必须小于等于100",
      },
      unique: true, // 是否是唯一的
      trim: true, // 去掉首位空格
      minlength: 3, //  最小长度
      maxlength: 18, //  最大长度
      enum: [9, 12, 15], //age的值必须要9,12,15
    },
    year: {
      // 年
      type: Number,
      default: new Date().getFullYear(),
    },
    month: {
      // 月
      type: Number,
      default: new Date().getMonth() + 1,
    },
    day: {
      // 日
      type: Number,
      default: new Date().getDate(),
    },
    add_time: {
      // 时间戳
      type: Number,
      default: +new Date(),
    },
  });

  return mongoose.model("User", UserSchema, "user");
};
