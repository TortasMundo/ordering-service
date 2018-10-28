const Order = require('src/services/models/Order')
const moment = require('moment-timezone')
const uuid = require('uuid')

const place = async ctx => {
  const orderPlacement = ctx.request.body

  const order = {
    customer_code: '0',
    code: uuid(),
    deliverer_id: '0',
    store_id: 1,
    jamon_quantity: orderPlacement.jamon,
    lomo_quantity: orderPlacement.lomo,
    especial_quantity: orderPlacement.especial,
    refrescos_quantity: orderPlacement.refrescos,
    total: calculateTotal(orderPlacement.jamon, orderPlacement.lomo, orderPlacement.especial, orderPlacement.refrescos),
    status: 'ORDERED',
    paid_online: false,
    customer_location_latitude: orderPlacement.customerLocation.latitude,
    customer_location_longitude: orderPlacement.customerLocation.longitude,
    notes: orderPlacement.notes,
  }
  const result = await Order.query(ctx.knex).insert(order)

  ctx.socketServer.emit('placed_order', { meta: { isTest: ctx.isTest }, data: result })

  return order
}

calculateTotal = (jamon, lomo, especial, refrescos) => {
    return Number(jamon) * 40 +
        Number(lomo) * 50 +
        Number(especial) * 60 +
        Number(refrescos) * 20
}

const list = async ctx => {
  const tz = ctx.request.headers['timezone']

  return await Order.query(ctx.knex)
    .whereRaw('(?? at time zone ?)::date = (now() at time zone ?)::date', ['ordered_at', tz, tz])
    .orderBy('id')
}

const updateStatus = async ctx => {
  const request = ctx.request.body
  return await Order.query(ctx.knex)
    .update({
      status: request.newStatus,
    })
    .where('code', '=', request.code)
}

const update = async ctx => {
    const request = ctx.request.body
    return await Order.query(ctx.knex)
        .update({
            jamon_quantity: request.newJamon,
            lomo_quantity: request.newLomo,
            especial_quantity: request.newEspecial,
            refrescos_quantity: request.newRefrescos,
            notes: request.newNotes,
            total: calculateTotal(request.newJamon, request.newLomo, request.newEspecial, request.newRefrescos),
        })
        .where('code', '=', request.code)
        .andWhere('status', '=', 'ORDERED')
}

module.exports = {
  place,
  list,
  updateStatus,
  update,
}
