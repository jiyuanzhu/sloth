const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var order_id = ctx.request.query.order_id
  var res = await mysql("packageOrder").where({ order_id })
  ctx.state.data = res
}
