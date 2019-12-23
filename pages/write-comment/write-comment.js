import { ArticleModel } from "../../models/article.js";
const articleModel = new ArticleModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    artid: null,
    arttitle: null,
    writemsg: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //更新数据
    this.setData({
      artid: options.artid,
      arttitle: options.title
    });
  },
  //获取用户输入内容
  contentInput: function(e) {
    this.setData({
      writemsg: e.detail.value
    });
  },
  //提交评论
  async submitcomment(event) {
    if (this.data.writemsg == "") {
      wx.showToast({
        title: "请输入评论内容",
        icon: "none",
        duration: 2000
      });
    } else {
      const comment = await articleModel.artComment(
        this.data.artid,
        this.data.writemsg
      );
      if (comment.status == 0) {
        wx.showToast({
          title: "留言审核中",
          duration: 2000
        });
        wx.navigateTo({
          url: "/pages/article-detail/article-detail/?artid=" + this.data.artid
        });
      } else {
        wx.showToast({
          title: "评论失败",
          icon: "none",
          duration: 2000
        });
      }
    }
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
