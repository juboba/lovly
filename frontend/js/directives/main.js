angular.module('lovly')
.directive('appName', function(){
    return {
        restrict: 'E',
        template: 'lovly'
    }
})
.directive('appDescription', function(){
    return {
        restrict: 'E',
        template: 'Photo Sharing Service'
    }
})
.directive('breadcrumbs', function(){
    return{
        restrict: 'E',
        templateUrl: 'templates/breadcrumbs.html',
    }
});
;
