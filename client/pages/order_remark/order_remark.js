Page({
    data:{
        focus: false,
        remark_text:'',
        remarks:[
          {
            id:0,
            text:"放的时候不要敲门呦"
          },
          {
            id:1,
            text:"放的时候要敲门呦"
          },
          {
            id:2,
            text:"不要辣椒"
          },
          {
            id:3,
            text:"多放辣椒"
          }
        ]
    },    
    onLoad: function (options) {
      // 试着用easy-mock测试
      var that = this;
      // 从缓存中得到订单信息
      wx.request({
      });
  
    },

    show:function(e){
      var that = this;
      this.setData({
        remark_text:e.currentTarget.dataset.remark
      });
    },

    bindblur:function(e){
      var that = this;
      this.setData({
        remark_text:e.detail.value
      })
    },

    formSubmit: function(e) {
      var that = this;
      wx.navigateTo({
        url: "../order_confirm/order_confirm?remark="+this.data.remark_text,
      });
      console.log(e);
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