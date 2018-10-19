Page({
  data:{
      cartArr:[],
      userId:0
  },
  onLoad:function(options){
    console.log(options.userId);
    var that = this;
    that.userId = options.userId;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bbeefa27b8b103aa6c7dd32/example/address',
      header:{
        "content-type": "application/x-www-form-urlencoded"
      },
      method:"POST",
      data: {
        userId:options.userId
      },
      success:function(res){
        that.setData({
          cartArr:res.data.address_list
        })
      }
    })
  }
    
})