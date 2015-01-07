var lovly = angular.module('lovly', [
        'ui.bootstrap',
        'ngRoute',
        'ng-breadcrumbs',
        'angular.filter',
        'lovly.controllers'
        ]);

lovly.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            label: 'Home',
            icon: 'fa-dashboard',
            templateUrl: 'templates/home.html',
            controller: 'homeController'
        })
        .when('/gallery', {
            label: 'Gallery',
            icon: 'fa-table',
            templateUrl: 'templates/gallery.html',
            controller: 'galleryController'
        })
        .when('/gallery/album/:id', {
            label: 'Album',
            templateUrl: 'templates/album.html',
            controller: 'albumController'
        })
        .when('/gallery/album/:aid/photo/:pid', {
            label: 'Photo',
            templateUrl: 'templates/photo.html',
            controller: 'photoController'
        })
        .otherwise(
            {
                redirectTo: '/home'
            }
            );
}]);
