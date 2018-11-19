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
    var that = this;
    console.log(e)
    wx.request({
      url: config.service.addAddressUrl + "?cust_name=" + e.detail.value.namearea + "&cust_phone=" + e.detail.value.phonearea + "&cust_addr=" + e.detail.value.addressarea +"&user_id="+this.data.userId,
      method: "GET",
      header: {
        "content-type": "application/x-wwww-form-urlencoded"
      },
      success: function (res) {
        console.log("用户id：")
        // 因为路由部分修改成navigatorBack，为了地址页面实时更新，用getCurrentPages实现
        var address = {
          cust_id: that.data.userId,
          cust_name: e.detail.value.namearea,
          cust_phone: e.detail.value.phonearea,
          cust_addr: e.detail.value.addressarea,
          default_id:0,
          addr_id:0//稍后修改
        };
        var pages = getCurrentPages();
        var prevPage = pages[pages.length-2];
        address.addr_id = prevPage.data.customer.length;
        var customer = prevPage.data.customer;
        customer.push(address);
        prevPage.setData({
          customer:customer
        });
        wx.showToast({
          title: '新增地址成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function (e) {
          // 成功后返回上一页
          wx.navigateBack({
            delta:1
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