const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var user_id = ctx.request.query.user_id
  var res = await mysql("contactInfo").where({ user_id }).select("user_name as name", "tel as phone", "address as decom","default_address as default_id","address_id as addr_id")

  ctx.state.data = res
}