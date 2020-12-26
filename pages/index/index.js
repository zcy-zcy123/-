//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banner: []
  },
  onLoad: function () {
    app.http.index_banner().then(res => {
      // console.log(res);
      this.setData({
        banner: res.data.data
      })
    })
    if (wx.getStorageSync('token')) {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  },
  add() {
    wx.switchTab({
      url: '/pages/home/home',
    })
    // wx.setStorageSync('token', '00000')
  }
})