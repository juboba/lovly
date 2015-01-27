//Constructor:
var Photo = function(_node){
    this._node = _node;
}

//Inherit from baseModel:
var baseModel = require('./baseModel');
Object.setPrototypeOf(Photo, baseModel);

//Dynamic methods
Object.defineProperty(Photo.prototype, 'id', {
    get: function(){ return this._node.id; }
});

Object.defineProperty(Photo.prototype, 'file', {
    get: function(){ return this._node.data['file']; },
    set: function(file){ this._node.data['file'] = file; }
});

Object.defineProperty(Photo.prototype, 'caption', {
    get: function(){ return this._node.data['caption']; },
    set: function(caption){ this._node.data['caption'] = caption; }
});

Object.defineProperty(Photo.prototype, 'uploaded_on', {
    get: function(){ return this._node.data['uploaded_on']; },
    //set: function(uploaded_on){ this._node.data['uploaded_on'] = uploaded_on; }
});

Object.defineProperty(Photo.prototype, 'tags', {
    get: function(){ return this._node.data['tags']; },
    set: function(tags){ this._node.data['tags'] = tags; }
});


//Static methods
Photo.prototype.bareData = function(){
    var data = this._node.data;
    data.id = this.id;
    return this._node.data;
};

Photo.prototype.getAlbums = function(callback){
    this._node.getRelationshipNodes('OWNS', function(err, result){
        if(err) return callback(err);

        var albums = result.map(function(i){
            a = new Album(i);
            return a;
        });

        callback(null, albums);
    });
};

Photo.prototype.save = function(callback){
    this._node.save(function(err){
        callback(err);
    });
};

Photo.prototype.raw = function(){
    return {
        id: this._node.id,
        file: this._node.data['file'],
        caption: this._node.data['caption'],
        uploaded_on: this._node.data['uploaded_on'],
        tags: this._node.data['tags'],
    }
}

Photo.getAll = function(callback){
    this.db.query('MATCH (p:Photo) RETURN p', function(err, results){
        if (err) return callback(err);
        var people = results.map(function(result){
            return new Photo(result['p']);
        });
        callback(null, people);
    });
};

Photo.get = function(id, callback){
    this.db.getNodeById(id, function(err, node){
        if (err) return callback(err);

        callback(null, new Photo(node));
    });
};

Photo.getByName = function(name, callback){
    var query = [
        'MATCH (p:Photo)',
        'WHERE p.name =~ "(?i).*' + name + '.*"',
        'RETURN p'
        ].join('\n');

    //var params = {pname: name};

    this.db.query(query, function(err, result){
        if (err) return callback(err);
        if(result.length < 1) return callback({message: 'no one found'});

        var pp = new Photo(result[0].p);

        callback(null, new Photo(result[0].p));
    });
};

Photo.create = function(album, data, callback){
    var node = this.db.createNode(data);

    var query = [
        'CREATE (p:Photo {data})',
        'RETURN p'
        ].join('\n');

    var params = {data : data};

    this.db.query(query, params, function(err, results){
        if(err) return callback(err);
        var photo = new Photo(results[0]['p']);
        album._node.createRelationshipTo(photo._node, 'CONTAINS', {}, function (err, rel) {
            if(err) return callback(err);
            callback(null, photo);
        });
    });
};

module.exports = Photo;
