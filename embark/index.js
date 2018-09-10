/* global path */
var httpServer = require('http-server')
var remixd = require('remixd')

module.exports = (embark) => {
  var server = httpServer.createServer({
    root: path.join(__dirname, '/node_modules/remix-ide')
  })

  embark.registerServiceCheck('Remix IDE', (cb) => {
    return cb({name: 'Remix IDE (172.16.4.5:8080)', status: 'on'})
  })

  server.listen(8080, '172.16.4.5', function () {})
  var router = new remixd.Router(65520, remixd.services.sharedFolder, (webSocket) => {
    remixd.services.sharedFolder.setWebSocket(webSocket)
    var sharedFolder = path.join(__dirname, '/../../')
    remixd.services.sharedFolder.setupNotifications(sharedFolder)
    remixd.services.sharedFolder.sharedFolder(sharedFolder)
  })
  router.start()
}
