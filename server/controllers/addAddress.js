const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var name = ctx.request.query.cust_name
  var phone = ctx.request.query.cust_phone
  var addr = ctx.request.query.cust_addr
  var user_id = ctx.request.query.user_id
  var ret = await mysql("contactInfo").where({user_id})
  var addr_id = ret.length
  var person = {
    user_id : user_id,
    user_name :  name,
    tel : phone,
    address : addr,
    address_id: addr_id,
    default_address : 0
  }
  var res = await mysql("contactInfo").insert(person)
  ctx.state.data = res
}