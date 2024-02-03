/*
 * @Description: 
 * @Date: 2024-01-06 22:05:53
 * @FilePath: \web-project\node-egg-demo\egg-server-mongodb\app\controller\home.js
 */
const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg 版本 ' + new Date().toLocaleString();
  }
}

module.exports = HomeController;
