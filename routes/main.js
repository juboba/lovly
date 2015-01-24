//GET /
exports.index = function(req, res){
    res.sendfile('./frontend/index.html');
};
