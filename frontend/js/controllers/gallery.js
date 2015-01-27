angular.module('lovly.controllers')

//Gallery Controller
.controller('galleryController', [
        '$scope',
        '$filter',
        '$modal',
        '$http',
function($scope, $filter, $modal, $http){
    //Get album list:
    $http.get('/gallery', {
        params: {
            uid: 174
        }
    }).
    success(function(albums){
        $scope.albums = albums;
    }).
    error(function(data, status){
        console.log(status);
    });


    //Create new album:
    $scope.new_album = function(){
        $modal.open({
            templateUrl: 'new_album.tpl',
            controller: 'addAlbumController'
        })
        .result.then(function(album){
            $http.post('/album/create', {
                uid: 174,
                name: album.name,
                public: album.public
            }).
            success(function(album){
                $scope.albums.push(album);
            }).
            error(function(data, status){
                console.log(status);
            });
        });
    };
}])

//Add new Album to Gallery
.controller('addAlbumController', [
        '$scope',
        '$modalInstance',
function($scope, $modalInstance){

    $scope.new_album = {
        name: '',
        public: false
    };

    $scope.save_album = function(){
        $modalInstance.close($scope.new_album);
    };

    $scope.close = function(){
        $modalInstance.dismiss()
    };
}])
;
