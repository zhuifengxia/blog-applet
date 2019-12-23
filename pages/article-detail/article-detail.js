import { ArticleModel } from "../../models/article.js";
import { UserModel } from "../../models/user.js";
import { promisic } from "../../miniprogram_npm/lin-ui/utils/util.js";
const articleModel = new ArticleModel();
const userModel = new UserModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    artDetail: null,
    comments: [],
    loading: false,
    page: 1,
    total: null,
    authorized: false,
    userid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const artid = options.artid;
    const article = await articleModel.getArtDetail(artid);
    article.data.article_msg = article.data.article_msg.replace(
      /<img/gi,
      '<img style="max-width:100%;height:auto;float:left;display:block" '
    );
    const comments = await articleModel.getComments(artid, 1);
    this.setData({
      artDetail: article.data,
      total: article.data.comment_num,
      comments: comments.data
    });
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
        authorized: true
      });
    }
  },
  async getUserInfo(event) {
    this.userAuthorized();
    const opertype = event.target.dataset.opertype;
    const like = await userModel.artLike(this.data.artDetail.id, opertype);
    const data = this.data.artDetail;
    if (opertype == 1) {
      data.is_collect = like.is_like;
    } else {
      data.like_num = like.num;
      data.is_like = like.is_like;
    }

    this.setData({
      artDetail: data
    });
  },
  artcomment(event) {
    const artid = this.data.artDetail.id;
    const title = this.data.artDetail.article_title;
    wx.navigateTo({
      url: `/pages/write-comment/write-comment?artid=${artid}&title=${title}`
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
      const comments = await articleModel.getComments(
        artid,
        this.data.page + 1
      );
      const tempArray = this.data.comments.concat(comments.data);
      this.setData({
        comments: tempArray,
        loading: false,
        page: this.data.page + 1
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  _hasMore() {
    if (this.data.comments.length >= this.data.total) {
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
