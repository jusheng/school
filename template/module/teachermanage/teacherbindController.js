'use strict';

angular.module('app')
	.controller('teacherbindController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

        //取得列表
    $scope.get_role = function(){
        var success = function(result){
            $scope.role = result.data;
            for (var i = 0; i < $scope.role.length; i++) {

                if($scope.role[i].isDefault==1){
                    $scope.role[i].isDefault = true;
                }else{
                    $scope.role[i].isDefault = false;
                }
            }
            $scope.$apply();
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        
           API.post("/user/read/selectTeacherUnbindUser",{"userId":$scope.ngDialogData.id},success,error); 
       
        
    }
    $scope.get_role();

    $scope.submit = function(){

        for(var i in $scope.role){

            $scope.role[i].isDefault && $scope.role[i].isDefault==true && ($scope.isDefault = $scope.role[i].id);
        }

        var success = function(result){
            toaster.clear('*');
            toaster.pop('success', '', "保存成功");
            $timeout(function(){
                    $scope.closeThisDialog();
                    location.reload();
                },1000);

        }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

        API.post("/user/update/boundData",{"eduUserId":$scope.isDefault,"targetId":$scope.ngDialogData.id},success,error);

    }

    $scope.select_t = function(index){
        for (var i = 0; i < $scope.role.length; i++) {
            $scope.role[i].isDefault = false;
        }

        $scope.role[index].isDefault = true;
    }


} ]);