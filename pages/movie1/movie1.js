// pages/movie1/movie1.js
//引入接口
let app = getApp();
//引入封装的接口工具类
let utils = require("../movie/public/public.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",//影片名称
    img: "",//影片图片
    juqing: [],//影片种类
    local: [],//影片地区
    year: "",//影片年份
    fengshu: "",//影片评分
    jianjie: "",//影片简介
    actor: "",//影片演员
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //使用接口
    let url = app.globalData.url;
    let subject = app.globalData.subject;
    let id = options.id;
    //假装在加载给接口数据以缓冲时间
    wx.showLoading({
      title: '加载中...',
    })
    //用url + subject + id来获取哪一个详情页
    utils.request(url + subject + id, this.getmovie1);
    //获取接收过来的id
    console.log(options.id)

  },
  getmovie1(res) {
    console.log(res);
    let That = this;
    That.setData({
      title: res.title,//影片名称
      img: res.images.large,//影片图片
      juqing: res.genres,//影片种类
      local: res.countries,//影片地区
      year: res.year,//影片年份
      fengshu: res.rating,//影片评分
      jianjie: res.summary,//影片简介
      actor: res.casts,//影片演员
      item: res

    })
    //动态改变标题
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
    //关闭等待
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
  },
  gologin:function(){
   wx.navigateTo({
     url: '../index/index',
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})