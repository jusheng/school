'use strict';

angular.module('app')
	.controller('assignroleController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

       
                
        //取得角色
    $scope.get_role = function(){

        var success = function(result){
            console.log(result);
            $scope.role = result.data;
            for (var i = 0; i < $scope.role.length; i++) {
                if($scope.role[i].checked==1){
                    $scope.role[i].checked = true;
                }else{
                    $scope.role[i].checked = false;
                }

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

        API.post("/sys/userrole/read/list",{"userId":$scope.ngDialogData.id},success,error);


    }
    $scope.get_role();

    $scope.submit = function(){
        var temp = [];

        for(var i in $scope.role){

            $scope.role[i].checked && $scope.role[i].checked==true && temp.push($scope.role[i].role.id);

            $scope.role[i].isDefault && $scope.role[i].isDefault==true && ($scope.isDefault = $scope.role[i].role.id);
        }

        if(temp.indexOf($scope.isDefault)<0){
            toaster.pop('error', "", "默认角色不正确");                
            setTimeout(function(){toaster.clear("*");},1000);
            return false;
        }

        $scope.roles = temp.join(",");

        var success = function(result){
            toaster.clear('*');
            toaster.pop('success', '', "保存成功");
            $timeout(function(){
                    $scope.closeThisDialog();
                },1000);
        }
        var error = function(result){
            // toaster.clear('*');
            // toaster.pop('error', '', result.msg);
            if(temp.length==0 ){
            toaster.pop('error', "", "请选择角色名称");
            setTimeout(function(){toaster.clear("*");},1000);
            return false;
            }
            if($scope.role[i].isDefault==false){
            toaster.pop('error', "", "请选择默认角色");
            setTimeout(function(){toaster.clear("*");},1000);
            }

        }

        API.post("/sys/userrole/update",{"userId":$scope.ngDialogData.id,"roles":$scope.roles,"isDefault":$scope.isDefault},success,error);

    }

    $scope.select_t = function(index){
        for (var i = 0; i < $scope.role.length; i++) {
            $scope.role[i].isDefault = false;
        }

        $scope.role[index].isDefault = true;
    }


} ]);