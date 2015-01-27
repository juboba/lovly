// server.js
Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
      obj.__proto__ = proto;
        return obj; 
}

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var multer = require('multer');
    var moment = require('moment');
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var routes = require('./routes');

    // configuration =================

    //mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/frontend'));                 // set the static files location /public/img will be /img for users
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(multer({
        dest: './uploads',
        rename: function(fieldname, filename){
            return filename.replace(/\W+/g, '-').toLowerCase();
        }
    }));

    app.use(function(req, res, next){
        req.moment = moment;
        next();
    });

    User = require('./models/user');
    Album = require('./models/album');
    Photo = require('./models/photo');
    
    app.get('/gallery',
            routes.album.list);

    app.get('/album/:id',
            routes.album.info);

    app.get('/album/:id/photos',
            routes.album.photo_list);

    app.get('/photo/:id',
            routes.photo.info);

    app.get('/photo/:id/view',
            routes.photo.view);

    app.post('/album/create',
            routes.album.create);

    app.post('/album/upload',
            routes.album.photo_middle, //make this better.
            routes.album.photo_upload);

    app.get('*',
            routes.main.index);


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");


