const express = require('express');
const app = express();
const port = 3000;
const data = require('./custom.geo.json')
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	console.log('/ called');
	res.send(index.html);
});

app.get('/custom.geo.json', function(req, res) {
	console.log('called!')
	res.header("Content-Type", 'application/json');
	res.send(data);
});

app.listen(port, () => console.log('Listening on port 3000'))