angular.module('lovly.controllers')

//Photo Controller
.controller('photoController', [
        '$scope',
        '$filter',
        '$stateParams',
        '$modal',
function($scope, $filter, $stateParams, $modal){

    $scope.album = {
        id: 1
    };

    //Se trae la foto:
    $scope.photo = {
        id: $stateParams.pid,
        file: 'http://localhost/~juboba/lovly/jane-goodall.jpg',
        title: 'Jane Goodall',
        caption: 'una foto de Jane Goodall',
        created_on: $filter('date')(new Date(2013, 02, 01))
    };

    //$scope.bcrumb = {'Photo': $scope.photo.caption};

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

    $scope.open = function(){
        var modalInstance = $modal.open({
            templateUrl: 'add_comment.html',
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
    }
}])

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
}]);