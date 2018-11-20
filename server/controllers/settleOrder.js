const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var addr_id = ctx.request.query.addr_id
  var orders = JSON.parse(ctx.request.query.orders)
  var cost = ctx.request.query.cost
  var shop_id = ctx.request.query.shop_id
  var state = -1

  var open_id = ctx.request.query.user_id
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  if(hour<10)
    hour = '0' + hour
  var minute = date.getMinutes()
  if(minute<10)
    minute = '0' + minute
  var order_time = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute 
  var order_type = 1
  var order = {
    open_id: open_id,
    order_type: order_type,
    order_time: order_time,
    order_state: state
  }

  var res3 = await mysql("orderList").insert(order)
  var res1 = await mysql("orderList").select("order_id").where({ order_time, open_id, order_type})
  var order_id = res1[res1.length - 1].order_id
  var foodOrder ={
    order_id: order_id,
    order_time: order_time,
    open_id: open_id,
    total_cost: cost,
    order_state: state,
    address_id: addr_id
  }
  var res = await mysql("foodOrder").insert(foodOrder)
  var length = orders.length
  var ret = ""
  for (var i = 0; i < length; i++){
    var good_id = orders[i].foodid
    var foodOrderDetail = {
      order_id: order_id,
      good_id: good_id,
      good_order_num: orders[i].numb
    }
    ret+= await mysql("foodOrderDetail").insert(foodOrderDetail)
  }
``//修改默认地址
  var res4 = await mysql("foodContactInfo").where({ open_id: open_id,default_address:1}).update({default_address:0})
  var res5 = await mysql("foodContactInfo").where({ open_id: open_id,address_id:addr_id}).update({default_address:1})

  ctx.state.data = res
}