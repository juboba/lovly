//GET /
exports.index = function(req, res){
    res.sendFile('./frontend/index.html');
};
