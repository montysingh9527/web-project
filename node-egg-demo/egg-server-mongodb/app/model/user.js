/*
 * @Description: 用户
 * @Date: 2024-01-07 00:45:22
 * @FilePath: \web-project\node-egg-demo\egg-server-mongodb\app\model\users.js
 */
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema(
    {
      // 用户名
      username: { type: String },
      // 昵称
      nickname: { type: String },
      // 密码
      password: { type: String },
      // 是否管理员  0超级管理员  1管理员  2用户
      isAdmin: { type: Number, default: 1},
      // 手机号
      phone: { type: String },
      // 邮箱
      email: { type: String },
      // 性别
      gender: {
        type: String,
        default: "男", //默认值
        enum: ["男", "女", "保密"],
      },
      // 头像
      avatar: {
        type: String,
        default: "/public/imgs/user.jpg",
      },
    },
    {
      timestamps: true, // 管理时间
      versionKey: false, // 去除版本_v
      toJSON: {
        transform: function (doc, ret) {
          // 将 _id 转换为 id
          ret.id = ret._id;
          delete ret._id;
        },
      },
    }
  );
  return mongoose.model("User", UserSchema);
};
