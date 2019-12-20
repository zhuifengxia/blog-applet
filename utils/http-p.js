import { config } from "../api-config.js";

class HTTP {
  request({ url, data = {}, method = "GET" }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    });
  }
  _request(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json"
      },
      success: res => {
        const code = res.statusCode.toString();
        if (code.startsWith("2")) {
          resolve(res.data);
        } else {
          reject();
          this._show_error();
        }
      },
      fail: err => {
        reject();
        this._show_error();
      }
    });
  }

  _show_error() {
    wx.showToast({
      title: "抱歉出现了一个错误",
      icon: "none",
      duration: 2000
    });
  }
}

export { HTTP };
