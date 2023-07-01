"use strict";

const { Controller } = require("egg");
const { result } = require("../configs/license_data");
class HomeController extends Controller {
  async test() {
    const { ctx } = this;
    console.log(data);
    ctx.body = {
      error_code: 0,
      reason: "ok",
      result,
    };
  }
}

module.exports = HomeController;
