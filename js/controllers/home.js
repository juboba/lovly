//Home Controller
angular.module('lovly.controllers')
.controller('homeController', [
        '$scope',
        'breadcrumbs',
function($scope, breadcrumbs){
    $scope.breadcrumbs = breadcrumbs;
}])



//Gallery Controller
.controller('galleryController', [
        '$scope',
        'breadcrumbs',
        '$filter',
function($scope, breadcrumbs, $filter){
    $scope.breadcrumbs = breadcrumbs;

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
}])


//Album Controller
.controller('albumController', [
        '$scope',
        'breadcrumbs',
        '$filter',
        '$routeParams',
function($scope, breadcrumbs, $filter, $routeParams){
    $scope.breadcrumbs = breadcrumbs;

    $scope.polaroid_on = 'polaroid-images';
    $scope.album = {
        id: $routeParams.id
        ,name: 'Vacaciones 2013'
        //,created_on: $filter('date')(new Date(2013, 02, 01))
    };

    $scope.bcrumb = {'Album': $scope.album.name};

    $scope.photos = [
        {
            id: 1,
            file: 'http://localhost/~juboba/lovly/jane-goodall.jpg',
            title: 'Jane Goodall',
            created_on: $filter('date')(new Date(2013, 02, 01))
        },
        {
            id: 2,
            file: 'http://localhost/~juboba/lovly/jane-goodall.jpg',
            created_on: $filter('date')(new Date(2013, 02, 01))
        },
        {
            id: 3,
            file: 'http://localhost/~juboba/lovly/jane-goodall.jpg',
            created_on: $filter('date')(new Date(2013, 02, 01))
        },
        {
            id: 4,
            file: 'http://localhost/~juboba/lovly/jane-goodall.jpg',
            created_on: $filter('date')(new Date(2013, 02, 01))
        },
        {
            id: 5,
            file: 'http://localhost/~juboba/lovly/jane-goodall.jpg',
            created_on: $filter('date')(new Date(2013, 02, 01))
        }
    ];

}])


//Photo Controller
.controller('photoController', [
        '$scope',
        'breadcrumbs',
        '$filter',
        '$routeParams',
function($scope, breadcrumbs, $filter, $routeParams){

    $scope.breadcrumbs = breadcrumbs;

    //Se trae la foto:
    $scope.photo = {
        id: $routeParams.pid,
        file: 'http://localhost/~juboba/lovly/jane-goodall.jpg',
        title: 'Jane Goodall',
        caption: 'una foto de Jane Goodall',
        created_on: $filter('date')(new Date(2013, 02, 01))
    };

    //$scope.bcrumb = {'Photo': $scope.photo.caption};
    console.log(breadcrumbs.get());

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
}])


;
