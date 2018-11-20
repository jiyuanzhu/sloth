const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var shop_id = ctx.request.query.id
  var res = await mysql("foodMenu").where({ shop_id }).select("good_catalog").distinct()
  var num = res.length
  var shop = await mysql("foodShop").where({ shop_id })
  var str = "{\"id\":" + shop_id + ",\"shop\":{\"src\":\"../../images/breakfastMenu/shop.png\",\"deli\":" + shop[0].mini_delivery_fee + ",\"delifee\":" + shop[0].shipping_fee + ",\"addr\":\""+shop[0].shop_intro+"\",\"notice\": \""+shop[0].shop_notice+"\",\"sale\": 5427},"
  for(var i=0;i<num;i++){
    if(i==0)
      str += "\"menu\":[{"
    else
      str += ",{"
    var typeName = res[i].good_catalog
    var menuContent = await mysql("foodMenu").where({ shop_id, good_catalog: typeName })
    str += "\"typeName\":\"" + typeName + "\",\"menuContent\": ["
    for (var j = 0; j < menuContent.length;j++){
      var good_id = menuContent[j].good_id
      var content = await mysql("foodMenu").where({ good_id })
      if(j==0)
        str += "{"
      else 
        str += ",{"
      str += "\"src\":\"" + content[0].good_img_url +"\","
      str += "\"foodid\":\"" + content[0].good_id + "\","
      str += "\"name\":\"" + content[0].good_name+"\","
      str += "\"intr\":\"" + content[0].good_intro +"\","
      str += "\"gsale\":\"" + content[0].good_sale + "\","
      str += "\"price\":" + content[0].good_price +","
      str += "\"total\":0,"
      str += "\"numb\":0"
      str += "}"
    }
    str += "]}"
  }
  str += "]}"
  ctx.state.data = JSON.parse(str)
}
