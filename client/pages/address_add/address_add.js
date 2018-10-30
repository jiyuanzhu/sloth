var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    height: 20,
    focus: false,
  },
  formSubmit: function (e) {
    console.log(e)
    wx.request({
      url: config.service.addAddressUrl + "?cust_name=" + e.detail.value.namearea + "&cust_phone=" + e.detail.value.phonearea + "&cust_addr=" + e.detail.value.addressarea,
      method: "GET",
      header: {
        "content-type": "application/x-wwww-form-urlencoded"
      },
      success: function (res) {
        wx.showToast({
          title: '新增地址',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function (e) {
          wx.navigateTo({
            url: '../order_confirm/order_confirm'
          })
        }, 2000)
      }

      /*data:{
        cust_name:e.detail.value.namearea,
        cust_phone:e.detail.value.phonearea,
        cust_addr:e.detail.value.addressarea
      }*/
    })
  }
})