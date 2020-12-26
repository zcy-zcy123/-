// pages/classify/classify.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [],
    active: 0,
    value: '',
    list: [],
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let id = null
    if (options.id == undefined) {
      id = '191372'
    } else {
      id = options.id
    }
    app.http.classify().then(res => {
      // console.log(res);
      this.setData({
        nav: res.data.data
      })
    })
    app.http.goods({
      categoryId: id,
      page: 1,
      pageSize: 100000
    }).then(res => {
      // console.log(res);
      if (res.data.data == undefined) {
        this.setData({
          show: true,
          list: [],
        })
      } else {
        this.setData({
          show: false,
          list: [],
        })
      }
      this.setData({
        list: res.data.data
      })
      wx.setStorageSync('id', '')
    })
  },
  // 点击切换分类
  activeSelect(e) {
    // console.log(e);
    this.setData({
      active: e.target.dataset.index
    })
    app.http.goods({
      categoryId: e.target.dataset.id,
      page: 1,
      pageSize: 100000
    }).then(res => {
      // console.log(res);
      if (res.data.data == undefined) {
        this.setData({
          show: true,
          list: [],
        })
      } else {
        this.setData({
          show: false,
          list: [],
        })
      }
      this.setData({
        list: res.data.data
      })
    })
  },
  // 详情
  detail(e) {
    // console.log(e);
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
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
  // 搜索
  search() {
    wx.navigateTo({
      url: '/pages/search/search',
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