const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var name = ctx.request.query.name
  var phone = ctx.request.query.phone
  var addr = ctx.request.query.addr
  var prename = ctx.request.query.prename
  var prephone = ctx.request.query.prephone
  var preaddr = ctx.request.query.preaddr
  var user_id = ctx.request.query.user_id
  var res = await mysql("contactInfo").where({user_id:user_id,user_name:prename,tel:prephone,address:preaddr}).update({user_name:name,tel:phone,address:addr})
  ctx.state.data = res
}