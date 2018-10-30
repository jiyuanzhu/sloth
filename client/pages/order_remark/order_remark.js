Page({
    data:{
        height: 20,
        focus: false,
    },    
     formSubmit: function(e) {
       wx.navigateTo({
         url: '../order_confirm/order_confirm',
       });
       console.log(e);
     }
})