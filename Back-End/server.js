const http = require('http');
const app = require('./index');
const server = http.createServer(app);
const port = 2001;
server.listen(port);
