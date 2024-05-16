let server = require('./server') // server.js 파일을 가져온다.
let router = require('./router') // router.js 파일을 가져온다.
let requestHandler = require('./requestHandler') // requestHandlers.js 파일을 가져온다.

const mariadb = require('./database/connect/mariadb')
mariadb.connect();

server.start(router.route, requestHandler.handle) // server.js 파일에서 exports 한 start 함수를 실행한다.