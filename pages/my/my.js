import { promisic } from "../../miniprogram_npm/lin-ui/utils/util.js";
import { UserModel } from "../../models/user.js";
const userModel = new UserModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userid: null,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const res = await promisic(wx.getSetting)();
    if (res.authSetting["scope.userInfo"]) {
      const userinfo = await promisic(wx.getUserInfo)();
      this.setData({
        authorized: true,
        userInfo: userinfo.userInfo
      });
    }
  },

  async onGetUserInfo(event) {
    this.userAuthorized();
  },
  async userAuthorized() {
    if (!this.data.authorized) {
      const login = await promisic(wx.login)();
      const userinfo = await promisic(wx.getUserInfo)();
      const user = await userModel.userLogin(
        login.code,
        userinfo.encryptedData,
        userinfo.iv
      );
      userModel.setStorageSync("sign", user.data.token);
      this.setData({
        userid: user.data.userInfo.id,
        userInfo: userinfo.userInfo,
        authorized: true
      });
    }
  },
  myData(event) {
    //我的收藏/点赞/留言
    wx.navigateTo({
      url: "/pages/my-data/my-data?opertype=" + event.target.dataset.opertype
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
