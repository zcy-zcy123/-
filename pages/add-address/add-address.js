const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: [], //弹出框值
    list: [], //地址id
    show: false, //弹出框
    show1: false, //城市按钮
    show2: false, //区县按钮
    value: '', //省份
    value1: '', //城市
    value2: '', //区县
    active: 1, //下标
    name: '', //姓名
    mobile: '', //电话
    Address: '', //详细地址
    id: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 省份
    var that = this
    wx.request({
      url: 'https://api.it120.cc/common/region/v2/province',
      method: 'get',
      success(res) {
        // console.log(res);
        that.setData({
          columns: [],
          list: res.data.data
        })
        res.data.data.forEach(element => {
          that.data.columns.push(element.name)
        });
        that.setData({
          columns: that.data.columns
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  // 弹出框显示
  address() {
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
  // 确认
  onConfirm(e) {
    // console.log(e);
    const {
      value,
      index
    } = e.detail;
    if (this.data.active == 1) {
      this.data.id.push(this.data.list[index].id)
      this.setData({
        value: value,
        show: false,
        show1: true,
        active: 2,
        id: this.data.id
      })
    } else if (this.data.active == 2) {
      this.data.id.push(this.data.list[index].id)
      this.setData({
        value1: value,
        show: false,
        show1: true,
        show2: true,
        active: 3,
        id: this.data.id
      })
    } else if (this.data.active == 3) {
      this.data.id.push(this.data.list[index].id)
      this.setData({
        value2: value,
        show: false,
        show1: true,
        show2: true,
        active: 4,
        id: this.data.id
      })
      return
    } else {
      return
    }
    // 城市
    var that = this
    wx.request({
      url: 'https://api.it120.cc/common/region/v2/child',
      method: 'get',
      data: {
        pid: that.data.list[index].id
      },
      success(res) {
        // console.log(res);
        that.setData({
          columns: [],
          list: res.data.data
        })
        res.data.data.forEach(element => {
          that.data.columns.push(element.name)
        });
        that.setData({
          columns: that.data.columns
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  // 取消
  onCancel() {
    this.setData({
      show: false
    })
  },
  Name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  address_(e) {
    this.setData({
      Address: e.detail.value
    })
  },
  Mobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 保存
  Add_address() {
    if (this.data.value == '' || this.data.value1 == '' || this.data.value2 == '' || this.data.name == '' || this.data.mobile == '' || this.data.Address == '') {
      wx.showToast({
        title: '请输入内容',
      })
      return
    }
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请先登录',
      })
      return
    }
    // console.log(this.data.id);
    app.http.add_address({
      token: wx.getStorageSync('token'),
      linkMan: this.data.name,
      address: this.data.Address,
      mobile: this.data.mobile,
      code: 322000,
      isDefault: true,
      provinceId: this.data.id[0],
      cityId: this.data.id[1],
      districtId: this.data.id[2],
    }).then(res => {
      // console.log(res);
      if (res.data.code == 0) {
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  // 获取微信地址
  wx_address() {
    wx.showToast({
      title: '地址获取失败',
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