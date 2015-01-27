//Navigation Controller
angular.module('lovly.controllers', [])
.controller('navController', [
        '$scope',
        '$state',
        '$rootScope',
function($scope, $state, $rootScope){
    $rootScope.SERVER_URL = 'localhost:8000';

    $scope.isActive = function(state){
        return $state.current.name == state;
    }
}]);

