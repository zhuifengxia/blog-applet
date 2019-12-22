import { HTTP } from "../utils/http-p.js";
class UserModel extends HTTP {
    //获取用户信息
    getUserInfo() {
        return this.request({
            url: "user/account",
            data: {
                typeid: typeid,
                page: page
            }
        });
    }

    userLogin() {
        return this.request({
            url: "user/account",
            data: {
                typeid: typeid,
                page: page
            }
        });
    }
}