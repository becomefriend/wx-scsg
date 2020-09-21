var newdata3 = require("../newsdata/newsdata.js")

// pages/new1/new1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circular: true, //无缝衔接
    indicatorDots: true, //小圆点
    autoPlay: true, //自动播放
    interval: 3000, //时间
    usedata: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //将数据逻辑层数据发送给视图层this.setData重绘view,this.data获取数组对象，方便循环遍历
    this.setData({
      usedata: newdata3.newsdata2
    })
  },
  // 跳转到详情页,节省代码，因为最多跳转5个页面，所以这里所有数据跳同一个详情页通过newsID来创建数据

  gonew2: function(event) {
    console.log(event);
    //获取点击跳转的下标，循环的下标
    let index=event.currentTarget.dataset.index;
    //获取点击跳转的下标，newsid的下标
    let newsid = event.currentTarget.dataset.newsid;
    wx.navigateTo({
    //  //通过newsid传到详情页
    //   url: 'new2/new2?newsid=' + newsid,
      //通过index传到详情页
      url: 'new2/new2?index=' + index,
      
    })

  },
  //currentTarget是指当前元素Target是触发对象的元素
  //轮播跳转详情页
  lunbotonew2(event){
   console.log(event)
    let index = event.target.dataset.index;
    wx.navigateTo({
      //  //通过newsid传到详情页
      //   url: 'new2/new2?newsid=' + newsid,
      //通过index传到详情页
      url: 'new2/new2?index=' + index,

    })
  } ,
  
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