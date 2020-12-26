// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [{
        title: '综合'
      },
      {
        title: '新品'
      },
      {
        title: '销量'
      },
      {
        title: '价格'
      }
    ],
    active: 0,
    list: [],
    value: '',
    show: true
  },
  // 切换
  navs(e) {
    // console.log(e);
    this.setData({
      active: e.target.dataset.index
    })
    if (e.target.dataset.index == 0) {
      this.onShow()
    } else if (e.target.dataset.index == 1) {
      this.onShow()
    } else if (e.target.dataset.index == 2) {
      this.data.list.sort((a, b) => {
        return b.numberSells - a.numberSells
      })
      this.setData({
        list: this.data.list
      })
    } else if (e.target.dataset.index == 3) {
      this.data.list.sort((a, b) => {
        return b.minPrice - a.minPrice
      })
      this.setData({
        list: this.data.list
      })
    }
  },
  tab() {
    this.data.show = !this.data.show
    this.setData({
      show: this.data.show
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
    app.http.add(wx.getStorageSync('token'), e.target.dataset.id, 1).then(res => {
      // console.log(res);
      if (res.data.code == 0) {
        wx.showToast({
          title: '加入成功',
          icon: "none"
        })
      } else {
        wx.showToast({
          title: '失败!!!!!!!',
          icon: "none"
        })
      }
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
    app.http.goods({
      page: 1,
      pageSize: 500
    }).then(res => {
      // console.log(res);
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