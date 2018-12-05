const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    logged: false,
    userinfo: [],
    typeID: 0,
    isLoading: true,
    loadOver: false,
    order: [],
    districtList: [{
      key: 1,
      value: "校内跑腿"
    }, {
      key: 2,
      value: "代购"
    }, {
      key: 3,
      value: "全部"
    }, ],
    sortingList: [{
      key: 1,
      value: "文件"
    }, {
      key: 2,
      value: "钥匙"
    }, {
      key: 3,
      value: "充电宝"
    }, {
      key: 4,
      value: "手机"
    }, {
      key: 5,
      value: "鲜花"
    }, {
      key: 6,
      value: "其他"
    }, {
      key: 7,
      value: "全部"
    }, ],
    chioceDistrict: false,
    chioceSorting: false,
    activeDistrictIndex: -1,
    activeDistrictName: "跑腿类型",
    scrollTop: 0,
    scrollIntoView: 0,
    activeSortingIndex: -1,
    activeSortingName: "物品类型",
    district_all: false,
    sorting_all: false
  },
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        // console.log("读入userinfo")
        // console.log(res)
        that.setData({
          logged: false,
          userinfo: res.data,
          userId: res.data.openId
        })
      },
      fail: function(res) {
        console.log("还没有登录")
      }
    });
    wx.request({
      url: config.service.take_order_home_legsworkUrl,
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
  onPullDownRefresh: function() {
    this.setData({
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
    wx.stopPullDownRefresh()
  },
  onReachBottom: function() {
    if (!this.data.loadOver) {
      this.setData({
        pageIndex: this.data.pageIndex + 1,
        isLoading: true,
        loadOver: false
      })
      //this.getProductList();
    }
  },
  //条件选择
  choiceItem: function(e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.chioceDistrict) {
          this.setData({
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        } else {
          this.setData({

            chioceDistrict: true,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        break;
      case "2":
        if (this.data.chioceSorting) {
          this.setData({

            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        } else {
          this.setData({

            chioceDistrict: false,
            chioceSorting: true,
            chioceFilter: false,
          });
        }
        break;
    }
  },
  hideAllChioce: function() {
    this.setData({

      chioceDistrict: false,
      chioceSorting: false,
      chioceFilter: false,
    });
  },
  //区域位置
  getDistrictList: function() {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl,
      data: {
        message: "20005",
        location_id: that.data.locationID,
        token: md5.hex_md5(app.globalData.token),
        device_source: app.globalData.deviceSource
      },
      success: function(resRequest) {
        if (resRequest.data.error_code == 0) {
          that.setData({
            districtList: resRequest.data.district_list
          })
        }
      }
    })
  },


  districtSorting: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({

      chioceDistrict: false,
      activeDistrictIndex: index,
      activeDistrictName: this.data.districtList[index].value,
      district_all: (this.data.districtList[index].value != '全部'),
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  },
  //综合排序
  selectSorting: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      chioceSorting: false,
      activeSortingIndex: index,
      activeSortingName: this.data.sortingList[index].value,
      sorting_all: (this.data.sortingList[index].value != '全部'),
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    console.log(this.data.sorting_all);
    console.log(this.data.activeSortingName);
    console.log(this.data.activeSortingName != '全部');
    console.log(this.data.order);
    console.log(this.data.activeSortingName);
    console.log()
    //this.getProductList();
  },
  submit_take: function (e) {
    var that = this;
    wx.showModal({
      title: '确认订单',
      content: '点击确定接受订单',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          // console.log('用户点击确定')
          // console.log(e.currentTarget.dataset.index)
          var item = that.data.order.splice(e.currentTarget.dataset.index, 1);
          var data = that.data.order;
          // console.log("item")
          // console.log(item)
          that.setData({
            order: data
          }),
            wx.request({
              url: config.service.take_orderUrl + "?order_id=" + item[0].order_id + "&user_id=" + that.data.userId + "&order_type=4",
              method: "GET",
              header: {
                "content-type": "application/json"
              },
              success: function (res) {
                wx.navigateTo({
                  url: "../InfoSubstitute/InfoSubstitute?order_id=" + item[0].order_id
                })
              }
            })

        } else { //这里是点击了取消以后
          console.log('用户点击取消')

        }
      }
    })
  },
  bindGetUserInfo: function () {
    if (this.data.logged) return
    util.showBusy('正在登录')

    const session = qcloud.Session.get()

    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          this.setData({ userInfo: res, logged: true })
          util.showSuccess('登录成功')
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          this.setData({ userInfo: res, logged: true })
          util.showSuccess('登录成功')
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
  }
})