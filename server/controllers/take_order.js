const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var user_id = ctx.request.query.user_id
  var food_order_id = ctx.request.query.food_order_id
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var take_order_time = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute 
  var orderinfo = {
    user_id: user_id,
    food_order_id: food_order_id,
    state: 1,
    take_order_time: take_order_time
  }
  var res = await mysql("orderinfo").insert(orderinfo)
  ctx.state.data = res
}