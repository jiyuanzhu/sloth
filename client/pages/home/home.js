//home.js
var qcloud=require('../../vendor/wafer2-client-sdk/index')
var config=require('../../config')
var util=require('../../utils/util.js')

Page({
    data:{
        swiperItems:[
            {
                "src":"../../images/swipers/sw1.jpg",
                "swiperId":"1"
            },
            {
                "src":"../../images/swipers/sw2.jpg",
                "swiperId":"2"
            },
            {
                "src":"../../images/swipers/sw3.jpg",
                "swiperId":"3"
            },
            {
                "src":"../../images/swipers/sw4.jpg",
                "swiperId":"4"
            },
        ],
        modules:[
            {
                "name":"代买早餐",
                "src":"../../images/modules/1.jpg"
            },
            {
                "name":"代拿快递",
                "src":"../../images/modules/2.jpg"
            },
            {
                "name":"跑腿",
                "src":"../../images/modules/3.jpg"
            },
            {
                "name":"替身",
                "src": "../../images/modules/4.jpg"
            },
            {
                "name":"传单兼职",
                "src":"../../images/modules/5.jpg"
            },
            {
                "name":"校园大使",
                "src":"../../images/modules/6.jpg"
            }
        ]
    }
})