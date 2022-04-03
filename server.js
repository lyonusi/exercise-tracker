const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const handler = require('./src/handler/handler');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoUri = process.env['MONGO_URI'];
mongoose.connect(mongoUri, { useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected.')
});

db.on('error', err => {
  console.error('connection error:', err)
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', (req,res) =>{
  handler.createUser(req,res);
});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
