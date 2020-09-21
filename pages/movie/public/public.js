//封装微信接口请求的方法
function request(url, callback) {
  wx.request({
    //请求数据的方法
    url: url,

    success(res) {
      //请求成功后执行的方法，直接执行res.data方便数据的拿取
      callback(res.data)
    }
  })

}
//区分导航栏名字的方法,便于循环，key是唯一标识符，用title来区分数据，只在电影首页使用
function requesttitle(url, key, title, callback) {
  wx.request({
    url: url,
    success(res) {
      callback(res.data, key, title)
    }
  })
}
//将上面的方法抛出去，使外面能够拿到
module.exports = {
  request: request,
  requesttitle: requesttitle
}