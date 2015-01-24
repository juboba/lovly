angular.module('lovly.controllers')

//Album Controller
.controller('albumController', [
        '$scope',
        '$filter',
        '$stateParams',
        '$modal',
function($scope, $filter, $stateParams, $modal){

    $scope.polaroid_on = 'polaroid-images';

    $scope.album = {
        id: $stateParams.id
        ,name: 'Vacaciones 2013'
        //,created_on: $filter('date')(new Date(2013, 02, 01))
    };

    $scope.config = {};

    $scope.photos = [
        {
            id: 1,
            file: 'jane-goodall.jpg',
            title: 'Jane Goodall',
            created_on: $filter('date')(new Date(2013, 02, 01))
        },
        {
            id: 2,
            file: 'jane-goodall.jpg',
            created_on: $filter('date')(new Date(2013, 02, 01))
        },
        {
            id: 3,
            file: 'jane-goodall.jpg',
            created_on: $filter('date')(new Date(2013, 02, 01))
        },
        {
            id: 4,
            file: 'jane-goodall.jpg',
            created_on: $filter('date')(new Date(2013, 02, 01))
        },
        {
            id: 5,
            file: 'jane-goodall.jpg',
            created_on: $filter('date')(new Date(2013, 02, 01))
        }
    ];

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
