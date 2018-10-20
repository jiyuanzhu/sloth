Page({
  data: {
    modules: []
  },
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: "https://www.easy-mock.com/mock/5bbeefa27b8b103aa6c7dd32/example/canteen",
      method: "GET",
      header:{
        "content-type":"application/json"
      },
      success: function(res){
        that.setData({
          modules:res.data.modules
        });
        console.log(res.data)
      }
    })
  },
})