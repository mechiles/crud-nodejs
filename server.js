// set up ========================
var express  = require('express');
var app      = express();                 // create our app w/ express
var mongoose = require('mongoose');           // mongoose for mongodb

// configuration =================

mongoose.connect('mongodb://localhost:27017/people');   // connect to mongoDB database on modulus.io

app.configure(function() {
  app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
  app.use(express.logger('dev'));             // log every request to the console
  app.use(express.bodyParser());              // pull information from html in POST
  app.use(express.methodOverride());            // simulate DELETE and PUT
});

// define model ================
var Parent = mongoose.model('Parent', {
  text : String
});

// routes =======================
 // api -----------
 // get all parents
 app.get('/api/parents', function(req, res) {

  // use mongoose to get all parents in the database
  Parent.find(function(err, parents) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)

    res.json(parents); // return all parents in JSON format
  });
 });

 // create todo and send back all parents after creation
 app.post('/api/parents', function(req, res) {

  // create a todo, information comes from AJAX request from Angular
  Parent.create({
    text : req.body.text,
    done : false
  }, function(err, parent) {
    if (err)
      res.send(err);

    // get an return all the parents after you create another
    Parent.find(function(err, parents) {
      if (err)
        res.send(err)
      res.json(parents);
    });
  });
 });

 //delete a todo
 app.delete('/api/parents/:parent_id', function(req, res) {
  Parent.remove({
    _id : req.params.parent_id
  }, function(err, parent) {
    if (err)
      res.send(err);

    // get and return all the parents after you create another
    Parent.find(function(err, parents) {
      if (err)
        res.send(err)
      res.json(parents);
    });
  });
 });

// application ------------------
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
