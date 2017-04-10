'use strict';

angular.module('app')
    .controller('mydormitoryController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
                                    function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat,$compile) {


    $scope.app_name = "我的宿舍"; 
    console.log($scope.app_name);                                  
    $scope.search = function(){

        var success = function(result){
            $scope.pageInfo = result.data;
            console.log($scope.pageInfo);
            $scope.dorm = $scope.pageInfo.shift();
            console.log($scope.dorm);
            $scope.$apply();
        }
        var error = function(){

        }

        API.post("/edu/dorm/read/getDormInfoByStudent",{},success,error);
    }
    $scope.search();

    // 翻页
    $scope.pagination = function (obj) {
        
        $scope.param.pageNum=obj.page;
        $scope.schoolteachers_list();
    };
   


   

} ]);

