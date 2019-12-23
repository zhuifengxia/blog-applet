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

  userLogin(code, encryptedData, iv) {
    return this.request({
      url: "login",
      method: "POST",
      data: {
        code: code,
        iv: iv,
        encryptedData: encryptedData
      }
    });
  }

  //用户点赞
  artLike(artid, opertype) {
    return this.request({
      url: "like",
      method: "POST",
      data: {
        artid: artid,
        sign: this.getStorageSync("sign"),
        opertype: opertype
      }
    });
  }

  setStorageSync(key, value) {
    //同步写入缓存，还有异步写入缓存
    wx.setStorageSync(key, value);
  }

  getStorageSync(key) {
    let data = wx.getStorageSync(key);
    return data;
  }
}

export { UserModel };
