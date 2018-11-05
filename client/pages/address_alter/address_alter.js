var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    height: 20,
    focus: false,
    cust_id: 0,    
    cust_addr: [],
    cust_name: [],
    cust_phone: [],
  },
  onLoad: function (options) {
    console.log("The cust_id is: ", options.cust_id);
    var that = this;
    var flag = false;
    flag = options.flag;
    that.cust_id = options.cust_id;
    that.setData({
      cust_id: options.cust_id,
      cust_addr: options.cust_addr,
      cust_name: options.cust_name,
      cust_phone: options.cust_phone,
    })
  },

  formSubmit: function (e) {
    var warn = "";
    var that = this;
    var flag = false

    if (e.detail.value.namearea == "") {
      warn = "请填写您的姓名！";
    }
    else if (e.detail.value.phonearea == "") {
      warn = "请填写您的手机号！";
    }
    else if (e.detail.value.addressarea == "") {
      warn = "请输入您的地址！";
    }
    else {
      flag = true
      //提交给mock
      wx.request({
        url: config.service.changeAddressUrl + "?user_id=" + this.data.cust_id+"&prename=" + this.data.cust_name + "&prephone=" + this.data.cust_phone + "&preaddr=" + this.data.cust_addr + "&name=" + e.detail.value.namearea + "&phone=" + e.detail.value.phonearea + "&addr=" + e.detail.value.addressarea,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "GET",/*
        data: {
            cust_name: e.detail.value.namearea,
            cust_phone: e.detail.value.phonearea,
            cust_addr: e.detail.value.addressarea
        },*/
        success(res) {
          console.log("debug")
          console.log(res)
          wx.showToast({
            title: '修改地址成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function (e) {
            wx.navigateTo({
              url: '../order_confirm/order_confirm'
            })
          }, 2000)
        }
      })
    }

    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  }
})