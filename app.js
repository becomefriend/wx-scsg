App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  //用全局变量控制音乐播放状态,达到监听哪个音乐界面在播放
  data: {
    isplayer: false,
    pagesindex: null
  },
  onLaunch: function() {
    var logs = wx.getStorageSync('logs') || []

    logs.unshift(Date.now())

    wx.setStorageSync('logs', logs)

  },
  getUserInfo: function(cb) {

    var that = this

    if (this.globalData.userInfo) {

      typeof cb == "function" && cb(this.globalData.userInfo)

    } else {

      //调用登录接口

      wx.login({

        success: function() {

          wx.getUserInfo({

            success: function(res) {

              that.globalData.userInfo = res.userInfo

              typeof cb == "function" && cb(that.globalData.userInfo)

            }

          })

        }

      })

    }

  },


  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },
  // 公共接口进行数据封装，方便拿到
  globalData: {
    userInfo: null,
    url: "http://t.yushu.im",
    coming: "/v2/movie/coming_soon", //最新上映
    reimen: "/v2/movie/in_theaters", //热门
    paihang: "/v2/movie/top250", //排行
    subject: "/v2/movie/subject/", //详情
    search: "/v2/movie/search" //搜索


  }
})