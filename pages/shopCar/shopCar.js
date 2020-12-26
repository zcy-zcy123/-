// pages/shopCar/shopCar.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    show: true,
  },
  // 删除
  remove(e) {
    // console.log(e);
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请先登录',
      })
      return
    }
    app.http.removeCar(wx.getStorageSync('token'), e.target.dataset.key).then(res => {
      // console.log(res);
      this.setData({
        list: res.data.data,
      })
      if (res.data.code == 700) {
        this.setData({
          list: [],
          show: true
        })
      }
    })
  },
  // 加 减
  change(e) {
    // console.log(e);
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请先登录',
      })
      return
    }
    app.http.carChange(wx.getStorageSync('token'), e.target.dataset.key, e.detail).then(res => {
      // console.log(res);
      this.setData({
        list: res.data.data,
      })
    })
  },
  // 订单
  toMoney() {
    wx.navigateTo({
      url: '/pages/order/order',
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
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请先登录',
      })
      return
    }
    app.http.carList(wx.getStorageSync('token')).then(res => {
      // console.log(res);
      if (res.data.code == 700) {
        this.setData({
          show: true
        })
      } else {
        this.setData({
          show: false,
          list: res.data.data,
        })
      }
    })
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