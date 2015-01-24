//Constructor:
var Album = function(_node){
    this._node = _node;
}

//Inherit from baseModel:
var baseModel = require('./baseModel');
Object.setPrototypeOf(Album, baseModel);

//Dynamic methods
Object.defineProperty(Album.prototype, 'id', {
    get: function(){ return this._node.id; }
});

Object.defineProperty(Album.prototype, 'name', {
    get: function(){ return this._node.data['name']; },
    set: function(name){ this._node.data['name'] = name; }
});

Object.defineProperty(Album.prototype, 'public', {
    get: function(){ return this._node.data['public']; },
    set: function(public){ this._node.data['public'] = public; }
});

Object.defineProperty(Album.prototype, 'created_on', {
    get: function(){ return this._node.data['created_on']; },
    set: function(created_on){ this._node.data['created_on'] = created_on; }
});


//Static methods
Album.prototype.bareData = function(){
    var data = this._node.data;
    data.id = this.id;
    return this._node.data;
};

Album.prototype.save = function(callback){
    this._node.save(function(err){
        callback(err);
    });
};

Album.getAll = function(callback){
    this.db.query('MATCH (p:Album) RETURN p', function(err, results){
        if (err) return callback(err);
        var people = results.map(function(result){
            return new Album(result['p']);
        });
        callback(null, people);
    });
};

Album.get = function(id, callback){
    this.db.getNodeById(id, function(err, node){
        if (err) return callback(err);

        callback(null, new Album(node));
    });
};

Album.getByName = function(name, callback){
    var query = [
        'MATCH (p:Album)',
        'WHERE p.name =~ "(?i).*' + name + '.*"',
        'RETURN p'
        ].join('\n');

    //var params = {pname: name};

    this.db.query(query, function(err, result){
        if (err) return callback(err);
        if(result.length < 1) return callback({message: 'no one found'});

        var pp = new Album(result[0].p);

        callback(null, new Album(result[0].p));
    });
};

Album.create = function(user, data, callback){
    var node = this.db.createNode(data);
    var album = new Album(node);

    var query = [
        'CREATE (a:Album {data})',
        'RETURN a'
        ].join('\n');

    var params = data;

    this.db.query(query, params, function(err, results){
        if(err) return callback(err);
        var album = new Album(results[0]['a']);
        user._node.createRelationshipTo(album._node, 'OWNS', {}, function (err, rel) {
            if(err) return callback(err);
            callback(album);
        });
    });
};

module.exports = Album;
