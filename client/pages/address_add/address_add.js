var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    height: 20,
    focus: false,
    userId:0,
  },
  onLoad: function (options) {
    // 试着用easy-mock测试
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          userId: res.data.openId
        })
        console.log("设置用户id")
        console.log(res.data.openId)
      },
    });
  },
  formSubmit: function (e) {
    console.log(e)
    wx.request({
      url: config.service.addAddressUrl + "?cust_name=" + e.detail.value.namearea + "&cust_phone=" + e.detail.value.phonearea + "&cust_addr=" + e.detail.value.addressarea +"&user_id="+this.data.userId,
      method: "GET",
      header: {
        "content-type": "application/x-wwww-form-urlencoded"
      },
      success: function (res) {
        console.log("用户id：")
        wx.showToast({
          title: '新增地址成功',
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