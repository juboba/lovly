// server.js

Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
      obj.__proto__ = proto;
        return obj; 
}

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var routes = require('./routes');

    // configuration =================

    //mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/frontend'));                 // set the static files location /public/img will be /img for users
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    User = require('./models/user');
    Album = require('./models/album');
//var Photo = require('./models/photo');
    
    app.get('/gallery',
            routes.album.list);
    app.post('/album/create',
            routes.album.create);

    app.get('*',
            routes.main.index);


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");


