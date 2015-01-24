//Navigation Controller
angular.module('lovly.controllers', [])
.controller('navController', [
        '$scope',
        '$state',
function($scope, $state){
    $scope.isActive = function(state){
        return $state.current.name == state;
    }
}]);

