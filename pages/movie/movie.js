// pages/movie/movie.js
//获取app。js里面的数据
let app = getApp();
//获取封装的方法
let http = require("public/public.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //因为循环只能循环数组，所以将首页请求的三条数据分别放在三个数据中
    list: {
      //格式化数据，便于区分
      reimen: {},
      coming: {},
      paihang: {}
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //去详情页
  tomovie1(id){
    //跳转页获取id页面传值
   let Id=id.currentTarget.dataset.id;
    wx.navigateTo({
      //将id传给详情页
    url: "../movie1/movie1?id="+Id+"",
  })
  },
  //进入更多
  tomore(t){
    //跳转更多页得到标题
    let title=t.currentTarget.dataset.title;
    console.log(title);
    wx.navigateTo({
      //将标题传给更多页
      url: "../movie-more/movie-more?title="+title+""
    })
  },
  
  onLoad: function(options) {

    //获取接口主链接
    let url = app.globalData.url;
    let coming = app.globalData.coming;
    let reimen = app.globalData.reimen;
    let paihang = app.globalData.paihang;
    //检验是否成功拿到数据
    // wx.request({
    //   url: url+coming,
    //   success(res){
    //     console.log(res)
    //   }
    // })
    // 使用封装的wx.requesttitle方法拼接URL达到获取的效果，同时给title赋值达到区分这三条数据的效果
    // http.request(url+coming,this.getHttp)
    http.requesttitle(url + reimen+"?start=0&count=10", 'reimen', "影院热映", this.getHttp);
    http.requesttitle(url + coming + "?start=0&count=10", 'coming', "最新上映", this.getHttp);
    http.requesttitle(url + paihang + "?start=0&count=5", 'paihang', "排行榜", this.getHttp);

  },
  //getHttp是成功后执行回调函数,就是将拿到的数据展示出来。
  getHttp(res, key, title) {
   //给list索引，这一步只是给list中的value赋了一个值，并没有将所有的值赋给list，vxml中是无法拿到数据进行循环的
   this.data.list[key]={
     title:title,
     shuju:res  
   }
   //给list传值,便于在wxml中循环
   this.setData({
     list:this.data.list
   })
   console.log(this.data.list)
  },
  tomovieshousuo(){
    wx.navigateTo({
      url: '../movie-shousuo/movie-shousuo'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})