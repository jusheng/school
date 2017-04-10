'use strict';

angular.module('app')
	.controller('noticedetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

        //取得详情
    $scope.get_detail = function(){

        var success = function(result){
            console.log(result);
            $scope.record = result.data;
            console.log($scope.record);
            $scope.$apply();
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

        API.post("/scl/affiche/read/detail",{"id":$scope.ngDialogData.id},success,error);
        
    }

    $scope.get_detail();

} ]);