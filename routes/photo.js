/********************************************
 * GET: /photo/:id/view
 * Display a list of albums for a user
********************************************/
exports.view = function(req, res){
    var photo_id = req.params.id;

    var options = {
        root: '/home/juboba/Code/lovly/uploads/'
    };

    Photo.get(photo_id, function(err, photo){
        if (err) return console.log(err);

        res.sendFile(photo.file, options);
    });
};

/********************************************
 * GET: /photo/:id
 * Display a list of albums for a user
********************************************/
exports.info = function(req, res){
    var photo_id = req.params.id;

    Photo.get(photo_id, function(err, photo){
        if (err) return console.log(err);

        res.json(photo.raw());
    });
};
