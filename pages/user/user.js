// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    user: [],
  },
  // 点击登录
  processLogin(e) {
    // console.log(e.detail.userInfo)
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '已取消',
        icon: "none"
      })
      return
    }
    // 如果有userinfo ,就调用register注册方法
    this.register(this)
  },
  // 注册
  register(page) {
    let _this = this;
    wx.login({
      success: (res) => {
        // console.log(res);
        let code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: (res) => {
            // console.log(res);
            let iv = res.iv;
            let encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            app.http.register({
              code: code,
              encryptedData: encryptedData,
              iv: iv
            }).then((res) => {
              // console.log(res)
              _this.login(page);
            })
          }
        })
      }
    })
  },
  // 登录
  login(page) {
    const _this = this
    wx.login({
      success: function (res) {
        // console.log(res);
        app.http.login(res.code).then((res) => {
          // console.log(res);
          if (res.data.code == 10000) {
            // 去注册
            _this.register(page)
            return;
          }
          if (res.data.code != 0) {
            // 登录错误
            wx.showModal({
              title: '无法登录',
              content: res.data.msg,
              showCancel: false
            })
            return;
          }
          wx.setStorageSync('token', res.data.data.token)
          wx.setStorageSync('uid', res.data.data.uid)
          if (page) {
            page.onShow()
          }
        })
      }
    })
  },
  // 获取用户信息
  getUserApiInfo() {
    var that = this;
    app.http.Info(wx.getStorageSync('token')).then(res => {
      // console.log(res);
      if (res.data.code == 0) {
        that.setData({
          user: res.data.data.base,
          show: true,
        })
      }
    })
  },
  // 退出登录
  loginOut() {
    wx.removeStorageSync('token')
    wx.removeStorageSync('uid')
    wx.reLaunch({
      url: '/pages/user/user',
    })
    this.setData({
      show: false
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
    this.getUserApiInfo()
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