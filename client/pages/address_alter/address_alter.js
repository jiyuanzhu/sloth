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
    addr_index:0//用于修改订单确定页面的数据
  },
  onLoad: function (options) {
    console.log("The cust_id is: ", options);
    var that = this;
    var flag = false;
    flag = options.flag;
    that.cust_id = options.cust_id;
    that.setData({
      cust_id: options.cust_id,
      cust_addr: options.cust_addr,
      cust_name: options.cust_name,
      cust_phone: options.cust_phone,
      addr_index:options.addr_index,
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
        url: config.service.changeAddressUrl + "?user_id=" + that.data.cust_id+"&prename=" + that.data.cust_name + "&prephone=" + that.data.cust_phone + "&preaddr=" + that.data.cust_addr + "&name=" + e.detail.value.namearea + "&phone=" + e.detail.value.phonearea + "&addr=" + e.detail.value.addressarea,
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
          // 因为路由部分修改成navigatorBack，为了地址页面实时更新，用getCurrentPages实现
          var pages = getCurrentPages();
          var prevPage = pages[pages.length-2];
          // console.log(prevPage);
          var customer = prevPage.data.customer;
          customer[that.data.addr_index].cust_addr = e.detail.value.addressarea;
          customer[that.data.addr_index].cust_name = e.detail.value.namearea;
          customer[that.data.addr_index].cust_phone = e.detail.value.phonearea;
          prevPage.setData({
            customer:customer
          });
          wx.showToast({
            title: '修改地址成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function (e) {
            wx.navigateBack({
              delta:1
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
  },

    delSubmit: function (e) {
    var that = this;
      wx.request({
        url: config.service.delAddressUrl + "?user_id=" + that.data.cust_id + "&prename=" + that.data.cust_name + "&prephone=" + that.data.cust_phone + "&preaddr=" + that.data.cust_addr,
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
          // 因为路由部分修改成navigatorBack，为了地址页面实时更新，用getCurrentPages实现
          var pages = getCurrentPages();
          var prevPage = pages[pages.length-2];
          // console.log(prevPage);
          var customer = prevPage.data.customer;
          customer.splice(that.data.addr_index,1);
          prevPage.setData({
            customer:customer
          });
          wx.showToast({
            title: '删除地址成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function (e) {
            console.log(getCurrentPages());
            wx.navigateBack({
              delta:1
            })
          }, 2000)
        }
      })
    }
})