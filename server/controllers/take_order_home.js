const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var res = await mysql("foodOrder")
  var num = res.length
  var str = "{\"data\":["
  var count = 0
  for(var i = 0;i<num;i++){
    var food_order_id
    if (res[i].food_order_id != undefined)
      food_order_id = res[i].food_order_id
    else 
      continue
    var res1 = await mysql("foodOrderDetail").where({ food_order_id})
    var order_total_item = res1.length
    var good_id
    if (res1.length != 0)
      good_id = res1[0].good_id
    else
    continue
    var res4 = await mysql("catalog_good").where({ good_id })
    var order_good_name
    if (res4.length != 0)
      order_good_name = res4[0].good_name
    else
      continue
    var shop_id = good_id.substr(1,1)
    var res2 = await mysql("shop").where({ shop_id })
    
    var order_shop_address
    if (res2.length != 0)
      order_shop_address = res2[0].shop_intro
    else
      continue
    var order_deli_fee = res2[0].shipping_fee

    var order_good_num = res1[0].good_order_num
    var user_id = res[i].user_id
    var res3 = await mysql("contactInfo").where({user_id})
    var order_address
    if (res3.length != 0)
      order_address = res3[0].address
    else
      continue
    var res5
    if(res[i].food_order_time != undefined)
      res5 = res[i].food_order_time
    else
      continue

    var order_time = res5.substr(5)
    var order_sum
    if(res[i].total_cost != undefined)
      order_sum=res[i].total_cost
    else
      continue
    var res6 = await mysql("orderinfo").where({ food_order_id })
    if(res6.length>0)
      continue
    var checkUser_id = res[i].user_id
    if(checkUser_id==user_id)
      continue
  
    if (count == 0)
      str += "{"
    else
      str += ",{"
    str += "\"order_type\":\"早餐\","
    str += "\"food_order_id\":\"" + food_order_id + "\","
    str += "\"order_shop_address\":\"" + order_shop_address+"\","
    str += "\"order_deli_fee\": \"" + order_deli_fee+"\","
    str += "\"order_total_item\": \"" + order_total_item+"\","
    str += "\"order_good_name\": \"" + order_good_name+"\","
    if(order_total_item<=1)
      str += "\"order_good_num\": \"" + order_good_num+"\","
    else
      str += "\"order_good_num\": \"" + order_good_num + "等\","
    str += "\"order_address\": \"" + order_address+"\","
    str += "\"order_deli_time\": \"明早7: 00 - 8: 00送达\","
    str += "\"order_time\": \"" + order_time+"\","
    str += "\"order_sum\": \"" + order_sum+"\""
    str += "}"
    count+=1
  }
  str += "]}"
  ctx.state.data = JSON.parse(str)
}
