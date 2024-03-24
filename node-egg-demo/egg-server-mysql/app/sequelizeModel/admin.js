/*
 * @Description: 后台admin管理员
 * @Date: 2023-12-28 20:19:14
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\sequelizeModel\admin.js
 */
"use strict";
module.exports = (app) => {
  const { STRING, INTEGER, ARRAY, DATE, BOOLEAN, TEXT, DataTypes } =
    app.Sequelize;
    const Admin =   app.sqlModel.define("admin", {
    id: {
      allowNull: false, //  字段是否允许为空
      autoIncrement: true, // 是否自动增长
      primaryKey: true, // 字段是否是主键
      type: INTEGER,
    },
    username: {
      allowNull: false,
      unique: true,
      type: STRING(20),
      comment: "用户名",
      validate: {
        len: [6, 30], // 验证器 字符串长度必须在 6 到 30 之间
      },
    },
    password: {
      allowNull: false,
      type: STRING,
      comment: "密码",
    },
    isSuper: {
      type: STRING,
      defaultValue: "1",
      comment: "超级管理员(1超级管理员 2普通会员)",
    },
    roleId: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      comment: "角色ID",
    },
    avatar: {
      type: STRING,
      defaultValue: "/public/image/user.png",
      comment: "头像",
    },
    email: {
      type: STRING,
      comment: "邮箱",
    },
    mobile: {
      type: STRING,
      comment: "手机号",
    },
    status: {
      type: STRING,
      defaultValue: "1",
      comment: "帐号状态（1正常 0停用）",
    },
    remark: {
      type: STRING,
      comment: "备注",
    },
    createdAt: {
      type: DATE,
      comment: "创建时间",
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: STRING,
      comment: "创建者",
    },
    updatedAt: {
      type: DATE,
      comment: "更新时间",
      defaultValue: DataTypes.NOW,
    },
    updatedBy: {
      type: STRING,
      comment: "更新者",
    },
  });

  return Admin;
};
