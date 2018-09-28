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
    total:
      Number(orderPlacement.jamon) * 40 +
      Number(orderPlacement.lomo) * 50 +
      Number(orderPlacement.especial) * 60 +
      Number(orderPlacement.refrescos) * 20,
    status: 'ORDERED',
    paid_online: false,
    customer_location_latitude: orderPlacement.customerLocation.latitude,
    customer_location_longitude: orderPlacement.customerLocation.longitude,
    notes: '',
  }
  const result = await Order.query(ctx.knex).insert(order)

  ctx.socketServer.emit('placed_order', { meta: { isTest: ctx.isTest }, data: result })

  return result
}

const list = async ctx => {
  const tz = moment.tz.guess()
  return await Order.query(ctx.knex).whereRaw(
    '(?? at time zone ?)::date = (current_date at time zone ?)::date',
    ['ordered_at', tz, tz],
  )
}

const updateStatus = async ctx => {
  const request = ctx.request.body
  return await Order.query(ctx.knex).update({
    status: request.newStatus,
  }).where('code', '=', request.code)
}

module.exports = {
  place,
  list,
  updateStatus
}
