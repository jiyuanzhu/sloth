// pages/order_confirm/order_confirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer:[],
    shop:{},
    selected:0,
    orders:[],
    cost:0,
    cartArr:[],
    userId:0,
    ShowAddrList:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 试着用easy-mock测试
  var that=this;
  wx.request({
    url: "https://www.easy-mock.com/mock/5bd41561d55d2a78f7e22ddf/example/upload_address",
    method: "POST",
    header:{
      "content-type":"application/x-www-form-urlencoded"
    },
    success: function(res){
      that.setData({
        customer:res.data.customer
      });
    }
  });
  // 从缓存中得到订单信息
  wx.getStorage({
    key: 'shop',
    success: function(res) {
      that.setData({
        shop:res.data
      })
    },
  });
  wx.getStorage({
    key: 'list',
    success: function(res) {
      that.setData({
        orders:res.data
      })
    },
  });
  wx.getStorage({
    key: 'cost',
    success: function(res) {
      that.setData({
        cost:res.data
      })
    },
  }); 
  },

  settleOrder:function(e){
    console.log("提交订单，向服务器上传订单")
    var that = this;
    wx.request({
      url: '服务器地址',
      method:"POST",
      header:{
        "content-type":"application/x-www-form-urlencoded"
      },
      data:{
        customer: that.data.customer,
        orders: that.data.orders,
        cost: that.data.cost
      }
    })
    wx.showToast({  
      title: '成功',  
      icon: 'success',  
      duration: 2000  
    })  
    setTimeout(function (e) {
      wx.navigateTo({
        url: '../order_list/order_list'
     })
     }, 2000)
  },
  ShowAddrList: function (e) {
    this.setData({
      ShowAddrList: !this.data.ShowAddrList
    });
  },
  
  HideAddrList: function (e) {
    this.setData({
      ShowAddrList: false
    });
  },

  radioChange: function(e){
    this.setData({
      ShowAddrList: false
    });
  },

  addrchange: function(e){
    this.setData({
      ShowAddrList: false,
      selected:e.currentTarget.dataset.id
    });
  },

  addrModify: function(e){
    wx.navigateTo({
      url: '../address_modify/address_modify'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})