'use strict';

angular.module('app')
	.controller('addController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {



     $scope.ids = $scope.ngDialogData.ids;
     $scope.callback = $scope.ngDialogData.callback;
     $scope.classId = $scope.ngDialogData.classId;


     $scope.idArray = [];
     $scope.idArray = $scope.ids.split(",");
        // 获取班级所有学生列表
    $scope.search = function(){

        var success = function(result){
            $scope.pageInfo = result.data;
            console.log($scope.pageInfo);
            $scope.$apply();
        }
        var error = function(){

        }

        API.post("/classes/student/read/classStudent/page",$scope.classId,success,error);
    }
       

} ]);