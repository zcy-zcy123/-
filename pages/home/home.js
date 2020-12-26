// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    value: '',
    nav: [],
    miao: [],
    tui: [],
    pin: [],
    shop: [],
    top: [],
    isPage: false,
    page: 1,
    pageSize: 20,
    loading: false,
    noMore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 滚动
    app.http.srcoll({
      pageSize: 5
    }).then(res => {
      // console.log(res);
      this.setData({
        top: res.data.data.dataList
      })
    })
    // 轮播
    app.http.banner().then(res => {
      // console.log(res);
      this.setData({
        banner: res.data.data
      })
    })
    // 九宫格
    app.http.nav().then(res => {
      // console.log(res);
      this.setData({
        nav: res.data.data
      })
    })
    // 秒杀
    app.http.goods({
      miaosha: true
    }).then(res => {
      // console.log(res);
      this.setData({
        miao: res.data.data
      })
    })
    // 推荐
    app.http.goods({
      recommendStatus: 1
    }).then(res => {
      // console.log(res);
      this.setData({
        tui: res.data.data
      })
    })
    // 拼团
    app.http.goods({
      pingtuan: true
    }).then(res => {
      // console.log(res);
      this.setData({
        pin: res.data.data
      })
    })
    this.getData(false)
  },
  // 加载
  getData(isPage) {
    app.http.goods({
      page: this.data.page,
      pageSize: this.data.pageSize
    }).then((res) => {
      // console.log(res);
      this.setData({
        loading: false
      })
      if (isPage) {
        this.setData({
          shop: this.data.shop.concat(res.data.data)
        })
      } else {
        this.setData({
          shop: res.data.data
        })
      }
      if (res.data.data === undefined) {
        this.setData({
          noMore: true
        })
      }
    })
  },
  scrollToLower: function (e) {
    if (!this.data.loading && !this.data.noMore) {
      this.setData({
        loading: true,
        page: this.data.page + 1
      })
      this.getData(true);
    }
  },
  // 商品分类
  classify(e) {
    // console.log(e);
    wx.reLaunch({
      url: `/pages/classify/classify?id=${e.target.dataset.id}`,
    })
  },
  // 详情
  detail(e) {
    // console.log(e);
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 消息
  news(e) {
    // console.log(e);
    wx.navigateTo({
      url: `/pages/news/news?id=${e.target.dataset.id}`,
    })
  },
  // 搜索
  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 优惠券
  you() {
    wx.navigateTo({
      url: '/pages/Coupon/Coupon',
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