// pages/movie-more/movie-more.js
//引入接口
let app = getApp();
//引入封装的接口工具类
let utils = require("../movie/public/public.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
   allMore:[],
  //  每次加载20条
   beginjiazai:0,
   endjiazai:20,
   urlhttp:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //更多页获取title
    let  title=options.title;
    let url = app.globalData.url;
    let coming = app.globalData.coming;
    let reimen = app.globalData.reimen;
    let paihang = app.globalData.paihang; 
    let urlhttp='';
     console.log(title);
     switch(title){
       case "影院热映": urlhttp = url + coming; break;
       case "最新上映": urlhttp = url + reimen;break;
       case "排行榜": urlhttp = url + paihang;break;
     
     }
     this.setData({
       urlhttp:urlhttp
     })
    utils.request(urlhttp,this.getMore);
    //动态设置title
    wx.setNavigationBarTitle({
      title: title
    })
},
getMore(res){
  //让数据每次加20条
  let getmore=[];
  //对刚开始的数据进行判断
  if (this.data.beginjiazai>0){
    getmore = this.data.allMore.concat(res.subjects);
  }
  else{
    getmore = res.subjects;
  }
  this.data.beginjiazai += this.data.endjiazai;
  this.setData({
    allMore:getmore
  })
  console.log(res)
},
  findmore(){
   //完成数据拼接
   let url=this.data.urlhttp+"?start="+this.data.beginjiazai+"&count="+this.data.endjiazai+""
   //再发送一次数据请求
    utils.request(url, this.getMore);
    
  },

   //更多跳转详情页  
  tomovie1(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../movie1/movie1?id=" + id + "",
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