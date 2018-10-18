// pages/breakfastMenu/breakfastMemu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:[],
    menu:[],
    selected:0,
    howMuch:12,//没明白这个参数
    cost:0,
    pullBar:false
  },

  // 自定义的函数
  // 增加商品数量
  addToTrolley: function(e){
    var info = this.data.menu;
    info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    this.setData({
      cost: parseFloat((this.data.cost+this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price).toFixed(2)),
      menu: info,
    })
  },
  // 减少商品数量
  removeFromTrolley: function(e){
    var info = this.data.menu;
    if(info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb!=0){
      info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb--;
      this.setData({
        cost: parseFloat((this.data.cost-this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price).toFixed(2)),
        menu: info,
      });
      
    console.log(this.data.menu);
    }
  },

  turnMenu: function(e){
    this.setData({
      selected: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 试着用easy-mock测试
    var that=this;
    wx.request({
      url: "https://www.easy-mock.com/mock/5bbeefa27b8b103aa6c7dd32/example/nmb",
      method: "POST",
      header:{
        "content-type":"application/x-www-form-urlencoded"
      },
      success: function(res){
        that.setData({
          menu:res.data.menu,
          shop:res.data.shop
        });
        console.log(res.data)
      }
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