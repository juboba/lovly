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
                return {
                    id: al.id,
                    name: al.name,
                    created_on: al.created_on
                };
            });

            res.json(als);
        });
    });
};

/********************************************
 * POST: /album/create
 * Creates a new album for a user
********************************************/
exports.create = function(req, res){
    var user_id = req.query.uid;

    var user = new User(user_id);

    var now = new Date();

    var format_date = function(raw){
        var date = {
            year: raw.getFullYear(),
            month: raw.getMonth() + 1,
            day: raw.getDate(),
            hours: raw.getHours(),
            minutes: raw.getMinutes(),
            seconds: raw.getSeconds()
        };

        return date.year
            + '-' +
            date.month
            + '-' +
            date.day
            + ' ' +
            date.hours
            + ':' +
            date.minutes
            + ':' +
            date.seconds
            ;
    };

    Album.create(user, {
        name: req.body.name,
        public: req.body.public,
        created_on: format_date(now)
    }, function(err, album){
        res.json(album);
    });

};
