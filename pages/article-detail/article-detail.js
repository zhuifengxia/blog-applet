import { ArticleModel } from "../../models/article.js";
const articleModel = new ArticleModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    artDetail: null,
    comments: [],
    loading: false,
    page: 1,
    total: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const artid = options.artid;
    const article = await articleModel.getArtDetail(artid);
    article.data.article_msg = article.data.article_msg.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ');
    const comments = await articleModel.getComments(artid, this.data.page)
    this.setData({
      artDetail: article.data,
      total: article.data.comment_num,
      comments: comments.data
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
});
