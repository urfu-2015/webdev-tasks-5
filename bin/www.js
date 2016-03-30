
var app = require('../app');
var http = require('http');
const config = require('config');
const serverConfig = config.get("server");

var port = normalizePort(process.env.PORT || serverConfig.port || '3000');
app.set('port', port);


var server = http.createServer(app);



server.listen(port, () => {
    console.log(`Server started on \x1B[35mhttp://${serverConfig.host}:` +
        `${serverConfig.port}\x1B[39m`);
});
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}



function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
}
