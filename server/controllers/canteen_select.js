const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var res = await mysql("foodShop").select("shop_img_url as src","shop_id as id", "shop_name as name", "shipping_fee as delivery_fee", "mini_delivery_fee as cost", "shop_intro as address")

  ctx.state.data = res
}
