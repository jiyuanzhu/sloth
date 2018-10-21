Page({
  data: {
    modules: []
  },
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: "https://www.easy-mock.com/mock/5bcacf2773057966af1d630b/shopMenu",
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