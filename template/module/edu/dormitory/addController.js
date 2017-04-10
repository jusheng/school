'use strict';

angular.module('app')
	.controller('addController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {



        // $scope.item = $scope.ngDialogData.item;
        $scope.callback = $scope.ngDialogData.callback;

        $scope.title = "添加宿舍楼";
        $scope.types = [
            {name:'平房',type:'true'},
            {name:'楼房',type:'false'},

        ]

        $scope.houseType = true;
        $scope.change = function(s){
                $scope.houseType = s;
                console.log($scope.houseType);
        }



        // 提交
        $scope.submit = function(){
            console.log($scope.houseFloor);
            if(!$scope.houseFloor){
                $scope.houseFloor = 1;
            }

            var data={
                "houseName":$scope.houseName,
                "houseType":$scope.houseType,
                "houseMaster":$scope.houseMaster,
                "houseFloor":$scope.houseFloor
            };
            console.log(data);
            // if(!$scope.houseName){
            //     toaster.pop('error', "", "宿舍楼名称不能为空");                
            //     setTimeout(function(){toaster.clear("*");},1000);
            //     return false;
            // }else if(!$scope.houseType){
            //     toaster.pop('error', "", "宿舍楼类型不能为空");                
            //     setTimeout(function(){toaster.clear("*");},1000);
            //     return false;
            // }
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $scope.closeThisDialog();
                    $scope.ngDialogData.callback();
                },200);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post('/edu/house/create',data,success,error);

        
       }


       

} ]);