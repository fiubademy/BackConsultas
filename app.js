const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const mongodb_uri = "mongodb+srv://admin:admin@cluster0.ji51a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use( require('./routes/index') );

mongoose.connect(mongodb_uri,{ useUnifiedTopology: true, useNewUrlParser: true })
        .then( () => console.log('mongodb connection up'))
        .catch( error => console.log(`unable to connect to mongodb: ${error.message}`));

app.listen(3000, () => console.log('server started'));

