var app = getApp();
var config = require('../../config');
Page({
  data: {
    typeID: 0,
    isLoading: true,
    loadOver: false,
    order: [],
    districtList: [{
      key: 1,
      value: "C1"
    }, {
      key: 2,
      value: "C2"
    }, {
      key: 3,
      value: "C3"
    }, {
      key: 4,
      value: "C4"
    }, {
      key: 5,
      value: "C5"
    }, {
      key: 6,
      value: "C6"
    }, {
      key: 7,
      value: "C7"
    }, {
      key: 8,
      value: "C8"
    }, {
      key: 9,
      value: "C9"
    }, {
      key: 10,
      value: "C10"
    }, {
      key: 11,
      value: "C11"
    }, {
      key: 12,
      value: "C12"
    }, {
      key: 13,
      value: "全部"
    }],
    sortingList: [{
      key: 1,
      value: "华工二饭三楼肠粉"
    }, {
      key: 2,
      value: "华工二饭三楼包子"
    }, {
      key: 3,
      value: "华工二饭三楼酸辣粉"
    }, {
      key: 4,
      value: "华工一饭一楼"
    }, {
      key: 5,
      value: "全部"
    }],
    chioceDistrict: false,
    chioceSorting: false,
    activeDistrictIndex: -1,
    activeDistrictName: "楼栋",
    scrollTop: 0,
    scrollIntoView: 0,
    activeSortingIndex: -1,
    activeSortingName: "购买店铺"
  },
  onLoad: function (options) {
    var that = this;
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
    wx.request({
      url: config.service.take_order_home_breakfastUrl,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
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
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
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
              url: config.service.take_orderUrl + "?order_id=" + item[0].order_id + "&user_id=" + that.data.userId + "&order_type=1",
              method: "GET",
              header: {
                "content-type": "application/json"
              },
              success: function (res) {
                console.log(res)
                wx.navigateTo({
                  url: "../order_info/order_info?food_order_id=" + item[0].order_id
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