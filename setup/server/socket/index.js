const config = require('config')
const socketIO = require('socket.io')

class SocketServer {
  constructor(httpServer, channelListeners) {
    const sockerServer = socketIO(httpServer)
    sockerServer.on('connection', socket => {
      channelListeners.map(l => {
        socket.on(l.channel, l.action)
      })
    })
    return sockerServer
  }
}

module.exports = SocketServer
