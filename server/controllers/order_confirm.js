const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var user_id = 1
  var res = await mysql("contactInfo").where({ user_id }).select("user_name as name", "tel as phone", "address as decom")

  ctx.state.data = res
}