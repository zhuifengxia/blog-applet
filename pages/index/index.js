import { ArticleModel } from "../../models/article.js";
const articleModel = new ArticleModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    whispers: [],
    articles: [],
    loading: false,
    page: 1,
    total: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const banner = await articleModel.getBanners();
    const whisper = await articleModel.getWhisper();
    const article = await articleModel.getArtList(0, 1);
    this.setData({
      banners: banner.data,
      whispers: whisper.data,
      articles: article.data,
      total: article.total
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    if (this._isLocked()) {
      return;
    }
    if (this._hasMore()) {
      this._locked();
      const article = await articleModel.getArtList(0, this.data.page + 1);
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
