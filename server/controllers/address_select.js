const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var user_id = ctx.request.query.user_id
  var res = await mysql("contactInfo").where({user_id}).select("user_id as cust_id","user_name as cust_name","tel as cust_phone","address as cust_addr","address_id as addr_id","default_address as default_id")

  ctx.state.data = res
}