/*
 * @Description: 
 * @Date: 2023-12-27 14:28:53
 * @FilePath: \web-project\node-egg-demo\egg-server-mysql\app\controller\home.js
 */
const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'egg当前版本' + new Date().toLocaleString();
  }
}

module.exports = HomeController;
