angular.module('lovly.controllers')

//Gallery Controller
.controller('galleryController', [
        '$scope',
        '$filter',
function($scope, $filter){
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
}]);
