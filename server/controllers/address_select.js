const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var open_id = ctx.request.query.user_id
  var res = await mysql("foodContactInfo").where({ open_id }).select("open_id as cust_id", "user_name as cust_name", "user_tel as cust_phone", "user_address_room as cust_addr_room", "user_address_building as cust_addr_building", "user_Wechat as cust_Wechat","address_id as addr_id","default_address as default_id")

  ctx.state.data = res
}