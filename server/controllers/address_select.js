const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var open_id = ctx.request.query.user_id
  var res = await mysql("foodContactInfo").where({ open_id}).select("open_id as cust_id","user_name as cust_name","user_tel as cust_phone","user_address as cust_addr","address_id as addr_id","default_address as default_id")

  ctx.state.data = res
}