var lovly = angular.module('lovly', [
        'ui.bootstrap',
        'ui.router',
        'ncy-angular-breadcrumb',
        'angular.filter',
        'uiGmapgoogle-maps',
        'angularFileUpload',
        'lovly.controllers'
        ]);

lovly.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'homeController',
            ncyBreadcrumb: {
                label: 'Home',
                icon: 'fa-dashboard',
            }
        })
        .state('gallery', {
            url: '/gallery',
            templateUrl: 'templates/gallery.html',
            controller: 'galleryController',
            ncyBreadcrumb: {
                label: 'Gallery',
                icon: 'fa-table',
            }
        })
        .state('album', {
            url: '/album/{id:int}',
            templateUrl: 'templates/album.html',
            controller: 'albumController',
            ncyBreadcrumb: {
                label: '{{album.name}}',
                icon: 'fa-table',
                parent: 'gallery'
            }
        })
        .state('photo', {
            url: '/photo/{pid:int}',
            templateUrl: 'templates/photo.html',
            controller: 'photoController',
            ncyBreadcrumb: {
                label: '{{photo.caption}}',
                icon: 'fa-table',
                parent: function($scope){
                    return 'album({id: ' + $scope.album.id + '})';
                }
            }
        })
        ;
}])
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCUe6RCy9JqKikd9xzl6mpI7Il39M0gMSE',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})
;
