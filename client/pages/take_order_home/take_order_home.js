//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modules: [
      {
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
    order:[
      {
        "order_type":"早餐",
        "order_shop_address":"华工二饭三楼肠粉",
        "order_deli_fee":"1",
        "order_total_item": "1",
        "order_good_name": "瘦肉肠粉",
        "order_good_num": "1",
        "order_address": "C8",
        "order_deli_time": "明早7:00-8:00送达",
        "order_time": "2018.10.29",
        "order_sum": "8"
      },
      {
        "order_type": "早餐",
        "order_shop_address": "华工二饭三楼肠粉",
        "order_deli_fee": "1",
        "order_total_item": "1",
        "order_good_name": "瘦肉肠粉",
        "order_good_num": "1",
        "order_address": "C8",
        "order_deli_time": "明早7:00-8:00送达",
        "order_time": "2018.10.29",
        "order_sum": "8"
      },
      {
        "order_type": "早餐",
        "order_shop_address": "华工二饭三楼肠粉",
        "order_deli_fee": "1",
        "order_total_item": "1",
        "order_good_name": "瘦肉肠粉",
        "order_good_num": "1",
        "order_address": "C8",
        "order_deli_time": "明早7:00-8:00送达",
        "order_time": "2018.10.29",
        "order_sum": "8"
      }
    ]
  }
})
