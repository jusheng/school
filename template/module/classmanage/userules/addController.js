'use strict';

angular.module('app')
	.controller('addController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {



     $scope.item = $scope.ngDialogData.item;
     $scope.callback = $scope.ngDialogData.callback;
     $scope.userid = $scope.ngDialogData.userid;
    $scope.trues = [];
    $scope.falses = [];

     
        // 获取制度列表
        $scope.getType=function(value){
            var success = function(result){
                $scope.types = result.data;
                for (var i = 0; i < $scope.types.list.length; i++) {
                    if($scope.types.list[i].type == true){
                        $scope.trues.push($scope.types.list[i])
                    }else{
                        $scope.falses.push($scope.types.list[i])
                    }
                }
                $scope.$apply();
                
                console.log($scope.trues);
                console.log($scope.falses);
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post("/classes/rewardOrPunish/read/list",{},success,error);
        
        }
        $scope.getType();
       

        $scope.type1 = true;
        $scope.change = function(m){
            $scope.type1 = m;
        }

        // 提交
        $scope.submit = function(){
            var data={
                "rewardPunishmentId":$scope.s_type,
                "remarks":$scope.remarks,
                "publisherId":$scope.userid,
                "studentId":$scope.item.id,
            };
            if(typeof($scope.s_type) == "undefined"){
                toaster.pop('error', "", "所参照制度不能为空");                
                setTimeout(function(){toaster.clear("*");},1000);
                return false;
            }
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                console.log(data);
                $timeout(function(){
                    $scope.closeThisDialog();
                    $scope.ngDialogData.callback();
                },200);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post('/classes/record/add',data,success,error);

        
       }

} ]);