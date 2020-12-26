module.exports = (url, method, data) => {
  let p = new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: Object.assign({}, data),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
  return p;
}