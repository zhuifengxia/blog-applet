import { HTTP } from "../utils/http-p.js";
class ArticleModel extends HTTP {
  //获取banner数据
  getBanners() {
    return this.request({
      url: "banner"
    });
  }

  //获取微语数据
  getWhisper() {
    return this.request({
      url: "whisper"
    });
  }
  //获取文章列表数据
  getArtList(typeid, page) {
    return this.request({
      url: "articles",
      data: {
        typeid: typeid,
        page: page
      }
    });
  }

  //获取文章详情
  getArtDetail(artid) {
    return this.request({
      url: `article/detail/${artid}`,
      data: {
        sign: wx.getStorageSync("sign")
      }
    });
  }

  //文章评论信息
  getComments(artid, page) {
    return this.request({
      url: `article/comments/${artid}`,
      data: {
        page: page
      }
    });
  }
  //评论文章
  artComment(artid, content) {
    return this.request({
      url: "submitComment",
      data: {
        artid: artid,
        content: content,
        sign: wx.getStorageSync("sign")
      },
      method: "POST"
    });
  }

  //获取文章分类
  getType() {
    return this.request({
      url: "types"
    });
  }

  //获取我的信息
  getMyData(opertype, page) {
    return this.request({
      url: `mydata/${opertype}`,
      data: {
        page: page,
        sign: wx.getStorageSync("sign")
      }
    });
  }
}

export { ArticleModel };
