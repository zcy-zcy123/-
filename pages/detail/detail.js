// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    html: '',
    show: false,
    value: 1,
    flag: false,
    number: 0,
    active: -1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    // 718339
    app.http.detail(options.id).then(res => {
      // console.log(res);
      this.setData({
        list: res.data.data,
        html: res.data.data.content.replace(/\<img/g, '<img style="width:100%;height:auto;display:block"')
      })
    })
  },
  // 跳转购物车
  shopCar() {
    wx.switchTab({
      url: '/pages/shopCar/shopCar',
    })
  },
  // 点击弹出框
  add(e) {
    // console.log(e);
    if (e.currentTarget.dataset.index == 0) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
    this.setData({
      show: true
    })
  },
  // 弹出框隐藏
  onClose() {
    this.setData({
      show: false
    })
  },
  // 步进器监听+ -
  onChange(e) {
    // console.log(e);
    this.setData({
      value: e.detail
    })
  },
  // 切换规格
  activeSelect(e) {
    this.setData({
      active: e.target.dataset.index
    })
  },
  // 加入购物车
  addCar(e) {
    // console.log(e);
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请先登录',
      })
      return
    }
    app.http.add(wx.getStorageSync('token'), e.target.dataset.item.id, this.data.value).then(res => {
      // console.log(res);
      if (res.data.code == 0) {
        wx.showToast({
          title: '加入成功',
          icon: "none"
        })
        this.setData({
          show: false,
          number: res.data.data.number
        })
      } else {
        wx.showToast({
          title: '失败!!!!!!!',
          icon: "none"
        })
      }
    })
  },
  // 立即购买
  toMoney(e) {
    // console.log(e);
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: `/pages/order/order?id=${e.target.dataset.item.id}`,
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
      return
    }
    app.http.carList(wx.getStorageSync('token')).then(res => {
      // console.log(res);
      if (res.data.code == 0) {
        this.setData({
          number: res.data.data.number
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