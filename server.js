const http = require('http');
const app = require('./app.js');

const port = 3000;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server running on port 3000`);
})