// pages/address-list/address-list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 添加地址
  add_address() {
    wx.navigateTo({
      url: '/pages/add-address/add-address',
    })
  },
  // 删除地址
  remove(e) {
    // console.log(e);
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请先登录',
      })
      return
    }
    app.http.remove_address({
      token: wx.getStorageSync('token'),
      id: e.target.dataset.id
    }).then(res => {
      // console.log(res);
      this.onShow()
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
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请先登录',
      })
      wx.navigateBack({
        delta: 1,
      })
      return
    }
    app.http.address_list(wx.getStorageSync('token')).then(res => {
      // console.log(res);
      if (res.data.data == undefined) {
        this.setData({
          list: []
        })
        return
      }
      this.setData({
        list: res.data.data
      })
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