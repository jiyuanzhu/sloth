const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var order_info = JSON.parse(ctx.request.query.order_info)
  var open_id = ctx.request.query.user_id

  var sex_arr = ['男', '女']
  var order_type_arr = ['校内跑腿', '代购']
  var good_type_arr = ['文件', '钥匙', '充电宝', '手机', '鲜花', '其他',]

  var legswork_type = order_type_arr[order_info.order_type]
  var complete_time = order_info.complete_time
  var good_type = good_type_arr[order_info.good_type]
  var start_point = order_info.start_point
  var destination = order_info.destination

  var profit = order_info.profit
  var other_require = order_info.other_require

  var contact_name = order_info.contact_name
  var contact_tel = order_info.contact_tel
  var contact_wechat = order_info.contact_wechat

  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  if (hour < 10)
    hour = '0' + hour
  var minute = date.getMinutes()
  if (minute < 10)
    minute = '0' + minute
  var order_time = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute

  var order_type = 3
  var order = {
    open_id: open_id,
    order_type: order_type,
    order_time: order_time,
    order_state: -1
  }
  var res = await mysql("orderList").insert(order)
  var res1 = await mysql("orderList").select("order_id").where({ order_time, open_id, order_type })
  var order_id = res1[res1.length - 1].order_id
  var legsworkOrder = {
    order_id: order_id,
    open_id: open_id,
    legswork_type: legswork_type,
    complete_time: complete_time,
    good_type: good_type,
    start_point: start_point,
    destination: destination,
    profit: profit,
    other_require: other_require,
    contact_name: contact_name,
    contact_tel: contact_tel,
    contact_wechat: contact_wechat,
    order_state: -1,
    order_time: order_time
  }
  var res2 = await mysql("legsworkOrder").insert(legsworkOrder)
  ctx.state.data = res2
}