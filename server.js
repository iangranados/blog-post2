const express = require('express');
const postsRouter = require('./blog-post-router')
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use('', jsonParser, postsRouter);

app.listen(8080, () => {
	console.log('Your app is running in port 8080');
});