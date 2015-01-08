angular.module('lovly.controllers')

//Album Controller
.controller('albumController', [
        '$scope',
        '$filter',
        '$stateParams',
function($scope, $filter, $stateParams){

    $scope.polaroid_on = 'polaroid-images';
    $scope.album = {
        id: $stateParams.id
        ,name: 'Vacaciones 2013'
        //,created_on: $filter('date')(new Date(2013, 02, 01))
    };

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

}]);
