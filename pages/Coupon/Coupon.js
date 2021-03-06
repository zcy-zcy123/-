// pages/Coupon/Coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [{
      title: '可领劵'
    }, {
      title: '已领劵'
    }, {
      title: '已失效'
    }],
    active: 0,
    list: [],
    show: true,
  },
  // 切换
  navs(e) {
    // console.log(e);
    this.setData({
      active: e.target.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.list == '') {
      this.setData({
        show: true
      })
    } else {
      this.setData({
        show: false
      })
    }
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