var app = getApp();
var config = require('../../config');

Page({
  data: {
    tabList: ['进行中', '已完成'],
    current: 0,//当前选中的Tab项

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
    },{
      key:13,
      value:"全部"
    }],
    sortingList: [{
      key: 1,
      value: "智能排序"
    }, {
      key: 2,
      value: "价格最低"
    }, {
      key: 3,
      value: "价格最高"
    }, {
      key: 4,
      value: "销量最高"
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

  /**
   * Tab的点击切换事件
   */
  tabItemClick: function (e) {
    this.setData({
      current: e.currentTarget.dataset.pos
    })
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: config.service.take_order_homeUrl,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        that.setData({
          order: res.data.data.data
          // order: res.data.data
        });
      }
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
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
  choiceItem: function (e) {
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
  hideAllChioce: function () {
    this.setData({
     
      chioceDistrict: false,
      chioceSorting: false,
      chioceFilter: false,
    });
  },
  //区域位置
  getDistrictList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl,
      data: {
        message: "20005",
        location_id: that.data.locationID,
        token: md5.hex_md5(app.globalData.token),
        device_source: app.globalData.deviceSource
      },
      success: function (resRequest) {
        if (resRequest.data.error_code == 0) {
          that.setData({
            districtList: resRequest.data.district_list
          })
        }
      }
    })
  },


  districtSorting: function (e) {
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
  selectSorting: function (e) {
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
  check_order: function(e){
    var that = this;
    var item = that.data.order.splice(e.currentTarget.dataset.index,1);
    var data = that.data.order;
    that.setData({
      order: data
    });
    wx.navigateTo({
      url:"../order_info/order_info?food_oder_id="+item[0].food_oder_id
    })
  }

})
