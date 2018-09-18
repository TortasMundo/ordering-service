const HttpServer = require('setup/server/http')
const SocketServer = require('setup/server/socket')
const orderEndpoints = require('src/api/http_endpoints/order_endpoints')

const httpServer = new HttpServer([
  ...orderEndpoints,
])

const socketServer = new SocketServer(httpServer.server, [

])

httpServer.start(socketServer)
