const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var name = ctx.request.query.cust_name
  var phone = ctx.request.query.cust_phone
  var addr = ctx.request.query.cust_addr
  var id = 1
  var person = {
    user_id : id,
    user_name :  name,
    tel : phone,
    address : addr,
    address_id : "u1a2",
    default_address : 0
  }
  var res = await mysql("contactInfo").insert(person)
  ctx.state.data = res
}