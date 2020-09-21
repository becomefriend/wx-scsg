  // pages/movie-shousuo/movie-shousuo.js
//引入接口
let app = getApp();
//引入封装的接口工具类
let utils = require("../movie/public/public.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchsuju:[]
  },
  //输入事件
  inputneirong(e){
//获取输入内容
    let url = app.globalData.url;
    let search = app.globalData.search;
    let val=e.detail.value;
    utils.request(url+search+"?q="+val+"", this.getsousuo);
  },
  getsousuo(res){
    //判断搜索框数据进行加载
   console.log(res);
   //存放数据到本地
   this.setData({
     searchsuju:res.subjects
   })

  },
  //搜索跳转详情页  
  tomovie1(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../movie1/movie1?id=" + id + "",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

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