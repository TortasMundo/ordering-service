const orderService = require('src/services/order_service')

module.exports = [
  {
    method: 'post',
    path: '/api/orders/place',
    action: async ctx => {
      const {jamon, lomo, especial, refrescos} = ctx.request.body

      if (jamon === '0' && lomo === '0' && especial === '0' && refrescos === '0') {
        ctx.body = {
          success: false,
          error: 'empty.order'
        }
      } else {
        const order = await orderService.place(ctx)
        ctx.body = {
          success: true,
          data: order
        }
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
  },
  {
    method: 'post',
    path: '/api/orders/update_status',
    action: async ctx => {
      ctx.body = {
        success: true,
        data: await orderService.updateStatus(ctx)
      }
    }
  }
]
