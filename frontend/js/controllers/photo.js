angular.module('lovly.controllers')

//Photo Controller
.controller('photoController', [
        '$scope',
        '$filter',
        '$stateParams',
        '$modal',
        'uiGmapGoogleMapApi',
        '$http',
function($scope, $filter, $stateParams, $modal, uiGmapGoogleMapApi, $http){

    uiGmapGoogleMapApi.then(function(maps) {
        var mapOptions = {
                        center: { lat: -36.825, lng: -73.048},
                        zoom: 8
                      };
        var map = new maps.Map(document.getElementById('map-canvas'), mapOptions);
    });

    /*
    $scope.map = {
            center: { latitude: -36.825, longitude: -73.048},
            zoom: 8
    };
    */

    $scope.album = {
        id: 1
    };

    $scope.hide_map = true;

    //Photo's data:
    $http.get('/photo/' + $stateParams.pid).
        success(function(photo){
            $scope.photo = photo;
            //$scope.comments = photo.comments;
        });

    $scope.comments = [
        {
            user: {
                id: 1,
                name: 'Julio'
            },
            comment: 'Me gustó la foto'
        },
        {
            user: {
                id: 2,
                name: 'Susana'
            },
            comment: '¡Que linda foto!'
        }
    ];

    $scope.add_comment = function(){
        var modalInstance = $modal.open({
            templateUrl: 'add_comment.tpl',
            controller: 'addCommentController'
        })
        .result.then(function(comment){
            $scope.comments.push({
                user: {
                    id: 1, name: 'juboba'
                },
                comment: comment
            });
        });
    };

    $scope.toggle_map = function(){
        $scope.hide_map = ! $scope.hide_map;
    };

}])

// Add Comment Dialog Controller
.controller('addCommentController', [
        '$scope',
        '$modalInstance',
function($scope, $modalInstance){

    $scope.comment = '';

    $scope.save_comment = function(){
        $modalInstance.close($scope.comment);
    };

    $scope.close = function(){
        $modalInstance.dismiss();
    };
}])

;
