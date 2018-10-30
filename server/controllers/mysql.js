const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var res = await mysql("shop")

  ctx.state.data = res
}
