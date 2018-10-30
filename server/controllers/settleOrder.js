const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var orders = JSON.parse(ctx.request.query.orders)
  var cost = ctx.request.query.cost
  var shop_id = ctx.request.query.shop_id
  var state = 1

  var user_id = 1
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  var food_order_time = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second
  //var food_order_time = ""+year+month+day

  var foodOrder = {
    //food_order_id: null,
    food_order_time: food_order_time,
    user_id: user_id,
    total_cost: cost,
    food_order_state: state
  }
  var res = await mysql("foodOrder").insert(foodOrder)
  var res1 = await mysql("foodOrder").select("food_order_id").where({ food_order_time, user_id })
  var length = orders.length
  var ret = ""
  for (var i = 0; i < length; i++){
    var goodid = orders[i].numb
    var good_id = "s"+shop_id+"g"+goodid
    var foodOrderDetail = {
      food_order_id: res1[0].food_order_id,
      good_id: good_id,
      good_order_num: orders[i].numb
    }
    ret+= await mysql("foodOrderDetail").insert(foodOrderDetail)
  }


  ctx.state.data = ret
}