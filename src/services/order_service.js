const Order = require('src/services/models/Order')
const moment = require('moment-timezone')

const place = async ctx => {
  const orderPlacement = ctx.request.body

  const order = {
    customerCode: '0',
    delivererId: '0',
    jamonQuantity: orderPlacement.jamon,
    lomoQuantity: orderPlacement.lomo,
    especialQuantity: orderPlacement.especial,
    refrescosQuantity: orderPlacement.refrescos,
    total:
      Number(orderPlacement.jamon) * 40 +
      Number(orderPlacement.lomo) * 50 +
      Number(orderPlacement.especial) * 60 +
      Number(orderPlacement.refrescos) * 20,
    status: 'ORDERED',
    paidOnline: false,
    customerLocationLatitude: orderPlacement.customerLocation.latitude,
    customerLocationLongitude: orderPlacement.customerLocation.longitude,
    delivererLocationLatitude: '',
    delivererLocationLongitude: '',
  }
  const result = await Order.query(ctx.knex).insert(order)

  ctx.socketServer.emit('placed_order', { meta: { isTest: ctx.isTest }, data: result })

  return result
}

const list = async ctx => {
  const tz = moment.tz.guess()
  return await Order.query(ctx.knex).whereRaw(
    '(?? at time zone ?)::date = (current_date at time zone ?)::date',
    ['orderedAt', tz, tz],
  )
}

module.exports = {
  place,
  list,
}
