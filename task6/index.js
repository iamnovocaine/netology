const http = require('http');
const url = require('url');
const port = process.env.PORT || 3000;
const product = require('./product');

function handler(req, res) {
	const urlParsed = url.parse(req.url, true);
	let data, code;
	switch(urlParsed.pathname) {
		case '/register':
			let newProduct = product.register(urlParsed.query.name, urlParsed.query.count);
			data = newProduct;
			code = 200;
			break;		
		case '/add':
			let addedProduct = product.add(urlParsed.query.id, urlParsed.query.count);
			if(addedProduct) {
				data = addedProduct;
				code = 200;
			} else {
				data = 'Bad Request';
				code = 400;
			}
			break;		
		case '/delete':
			let deleteprod = product.deleteProd(urlParsed.query.id, urlParsed.query.count);
			if(deleteprod) {
				data = deleteprod;
				code = 200;
			} else {
				data = 'Bad Request';
				code = 400;
			}
			break;		
		case '/balance':
			data = product.balance();
			code = 200;
			break;		
		default:
			data = 'Page not found';
			code = 404;
		break;
	}
	res.writeHead(code, {'Content-Type': 'application/json'});
	res.end(data);
}

const server = http.createServer();
server.on('error', err => console.error(err));
server.on('request', handler);
server.listen(port);