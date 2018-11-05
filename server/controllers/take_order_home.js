const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var res = await mysql("foodOrder")
  var num = res.length
  var str = "{\"data\":["
  for(var i = 0;i<num;i++){
    if(i==0)
      str+="{"
    else
      str+=",{"
    str += "\"order_type\":\"早餐\","
    var food_order_id = res[i].food_order_id
    var res1 = await mysql("foodOrderDetail").where({ food_order_id})
    var order_total_item = res1.length
    var good_id = res1[0].good_id
    var res4 = await mysql("catalog_good").where({ good_id })
    var order_good_name = res4[0].good_name
    var shop_id = good_id.substr(1,1)
    var res2 = await mysql("shop").where({ shop_id })
    var order_shop_address = res2[0].shop_intro
    var order_deli_fee = res2[0].shipping_fee
    var order_good_num = res1[0].good_order_num
    var user_id = res[i].user_id
    var res3 = await mysql("contactInfo").where({user_id})
    var order_address = res3[0].address
    var order_time = res[i].food_order_time
    var order_sum = res[i].total_cost
    str += "\"order_shop_address\":\"" + order_shop_address+"\","
    str += "\"order_deli_fee\": \"" + order_deli_fee+"\","
    str += "\"order_total_item\": \"" + order_total_item+"\","
    str += "\"order_good_name\": \"" + order_good_name+"\","
    str += "\"order_good_num\": \"" + order_good_num+"\","
    str += "\"order_address\": \"" + order_address+"\","
    str += "\"order_deli_time\": \"明早7: 00 - 8: 00送达\","
    str += "\"order_time\": \"" + order_time+"\","
    str += "\"order_sum\": \"" + order_sum+"\""
    str += "}"
  }
  str += "]}"
  ctx.state.data = JSON.parse(str)
}
