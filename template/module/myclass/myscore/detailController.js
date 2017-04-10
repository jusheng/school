'use strict';

angular.module('app')
    .controller('detailController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster',
                                    function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster) {  

    $scope.app_name = "奖惩查询"; 
    console.log($scope.app_name);                                  
    $scope.search = function(){

        var success = function(result){
            $scope.pageInfo = result.data;
            console.log($scope.pageInfo);
            $scope.$apply();
        }
        var error = function(){

        }

        API.post("/classes/record/read/detail",{},success,error);
    }
    $scope.search();

    // tab
    $scope.type = 1;
    $scope.change = function(s){
                $scope.type = s;
    
    }
    // 翻页
    $scope.pagination = function (obj) {
        
        $scope.param.pageNum=obj.page;
        $scope.schoolteachers_list();
    };




}])
