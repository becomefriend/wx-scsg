// pages/new1/new2/new2.js
//获取数据
var newsdata = require("../../newsdata/newsdata.js");
let  appdata=getApp();
console.log(appdata,typeof appdata)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xuanran: {},
    isplayer: false,
    collect: false,
    index: null,
    
    inputVal: "",//留言框内的数据
    msgData: [],//所有留言数据
    msgData1: ""

  },
  /**
   * 生命周期函数--监听页面加载
   */
  //数据渲染留言层
  changeInputValue(ev) {
    this.setData({
      inputVal: ev.detail.value
    })
  },
  //添加留言
  addMsg() {
    var list = this.data.msgData;
    list.push({
      msg: this.data.inputVal
    });
    //更新
    this.setData({
      msgData: list,
      inputVal: ""
});
    /*获取storage中的所有数据*/
    // var list1 = this.data.msgData1;
    // for (var i = 0; i < list.length; i++) {
    //   list1.push({
    //     msg: list[i].msg
    //   });
    // }
    // /*把新添加的数据添加到要存入stroage的数组中*/
    // wx.setStorage({
    //   key: 'msgData1',
    //   data: list1,
    // })
    // /**把数据存至stroage */
    // var that = this;
    // wx.getStorage({
    //   key: 'msgData1',
    //   success: function (res) {
    //     that.setData({
    //       msgData1: res.data
    //     });
    //   },
    // })
  },
  //删除留言
  DelMsg(ev) {
    console.log(ev);
    var n = ev.target.dataset.index;
    var list = this.data.msgData;
    list.splice(n, 1);
 this.setData({
      msgData: list

    });
  },
 
  onLoad: function(options) {
    //跳转后获取到数据
    //options为onLoad获取参数的方法,获取newsid的参数
    // console.log(newsdata.newsdata2[options.newsid]);
    // this.setData(newsdata.newsdata2[options.newsid])
    //options为onLoad获取参数的方法,获取index的参数
    let index = options.index;
    //更新data中的xuanran的状态
    this.setData({
      xuanran: newsdata.newsdata2[index],
      index
    })
    //this.setData直接获取对象，不需要键值对转换为数组
    //测试本地存储



    //读取和存储都是在操作整体
    //设置本地存储
    // wx.setStorageSync("key"," data");
    //获取本地存储
    //console.log(wx.getStorageSync("key"));
    //清除一个本地数据
    // wx.removeStorageSync("key");
    //清除所有本地数据
    // wx.clearStorageSync();
    // 收藏的存储数据格式
    //判断第一次进入是否存储
    // var newshouchang={
    //     0:false,
    //     1:true,
    //     2.true
    // }
    //这个函数执行最快，所以第一次进入的时候判断是否存在本地存储以及是否收藏
    //获取信息

    var shouchangshijiandeshuju = wx.getStorageSync("collect");
    // //如果存在，则代表有以前收藏过或以前被取消收藏过的数据
    if (shouchangshijiandeshuju[index]) {

      this.setData({
        collect: true
      })
    }
    if (!shouchangshijiandeshuju) {
      //缓存中初始化空对象,用于用户第一次进入
      wx.setStorageSync('collect', {})
    }
     //将app。js中的全局变量读取再赋值给当前页面
    if (appdata.data.isplayer && appdata.data.pagesindex === index) {
      //修改音乐播放的状态
      this.setData({
        isplayer: true
      })
    } else {
      this.setData({
        isplayer: false
      })
    }
    //监听音乐播放
    wx.onBackgroundAudioPlay(()=>{
     console.log("音乐播放");
     //修改播放isplayer的状态
     this.setData({
       isplayer:true
     })
     //修改appdata中的有关音乐播放数据
      appdata.data.isplayer=true;
      appdata.data.pagesindex=index;
    });
   
    
    //监听音乐暂停
 wx.onBackgroundAudioPause(() => {
   console.log("音乐暂停");
   this.setData({
     isplayer: false
   })
   //修改appdata中的有关音乐播放数据
   appdata.data.isplayer = false;
   //可以省略
    appdata.data.pagesindex = index;
    });
  },
  shouchangshijian: function(event) {
    // //获取所有的id
    var collect = !this.data.collect;

    // //更新到视图层
    this.setData({
      collect

    });
    let title = collect ? '收藏成功' : '取消收藏';
    wx.showToast({
      title,
      icon: 'success',
      duration: 1000,
      mask: true,

    });
    //缓存数据到本地
    let {
      index
    } = this.data;
    wx.getStorage({
      key: 'collect',
      success: function(res) {
        //获取缓存数据
        console.log(res, '点击获取数据');
        let obj = res.data;
        obj[index] = collect;
        wx.setStorage({
          key: 'collect',
          data: obj,
          success: () => {
            console.log('缓存成功');
          }
        })

      },
    })
  },
  fengxiangshijian: function(event) {
    // wx.showModal({
    //   title: '提示',
    //   content: '确认分享',
    // })
    wx.showActionSheet({
      itemList: ['转发到朋友圈', '转发到qq', '转发到微博'],
    })
  },
  playmusic() {
    let isplayer = !this.data.isplayer
    this.setData({
      isplayer
    })
    //播放音乐应该判断当前音乐是否在播放
     let dataUrl= newsdata.newsdata2[this.data.index].music.url;
     let title=newsdata.newsdata2[this.data.index].music.title;
      let  coverImgUrl=newsdata.newsdata2[this.data.index].music.img;
      if(isplayer){
        wx.playBackgroundAudio({
          // //通过newid获取音乐
          // dataUrl: newsdata.newsdata2[that.data.neweid].music.url,
          // title: newsdata.newsdata2[that.data.newsid].music.title
          //通过index获取音乐
         dataUrl,title,coverImgUrl
        })
      }else{
        wx.pauseBackgroundAudio()
      }
  
   

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