/*
 * @Description:
 * @Date: 2024-01-15 22:00:09
 * @FilePath: \web-project\node-egg-demo\admin-project\src\api\index.js
 */

/** 上传相关api */
import * as api_upload from "src/api/common/upload.js";

/** 登录 */
import * as api_login from "src/api/common/login.js";

/** 用户 */
import * as api_user from "src/api/common/user.js";

/** 管理员 */
import * as api_admin from "src/api/common/admin.js";

export { api_login, api_user, api_upload, api_admin };
