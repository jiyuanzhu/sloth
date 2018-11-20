const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var prename = ctx.request.query.prename
  var prephone = ctx.request.query.prephone
  var preaddr = ctx.request.query.preaddr
  var open_id = ctx.request.query.user_id
  var res = await mysql("foodContactInfo").where({ open_id: open_id, user_name: prename, user_tel: prephone, user_address: preaddr }).del()
  ctx.state.data = res
}