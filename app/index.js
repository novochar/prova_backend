
const express = require('express');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/user_route');
const CarRoute = require('./routes/car_route');
const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URI;
const port = process.env.PORT;

mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error, unable to connect to mongodb'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', UserRoute);
app.use('/car', CarRoute);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})