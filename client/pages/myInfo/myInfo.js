Page({
  data: {
    height: 20,
    focus: false,
    user_id: 0,
    user_wechat: [],
    user_name: [],
    user_phone: [],
  },
  onLoad: function (options) {
    console.log("The cust_id is: ", options.cust_id);
    var that = this;
    var flag = false;
    flag = options.flag;
    that.user_id = options.user_id;
    that.setData({
      user_id: options.user_id,
      user_name: options.user_name,
      user_phone: options.user_phone,
      user_wechat: options.user_wechat,
    })
  },

  formSubmit: function (e) {
    var warn = "";
    var that = this;
    var flag = false

    if (e.detail.value.namearea == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.phonearea == "") {
      warn = "请填写您的手机号！";
    } else if (e.detail.value.addressarea == "") {
      warn = "请输入您的微信号！";
    } else {
      flag = true

      wx.request({
        // 请后台修改下面config.service.changeAddressUrl这个位置变为changeUserInfoUrl
        url: config.service.changeAddressUrl + "?user_id=" + this.data.user_id + "&prename=" + this.data.user_name + "&prephone=" + this.data.user_phone + "&prewechat=" + this.data.user_wechat + "&name=" + e.detail.value.namearea + "&phone=" + e.detail.value.phonearea + "&wechat=" + e.detail.value.wechatarea,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        /*
                data: {
                    user_name: e.detail.value.namearea,
                    user_phone: e.detail.value.phonearea,
                    user_wechat: e.detail.value.wechatarea
                },*/
        success(res) {
          console.log("debug")
          console.log(res)
          wx.showToast({
            title: '修改地址成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function (e) {
            wx.navigateTo({
              url: '../order_confirm/order_confirm'
            })
          }, 2000)
        }
      })
    }

    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  },

})