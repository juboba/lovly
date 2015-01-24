angular.module('lovly.controllers')

//Gallery Controller
.controller('galleryController', [
        '$scope',
        '$filter',
        '$modal',
function($scope, $filter, $modal){
    $scope.albums = [
        {
            id: 1,
            name: 'Vacaciones 2013',
            created_on: $filter('date')(new Date(2013, 02, 01))
        },
        {
            id: 2,
            name: 'Vacaciones 2013',
            created_on: $filter('date')(new Date(2013, 02, 01))
        }
    ];

    $scope.new_album = function(){
        $modal.open({
            templateUrl: 'new_album.tpl',
            controller: 'addAlbumController'
        })
        .result.then(function(album){
            $scope.albums.push({
                id: $scope.albums.length + 1,
                name: album,
                created_on: $filter('date')(new Date(2013, 02, 01))
            });
        });
    };
}])

//Add new Album to Gallery
.controller('addAlbumController', [
        '$scope',
        '$modalInstance',
function($scope, $modalInstance){

    $scope.album_name = '';

    $scope.save_album = function(){
        $modalInstance.close($scope.album_name);
    };

    $scope.close = function(){
        $modalInstance.dismiss()
    };
}])
;
