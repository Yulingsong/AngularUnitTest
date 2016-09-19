/**
 * Created by apple on 16/9/19.
 */

var appControllers = angular.module('app', []);
appControllers.controller('indexCtrl',['$scope','$http',function($scope,$http) {

    //简单加减方法
    $scope.add = function (a, b) {
        if(a && b)
            return Number(a) + Number(b)
        return 0;
    };
    $scope.detect = function (a, b) {
        if(a && b)
            return Number(a) - Number(b)
        return 0;
    };
    $scope.pr = function () {
        console.log('Function pr');
    };

    //常规变量
    $scope.aaa = 1;
    $scope.testText = 'Hello Jsamine And Karma';

    //
    $http.get('users.json').success(function(data){
        $scope.users = data;
    }).error(function (error) {
        $scope.users = error;
    });

    //获取网络数据,制造伪后台
    $http.post('api/000').success(function(data){
        $scope.userInfo = data;
    }).error(function (error) {
        $scope.userInfo = error;
    });

}]);
