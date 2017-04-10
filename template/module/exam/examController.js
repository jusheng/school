'use strict';

angular.module('app')
	.controller('examController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {

    $scope.app_name = "年级考试管理";
    $scope.param = {orderBy:"g.sort_no"};
    $scope.loading=false;

    //请求数据
    $scope.search=function(){

    var success = function(result){
        $scope.classNameList = result.data;
        $scope.$apply();
    }

    var error = function(result){
        toaster.clear('*');
        toaster.pop('error', '', result.msg);
    }
    API.post('/grade/read/all',$scope.param,success,error);

    }
    $scope.search();

    $scope.set_curr = function(t){
        $scope.curr = t
    }

} ]);