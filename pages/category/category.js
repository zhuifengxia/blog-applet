import { ArticleModel } from "../../models/article.js";
const articleModel = new ArticleModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    types: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const type = await articleModel.getType();
    this.setData({
      types: type.data
    });
  },
  onType(event) {
    const typeid = event.detail.typeid;
    wx.navigateTo({
      url: `/pages/type-article/type-article?typeid=${typeid}`
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
