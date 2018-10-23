// pages/breakfastMenu/breakfastMemu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: [],
    menu: [],
    selected: 0,
    cost: 0,
    total_item_numb: 0,
    pullBar: false,
    cart: {
      count: 1,
      total: 10,
      list: {}
    },
    showCartDetail: false
  }, 

  // 自定义的函数
  // 增加商品数量
  addToTrolley: function (e) {
    var info = this.data.menu;
    info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    this.setData({
      cost: parseFloat((this.data.cost + this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price).toFixed(2)),
      menu: info,
    })
    // 添加缓存，给购物车的信息,这里是简化的逻辑
    var that = this;
    var list_item = {};
    list_item["shop"] = that.data.shop;
    var temlist = [info[that.data.selected].menuContent[e.currentTarget.dataset.index]];
    for (var i = 0; i < temlist.length; i++) {
      temlist[i].checked = true;
    }
    list_item["food_list"] = temlist;
    // 获得缓存中已添加的购物车商品信息
    var list = wx.getStorageSync("list") || [];
    list.push(list_item);
    wx.setStorage({
      key: "list",
      data: list,
      success: function (res) {
        console.log("list setStorage success");
      }
    });
    // 设置cost
    wx.setStorage({
      key: "cost",
      data: that.data.cost,
      success: function (res) {
        console.log("cost setStorage success");
      }
    })
  },
  // 减少商品数量
  removeFromTrolley: function (e) {
    var info = this.data.menu;
    if (info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb != 0) {
      info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb--;
      this.setData({
        cost: parseFloat((this.data.cost - this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price).toFixed(2)),
        menu: info,
      });

      console.log(this.data.menu);
    }
  },
  turnMenu: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 试着用easy-mock测试
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/5bcacf2773057966af1d630b/dsaf",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          menu: res.data.menu,
          shop: res.data.shop
        });
        // console.log(res.data)
      }
    })
  },




  addCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    this.data.cart.list[id] = num + 1;
    this.countCart();
  },
  reduceCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    if (num <= 1) {
      delete this.data.cart.list[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },

  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },
  tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.id);
  },
  tapAddCart: function (e) {
    this.addCart(e.target.dataset.id);
  },
  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  submit: function (e) {
    server.sendTemplate(e.detail.formId, null, function (res) {
      if (res.data.errorcode == 0) {
        wx.showModal({
          showCancel: false,
          title: '恭喜',
          content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack();
            }
          }
        })
      }
    }, function (res) {
      console.log(res)
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