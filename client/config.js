/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://m5ebb6c1.qcloud.la';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    //选择店铺地址
    canteen_selectUrl: `${host}/weapp/canteen_select`,

    //店铺详情
    breakfastMemuUrl: `${host}/weapp/breakfastMemu`,

    //添加地址
    addAddressUrl: `${host}/weapp/addAddress`,

    //获取地址
    address_selectUrl: `${host}/weapp/address_select`,

    //提交订单
    settleOrderUrl: `${host}/weapp/settleOrder`
  }
};

module.exports = config;
