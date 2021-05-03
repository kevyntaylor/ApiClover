const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
app.use(express.static('.'));
// parse application/json
app.use(bodyParser.json())
var request = require('request');
app.use(cors())
const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();


app.get('/getinfo/:name', async function(req, res){
	console.log(req.params.name);
	stockX.searchProducts(req.params.name, {
	    limit: 1
	})
	.then(products => res.json(products))
	.catch(err => 
		res.json({"Find":"null"})
	);
});



app.get('/getInventory', async function(req, res){
    request({
		headers: {
		  'authorization':'Bearer 9ad872af-9355-ef37-ba2a-3bb7494e82f5'
		},
		uri: 'https://api.clover.com/v3/merchants/KDKHBEA1KR831/items?expand=itemStock&limit=1000',
		method: 'GET'
	  }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		  var info = JSON.parse(body)
		  res.send(info);
		}
	})
});

app.get('/getProduct/:idproducto', async function(req, res){
    request({
		headers: {
		  'authorization':'Bearer 9ad872af-9355-ef37-ba2a-3bb7494e82f5'
		},
		uri: 'https://api.clover.com/v3/merchants/KDKHBEA1KR831/items/'+req.params.idproducto+'?expand=itemStock',
		method: 'GET'
	  }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		  var info = JSON.parse(body)
		  res.send(info);
		}
	})
});

app.post('/create-product', async function (req, res){
	request({
		headers: {
		  'authorization':'Bearer 9ad872af-9355-ef37-ba2a-3bb7494e82f5'
		},
		uri: 'https://api.clover.com/v3/merchants/KDKHBEA1KR831/items',
		method: 'POST',
		json: req.body
	  }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		  res.send(body);
		}
	})
});


app.post('/update-product-stock/:idproduct', async function (req, res){
	request({
		headers: {
		  'authorization':'Bearer 9ad872af-9355-ef37-ba2a-3bb7494e82f5'
		},
		uri: 'https://api.clover.com/v3/merchants/KDKHBEA1KR831/item_stocks/'+req.params.idproduct,
		method: 'POST',
		json: req.body
	  }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		  res.send(body);
		}
	})
});


app.listen(4242, () => console.log('Running on port 4242'));