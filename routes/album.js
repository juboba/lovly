/********************************************
 * GET: /gallery
 * Display a list of albums for a user
********************************************/
exports.list = function(req, res){
    var user_id = req.query.uid;

    User.get(user_id, function(err, user){
        if (err) return console.log(err);

        user.getAlbums(function(err, albums){
            if(err) return console.log(err);

            als = albums.map(function(al){
                return al.raw();
            });

            res.json(als);
        });
    });
};

/********************************************
 * GET: /album/:id
 * Display a list of photos for an album
********************************************/
exports.info = function(req, res){
    var album_id = req.params.id;

    Album.get(album_id, function(err, album){
        if (err) return console.log(err);

        res.json(album.raw());
    });
};

/********************************************
 * GET: /album/:id/photos
 * Display a list of photos for an album
********************************************/
exports.photo_list = function(req, res){
    var album_id = req.params.id;

    Album.get(album_id, function(err, album){
        if (err) return console.log(err);

        album.getPhotos(function(err, photos){
            if(err) return console.log(err);

            phs = photos.map(function(ph){
                return ph.raw();
            });

            var album_raw = album.raw();
            album_raw.photos = phs;

            res.json(album_raw);
        });
    });
};

/********************************************
 * POST: /album/create
 * Creates a new album for a user
********************************************/
exports.create = function(req, res){
    var user_id = req.body.uid;

    User.get(user_id, function(err, user){
        if(err) console.log(err);

        Album.create(user, {
            name: req.body.name,
            public: req.body.public,
            created_on: req.moment().format('YYYY-MM-D HH:mm:ss')
        }, function(err, album){
            if(err) console.log(err);
            res.json(album);
        });
    });

};

/********************************************
 * POST: /album/upload
 * Uploads new photo
********************************************/
exports.photo_middle = function(req, res, next){
    var user_id = req.query.uid;
    var album_id = req.body.aid;

    Album.get(album_id, function(err, album){
        if(err) return console.log(err);

        req.album = album;
        next();
    });
};

exports.photo_upload = function(req, res){
    var the_file = req.files.file

    Photo.create(req.album, {
        file: the_file.name,
        uploaded_on: req.moment().format('YYYY-MM-D HH:mm:ss')
    },
    function(err, photo){
        if(err) console.log(err);

        //Return the new photo id:
        res.json(photo.id);
    });
};
