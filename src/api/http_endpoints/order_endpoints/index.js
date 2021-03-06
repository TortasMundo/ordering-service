const orderService = require('src/services/order_service')

module.exports = [
    {
        method: 'post',
        path: '/api/orders/place',
        action: async ctx => {
            const {jamon, lomo, especial, refrescos} = ctx.request.body

            if (
                Number(jamon) === 0 &&
                Number(lomo) === 0 &&
                Number(especial) === 0 &&
                Number(refrescos) === 0
            ) {
                ctx.body = {
                    success: false,
                    error: 'empty.order',
                }
            } else {
                const order = await orderService.place(ctx)
                ctx.body = {
                    success: true,
                    data: order,
                }
            }
        },
    },
    {
        method: 'post',
        path: '/api/orders/list',
        action: async ctx => {
            ctx.body = {
                success: true,
                data: await orderService.list(ctx),
            }
        },
    },
    {
        method: 'post',
        path: '/api/orders/update_status',
        action: async ctx => {
            ctx.body = {
                success: true,
                data: await orderService.updateStatus(ctx),
            }
        },
    },
    {
        method: 'post',
        path: '/api/orders/update',
        action: async ctx => {
            const result = await orderService.update(ctx)
            if (result) {
                ctx.body = {
                    success: true
                }
            } else {
                ctx.body = {
                    success: false,
                    error: 'not.updated'
                }
            }

        },
    },
]
