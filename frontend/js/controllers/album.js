angular.module('lovly.controllers')

//Album Controller
.controller('albumController', [
        '$scope',
        '$filter',
        '$stateParams',
        '$modal',
        'FileUploader',
        '$http',
function($scope, $filter, $stateParams, $modal, FileUploader, $http){

    var album_id = $stateParams.id;

    $scope.polaroid_on = 'polaroid-images';

    $scope.config = {};

    $http.get('/album/' + album_id + '/photos/').
        success(function(album){
            $scope.album = album;
            $scope.photos = album.photos;
        }).
        error(function(data, status){
            console.log(status);
        });


    $scope.open_config = function(){
        $modal.open({
            templateUrl: 'album_config.tpl',
            controller: 'albumConfigController'
        })
        .result.then(function(config){
            $scope.config.name = config.name;
            $scope.album.name = config.name;
        });
    };

    FileUploader.FileSelect.prototype.isEmptyAfterSelection = function(){
        return true;
    };

    $scope.uploader= new FileUploader({
        url: '/album/upload',
        autoUpload: true,
        removeAfterUpload: true,
        formData: [{aid: album_id}]
    });
    

}])

//Config Controller
.controller('albumConfigController', [
        '$scope',
        '$modalInstance',
function($scope, $modalInstance){

    $scope.save_config = function(){
        $modalInstance.close({
            name: $scope.album_name
        });
    };

    $scope.close = function(){
        $modalInstance.dismiss();
    };
}])

;
