//Constructor:
var User = function(_node){
    this._node = _node;
}

//Inherit from baseModel:
var baseModel = require('./baseModel');
Object.setPrototypeOf(User, baseModel);

//Dynamic methods
Object.defineProperty(User.prototype, 'id', {
    get: function(){ return this._node.id; }
});

Object.defineProperty(User.prototype, 'name', {
    get: function(){ return this._node.data['name']; },
    set: function(name){ this._node.data['name'] = name; }
});

Object.defineProperty(User.prototype, 'born', {
    get: function(){ return this._node.data['born']; },
    set: function(born){ this._node.data['born'] = born; }
});


//Static methods
User.prototype.bareData = function(){
    var data = this._node.data;
    data.id = this.id;
    return this._node.data;
};

User.prototype.getAlbums = function(callback){
    this._node.getRelationshipNodes('OWNS', function(err, result){
        if(err) return callback(err);

        var albums = result.map(function(i){
            a = new Album(i);
            return a;
        });

        callback(null, albums);
    });
};

User.prototype.save = function(callback){
    this._node.save(function(err){
        callback(err);
    });
};

User.getAll = function(callback){
    this.db.query('MATCH (p:User) RETURN p', function(err, results){
        if (err) return callback(err);
        var people = results.map(function(result){
            return new User(result['p']);
        });
        callback(null, people);
    });
};

User.get = function(id, callback){
    this.db.getNodeById(id, function(err, node){
        if (err) return callback(err);

        callback(null, new User(node));
    });
};

User.getByName = function(name, callback){
    var query = [
        'MATCH (p:User)',
        'WHERE p.name =~ "(?i).*' + name + '.*"',
        'RETURN p'
        ].join('\n');

    //var params = {pname: name};

    this.db.query(query, function(err, result){
        if (err) return callback(err);
        if(result.length < 1) return callback({message: 'no one found'});

        var pp = new User(result[0].p);

        callback(null, new User(result[0].p));
    });
};

module.exports = User;
