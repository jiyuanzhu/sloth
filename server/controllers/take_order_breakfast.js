const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var open_id = ctx.request.query.user_id
  var order_id = ctx.request.query.food_order_id
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  if (hour < 10)
    hour = '0' + hour
  var minute = date.getMinutes()
  if (minute < 10)
    minute = '0' + minute
  var take_order_time = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute
  var orderinfo = {
    open_id: open_id,
    order_id: order_id,
    state: 1,
    take_order_time: take_order_time
  }
  await mysql("foodOrder").update({ order_state: 1 }).where({ order_id })
  await mysql("orderList").update({ order_state: 1 }).where({ order_id })
  var res = await mysql("orderinfo").insert(orderinfo)
  ctx.state.data = res
}