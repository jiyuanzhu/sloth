//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modules: [{
        "name": "代买早餐",
        "src": "../../images/1.png",
        "url": "../productList/productList"
      },
      {
        "name": "代拿快递",
        "src": "../../images/2.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "跑腿",
        "src": "../../images/3.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "代课",
        "src": "../../images/4.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "兼职",
        "src": "../../images/5.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "其他下单",
        "src": "../../images/6.png",
        "url": "../canteen_select/canteen_select"
      }
    ],
    order: []
  },
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: config.service.take_order_homeUrl,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        that.setData({
          order: res.data.data.data
        });
        console.log(res.data)
      }
    })
  },
  submit_take: function(e) {
    var that = this;
    wx.showModal({
      title: '确认订单',
      content: '点击确定接受订单',
      success: function(res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定')
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }

    })
  }
})