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
    userId:0,
    food_order_id:0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modules: [{
        "name": "代买早餐",
        "src": "../../images/1.png",
      "url": "../takeBreakfastOrder/takeBreakfastOrder"
      },
      {
        "name": "代拿快递",
        "src": "../../images/2.png",
        "url": "../takePackageOrder/takePackageOrder"
      },
      {
        "name": "跑腿",
        "src": "../../images/3.png",
        "url": "../takeLegsworkOrder/takeLegsworkOrder"
      },
      {
        "name": "代课",
        "src": "../../images/4.png",
        "url": "../takeSubstituteClassOrder/takeSubstituteClassOrder"
      },
      {
        "name": "兼职",
        "src": "../../images/5.png",
        "url": "../pt_info/pt_info"
      },
      {
        "name": "其他下单",
        "src": "../../images/6.png",
        "url": "../otherOrder/otherOrder"
      }
    ],
    order1: [],
    order2: [],
    order3: [],
    order4: []
  },
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bcacf2773057966af1d630b/recommand',
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        that.setData({
          order1: res.data.data1,
          order2: res.data.data2,
          order3: res.data.data3,
          order4: res.data.data4

        });
        // console.log(res.data)
      }
    }),
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          // console.log("读入userinfo")
          // console.log(res)
          that.setData({
            userId: res.data.openId
          })
        },
      });
  },
  submit_take: function (e) {
    var that = this;
    wx.showModal({
      title: '确认订单',
      content: '点击确定接受订单',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定')
          console.log(e.currentTarget.dataset.index);
          var item = that.data.order.splice(e.currentTarget.dataset.index, 1);
          var data = that.data.order;
          console.log("item")
          console.log(item)
          that.setData({
            order: data
          }),
            wx.request({
              url: config.service.take_orderUrl + "?food_order_id=" + item[0].food_order_id + "&user_id=" + that.data.userId,
              method: "GET",
              header: {
                "content-type": "application/json"
              },
              success: function (res) {
                console.log(item[0].food_order_id)
                wx.navigateTo({
                  url: "../order_info/order_info?food_oder_id=" + item[0].food_order_id
                })
              }
            })

        } else { //这里是点击了取消以后
          console.log('用户点击取消')

        }
      }
    })
  }
})