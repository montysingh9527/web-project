"use strict";

const { Controller } = require("egg");
const { daydata, monthdata, yeardata } = require("../configs/calendar");
class HomeController extends Controller {
  // 当前数据
  async day() {
    const { ctx } = this;
    ctx.body = {
      error_code: 0,
      reason: "Success",
      result: daydata,
    };
  }
  // 当月数据
  async month() {
    const { ctx } = this;
    ctx.body = {
      error_code: 0,
      reason: "Success",
      result: monthdata,
    };
  }
  // 当年数据
  async year() {
    const { ctx } = this;
    ctx.body = {
      error_code: 0,
      reason: "Success",
      result: yeardata,
    };
  }
}

module.exports = HomeController;
