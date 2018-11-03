//home.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    swiperItems: [{
        "src": "../../images/swipers/sw1.jpg",
        "swiperId": "1"
      },
      {
        "src": "../../images/swipers/sw2.jpg",
        "swiperId": "2"
      },
      {
        "src": "../../images/swipers/sw3.jpg",
        "swiperId": "3"
      },
      {
        "src": "../../images/swipers/sw4.jpg",
        "swiperId": "4"
      },
    ],
    modules: [{
        "name": "代买早餐",
        "src": "../../images/modules/1.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "代拿快递",
        "src": "../../images/modules/2.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "跑腿",
        "src": "../../images/modules/3.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "代课",
        "src": "../../images/modules/4.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "兼职",
        "src": "../../images/modules/5.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "其他下单",
        "src": "../../images/modules/6.png",
        "url": "../canteen_select/canteen_select"
      }
    ]
  }
})