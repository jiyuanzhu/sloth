const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var name = ctx.request.query.name
  var phone = ctx.request.query.phone
  var addr = ctx.request.query.addr
  var prename = ctx.request.query.prename
  var prephone = ctx.request.query.prephone
  var preaddr = ctx.request.query.preaddr
  var open_id = ctx.request.query.user_id
  var res = await mysql("foodContactInfo").where({ open_id: open_id, user_name: prename, user_tel: prephone, user_address: preaddr }).update({ user_name: name, user_tel: phone, user_address:addr})
  ctx.state.data = res
}