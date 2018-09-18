const orderService = require('src/services/order_service')

module.exports = [
  {
    method: 'post',
    path: '/api/orders/place',
    action: async ctx => {
      const order = await orderService.place(ctx)
      ctx.body = {
        success: true,
        data: order
      }
    }
  },
  {
    method: 'post',
    path: '/api/orders/list',
    action: async ctx => {
      ctx.body = {
        success: true,
        data: await orderService.list(ctx)
      }
    }
  }
]
