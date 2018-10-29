Page({
  data: {
    height: 20,
    focus: false,
  },
  formSubmit: function (e) {
    console.log(e)
    wx.request({
      url: '服务器地址',
      header: {
        "content-type": "application/x-wwww-form-urlencoded"
      },
      method: "POST",
      data: {
        cust_name: e.detail.value.namearea,
        cust_phone: e.detail.value.phonearea,
        cust_addr: e.detail.value.addressarea
      }
    })
  }
})