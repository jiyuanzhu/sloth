const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var food_order_id=ctx.request.query.food_order_id
  var res1=await mysql("foodOrder").update({ food_order_state: 2 }).where({ food_order_id })
  var res2=await mysql("orderinfo").update({ state: 2}).where({ food_order_id })

  ctx.state.data = res1&&res2
}