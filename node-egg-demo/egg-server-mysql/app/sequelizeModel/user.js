/*
 * @Description:
 * @Date: 2023-12-28 20:19:14
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\sequelizeModel\user.js
 */
"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE, DataTypes } = app.Sequelize;

  const User = app.sqlModel.define("user", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    username: {
      allowNull: false,
      unique: true,
      type: STRING(30),
      comment: "用户名",
      validate: {
        len: [6, 30], // 验证器 字符串长度必须在 6 到 30 之间
      },
    },
    nickname: {
      type: STRING(50),
      defaultValue: null,
      comment: "昵称",
    },
    sex: {
      type: STRING,
      defaultValue: "1",
      comment: "性别（0代表女 1代表男）",
    },
    password: {
      allowNull: false,
      type: STRING,
      comment: "密码",
    },
    avatar: {
      allowNull: true,
      type: STRING,
      defaultValue: "/public/image/user.png",
      comment: "头像",
    },
    email: {
      allowNull: true,
      type: STRING,
      comment: "邮箱",
    },
    mobile: {
      allowNull: true,
      type: STRING,
      comment: "手机号",
    },
    isDelete: {
      type: STRING,
      defaultValue: "0",
      comment: "删除标志（0代表存在 1代表删除）",
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
      allowNull: true,
      type: DATE,
      comment: "创建时间",
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      allowNull: true,
      type: STRING,
      comment: "创建者",
    },
    updatedAt: {
      allowNull: true,
      type: DATE,
      comment: "更新时间",
      defaultValue: DataTypes.NOW,
    },
    updatedBy: {
      allowNull: true,
      type: STRING,
      comment: "更新者",
    },
  });

  // User.associate = function(models) {
  //   User.belongsTo(app.model.Departments, {
  //     foreignKey: 'deptId'
  //   });
  //   User.belongsToMany(app.model.Roles, { through: 'user_roles', foreignKey: 'userId', as: 'roles'});
  // };
  // User.sync({ alter: true }); // （慎用）
  return User;
};
