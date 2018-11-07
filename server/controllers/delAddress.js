const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var prename = ctx.request.query.prename
  var prephone = ctx.request.query.prephone
  var preaddr = ctx.request.query.preaddr
  var user_id = ctx.request.query.user_id
  var res = await mysql("contactInfo").where({ user_id: user_id, user_name: prename, tel: prephone, address: preaddr }).del()
  ctx.state.data = res
}