import { ArticleModel } from "../../models/article.js";
const articleModel = new ArticleModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    loading: false,
    page: 1,
    total: null,
    opertype: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const opertype = options.opertype;
    const data = await articleModel.getMyData(opertype, 1);
    this.setData({
      articles: data.data,
      total: data.total,
      opertype: opertype
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
  async onReachBottom() {
    if (this._isLocked()) {
      return;
    }
    if (this._hasMore()) {
      this._locked();
      const article = await articleModel.getMyData(
        this.data.opertype,
        this.data.page
      );
      const tempArray = this.data.articles.concat(article.data);
      this.setData({
        articles: tempArray,
        loading: false,
        page: this.data.page + 1
      });
    }
  },
  artDetail(event) {
    const artid = event.detail.artid;
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/article-detail/article-detail?artid=${artid}`
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  _hasMore() {
    if (this.data.articles.length >= this.data.total) {
      return false;
    } else {
      return true;
    }
  },
  _isLocked() {
    return this.data.loading ? true : false;
  },
  _locked() {
    this.setData({
      loading: true
    });
  },
  _unLocked() {
    this.setData({
      loading: false
    });
  }
});
