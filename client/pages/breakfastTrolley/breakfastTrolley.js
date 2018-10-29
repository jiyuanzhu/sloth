// pages/breakfastTrolley/breakfastTrolley.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    cost:0,
    sel_all:true
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 载入缓存
    wx.getStorage({
      key:"list",
      success:function(res){
        that.setData({
          list:res.data
        })
      }
    });
    wx.getStorage({
      key:"cost",
      success:function(res){
        that.setData({
          cost:res.data
        })
      }
    });
  },
  settleOrder:function(e){
    wx.navigateTo({
      url: '../order_confirm/order_confirm',
    });
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