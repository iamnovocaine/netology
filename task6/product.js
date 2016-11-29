let products = [];
function register(name,count){
	count = parseInt(count);
	products.push({"name" : name, "count" : count, "id" : parseInt(products.length + 1)});
	return JSON.stringify(products[products.length - 1]);
}
function add(id, count) {
	console.log((parseInt(id) - 1) + " " + products.length);
	if(parseInt(id) - 1 < products.length) {
		products[parseInt(id) - 1].count += parseInt(count);
		return JSON.stringify(products[parseInt(id) - 1]);
	}
	else 
		return null;
}
function deleteProd(id, count) {
	if(parseInt(id) - 1 < products.length) {
		products[parseInt(id) - 1].count -= parseInt(count);
		return JSON.stringify(products[parseInt(id) - 1]);
	}
	else
		return null;
}
function balance() {
	return JSON.stringify(products);
}
module.exports = {register, add, balance, deleteProd};