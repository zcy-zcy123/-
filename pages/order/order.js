// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    address: [],
    show: false,
    flag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请先登录',
      })
      wx.navigateBack({
        delta: 1,
      })
      return
    }

    if (options.id == undefined) {
      app.http.carList(wx.getStorageSync('token')).then(res => {
        // console.log(res);
        this.setData({
          shopList: res.data.data,
          show: false,
        })
      })
    } else {
      app.http.detail(options.id).then(res => {
        // console.log(res);
        this.setData({
          shopList: res.data.data.basicInfo,
          show: true
        })
      })
    }
  },
  // 添加地址
  add_address() {
    wx.navigateTo({
      url: '/pages/add-address/add-address',
    })
  },
  // 地址列表
  address_list() {
    wx.navigateTo({
      url: '/pages/address-list/address-list',
    })
  },
  // 提交订单
  goMoney() {
    // console.log(this.data.address);
    if (this.data.address instanceof Array) {
      wx.showToast({
        title: '请选择地址',
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '当前无法支付！！！',
      cancelColor: 'cancelColor',
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
    // 地址
    app.http.address(wx.getStorageSync('token')).then(res => {
      // console.log(res);
      if (res.data.code == 700) {
        this.setData({
          flag: true,
          address: []
        })
      } else {
        this.setData({
          flag: false,
          address: res.data.data.info
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