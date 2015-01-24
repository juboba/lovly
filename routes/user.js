/********************************************
 * GET: /profile
 * Display user information
********************************************/
exports.show = function(req, res){
    var user_id = req.query.uid;

    User.get(user_id, function(err, user){
        if (err) return console.log(err);

        res.json({
            user.id,
            user.name
        });
    });
};
