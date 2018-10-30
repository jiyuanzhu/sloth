Page({
  data: {
    height: 20,
    focus: false,
    cartArr: [],
    cust_id: 0,
    cust_addr: [],
    cust_name: [],
    cust_phone: [],
  },
  onLoad: function (options) {
    console.log("The userId is: ", options.cust_id);
    var that = this;
    var flag = false;
    flag = options.flag;
    that.cust_id = options.cust_id;
    that.setData({
      cust_id: options.cust_id,
      cust_addr: options.cust_addr,
      cust_name: options.cust_name,
      cust_phone: options.cust_phone,
    })
  },

  formSubmit: function (e) {
    var warn = "";
    var that = this;
    var flag = false

    if (e.detail.value.namearea == "") {
      warn = "请填写您的姓名！";
    }
    else if (e.detail.value.phonearea == "") {
      warn = "请填写您的手机号！";
    }
    else if (e.detail.value.addressarea == "") {
      warn = "请输入您的地址！";
    }
    else {
      flag = true
      //提交给mock
      wx.request({
        url: 'https://www.easy-mock.com/mock/5bd1b21a5e38a677f659a8b9/example/newAddress',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
            cust_name: e.detail.value.namearea,
            cust_phone: e.detail.value.phonearea,
            cust_addr: e.detail.value.addressarea
        },
        success(res) {
          console.log(res.data)
        }
      })

      wx.redirectTo({
        url: '../order_confirm/order_confirm'
      })
    }

    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  }
})