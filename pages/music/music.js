// pages/music/music.js
//index.js
//获取应用实例
import audioList from './data.js'

Page({
  data: {
    audioList: audioList,
    audioIndex: 0,
    // 判断暂停
    pauseStatus: true,
    // 表单覆盖
    listShow: true,
    timer: '',
    //时间展示开头
    currentPosition: 0,
    //时间展示结尾
    duration: 0,
  },
  onLoad: function () {
    console.log('onLoad')
    console.log(this.data.audioList.length)
    //  获取本地存储存储audioIndex
    var audioIndexStorage = wx.getStorageSync('audioIndex')
    console.log(audioIndexStorage)
     //  将本地存储存储audioIndex覆盖，可呈现上次播放的样式
    if (audioIndexStorage) {
      this.setData({ audioIndex: audioIndexStorage })
    }
  },
  onReady: function (e) {
    console.log('onReady')
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('audio')
  },
  bindSliderchange: function (e) {
  
    let value = e.detail.value
    let that = this
    console.log(e.detail.value)
    //播放事件
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        let { status, duration } = res
        if (status === 1 || status === 0) {
          that.setData({
            sliderValue: value
          })
          //控制音乐播放进度
          wx.seekBackgroundAudio({
            position: value * duration / 100,
          })
        }
      }
    })
  },
  //按钮播放返回上一级事件
  bindTapPrev: function () {
    console.log('bindTapprev')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev === 0) {
      // 如果是第一首歌，返回最后一首歌
      audioIndexNow = length - 1
    } else {
      //否者返回上一首
      audioIndexNow = audioIndexPrev - 1
     
    }
    this.setData({
      audioIndex: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    //每秒对播放时间判断
    setTimeout(() => {

      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    // 对数据进行缓存
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  //按钮播放到下一首事件
  bindTapNext: function () {
    console.log('bindTapNext')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev === length - 1) {
      // 如果是最后一首歌，进行重置
      audioIndexNow = 0
    } else {
      //当前表单加一
      audioIndexNow = audioIndexPrev + 1
    }
    this.setData({
      audioIndex: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    setTimeout(() => {
      // 对播放按钮的判断
      if (that.data.pauseStatus ===false) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  // 播放按钮事件
  bindTapPlay: function () {
    console.log('bindTapPlay')
    console.log(this.data.pauseStatus)
    if (this.data.pauseStatus === true) {
      this.play()
      this.setData({ pauseStatus: false })
    } else {
      //暂停播放
      wx.pauseBackgroundAudio()
      this.setData({ pauseStatus: true })
    }
  },
  // 对隐藏表单处理
  bindTapList: function (e) {
    console.log('bindTapList')
    console.log(e)
    this.setData({
      listShow: true
    })
  },
  //表单选择项处理
  bindTapChoose: function (e) {
    console.log('bindTapChoose')
    console.log(e)
    this.setData({
      audioIndex: parseInt(e.currentTarget.id, 10),
      listShow: false
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    // 将表单项选择进行缓存
    wx.setStorageSync('audioIndex', parseInt(e.currentTarget.id, 10))
  },
  // 对歌曲进行播放
  play() {
    let { audioList, audioIndex } = this.data
    wx.playBackgroundAudio({
      dataUrl: audioList[audioIndex].src,
      title: audioList[audioIndex].name,
      coverImgUrl: audioList[audioIndex].poster
    })
    let that = this
    let timer = setInterval(function () {
      that.setDuration(that)
    }, 1000)
    this.setData({ timer: timer })
  },
  //对后台播放事件的判断
  setDuration(that) {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        let { status, duration, currentPosition } = res
        if (status === 1 || status === 0) {
          that.setData({
            currentPosition: that.stotime(currentPosition),
            duration: that.stotime(duration),
            sliderValue: Math.floor(currentPosition * 100 / duration),
          })
        }
      }
    })
  },
  //计时器事件
  stotime: function (s) {
    let t = '';
    if (s > -1) {
      // let hour = Math.floor(s / 3600);
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      // if (hour < 10) {
      //   t = '0' + hour + ":";
      // } else {
      //   t = hour + ":";
      // }

      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;
    }
    return t;
  },
  // onShareAppMessage: function () {
  //   let that = this
  //   return {
  //     title: 'light轻音乐：' + that.data.audioList[that.data.audioIndex].name,
  //     success: function (res) {
  //       wx.showToast({
  //         title: '分享成功',
  //         icon: 'success',
  //         duration: 2000
  //       })
  //     },
  //     fail: function (res) {
  //       wx.showToast({
  //         title: '分享失败',
  //         icon: 'cancel',
  //         duration: 2000
  //       })
  //     }
  //   }
  // }
})
