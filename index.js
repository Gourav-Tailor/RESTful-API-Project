const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Mongoose Connection with mongoDB
// created a connection using name db `userData`
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://gouravtailor:gouravtailor@merntest.cbyv9p4.mongodb.net/userData?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

// schema generation step
// Importing model with collection schemas
// {sales} --> `sales` collection , {authData} --> `auths` collection from `userData` database
const {sales} = require('./model/sales');
const {authData} = require('./model/authData');

// Express app endpoints
// Routes from server

app.use(express.static('public'));
// app.post('/login', authenticateUser, (req, res) => {
//   res.send(req.user);
// });

// `sales` collection from `userData` API for GET call
app.get('/sales/:id', function (req, res) {
  if(req.params['id'] === 'full'){
    sales.find({},{_id: 0,date: 1,item: 1,price: 1, quantity: 1},function (err, data) {
      if (err) return console.error(err);
      res.json(data);
    });
  }
  else{
    sales.find({_id: req.params['id']},{_id: 0,date: 1,item: 1,price: 1, quantity: 1},function (err, data) {
      if (err) return console.error(err);
      res.json(data);
    });
  }
});

// `auths` collection from `userData` API for GET call
app.get('/authData/:id', function (req, res) {
  if(req.params['id'] === 'full'){
    authData.find({},{_id: 0,username: 1,password: 1},function (err, data) {
      if (err) return console.error(err);
      res.json(data);
    });
  }
  else{
    authData.find({_id: req.params['id']},{_id: 0,username: 1,password: 1},function (err, data) {
      if (err) return console.error(err);
      res.json(data);
    });
  }
});

app.post('/authData/:username/:password', function (req,res){

    authData.insertMany([
      {
        _id: Date.now(),
        username: req.params.username,
        password: req.params.password
      },
    ])
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
});

app.delete('/authData/:id',function (req,res){
    authData.deleteOne({_id: req.params.id})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});