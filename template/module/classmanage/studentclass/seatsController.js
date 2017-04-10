'use strict';

angular.module('app')
    .controller('seatsController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster',
                                    function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster) {
    var stuid = {
        
    };   

    $scope.app_name = "座次查询";                                   
    $scope.curr = 0;

    $scope.type = 2;
    $scope.change = function(s){
                $scope.type = s;
    
    }

    // 翻页
    $scope.pagination = function (obj) {
        
        $scope.param.pageNum=obj.page;
        $scope.schoolteachers_list();
    };




}])
