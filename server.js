const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api_helper = require('./API_helper');
//const axios = require('axios');
const enforce = require('express-sslify');
const compression = require('compression');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));

	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});

	app.get('/fetch', (req, res) => {
		api_helper
			.make_API_call(
				`https://api.openweathermap.org/data/2.5/forecast?q=helsinki&appid=${process.env.API_KEY}&units=metric`
			)
			.then((response) => {
				res.header(
					'Access-Control-Allow-Origin',
					'https://theweatherforecastapp.herokuapp.com/'
				);
				res.send(response);
			})
			.catch((error) => {
				res.send(error);
			});
	});

	app.use(compression);
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.listen(port, (error) => {
	if (error) throw Error;
	console.log('Sever running on port ' + port);
});

app.get('/fetch', (req, res) => {
	api_helper
		.make_API_call(
			`https://api.openweathermap.org/data/2.5/forecast?q=helsinki&appid=${process.env.API_KEY}&units=metric`
		)
		.then((response) => {
			res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
			res.send(response);
		})
		.catch((error) => {
			res.send(error);
		});
});
