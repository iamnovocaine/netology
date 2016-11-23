const http = require('http');
const port = process.env.PORT || 3000;
function handler(req, res) {
	let name = req.url.replace('/', '') || 'World';
	res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
	res.write(`Hello ${name}!`);
	res.end();
}
const server = http.createServer();
server.on('error', err => console.error(err));
server.on('request', handler);
server.listen(port);