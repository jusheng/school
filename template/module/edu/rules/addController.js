'use strict';

angular.module('app')
	.controller('addController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {


        

        $scope.init = function(id){
            var success=function(result){
                $scope.record = result.data;
                console.log(result);
                $scope.baseScore = $scope.record.list[0].baseData;
                $scope.id = $scope.record.list[0].id;

                $scope.$apply();
                if($scope.id){
                    $scope.title = "修改基础分";
                    }else{
                    $scope.title = "添加基础分";
                    $scope.record = {};
                }
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post("/classes/base/read/list",{},success,error);
        }
        $scope.init();
        $scope.init1 = function(id){
            var success=function(result){
                $scope.record = result.data;
                console.log(result);
                
                $scope.dormBaseScore = $scope.record.list[0].baseScore;
                $scope.id = $scope.record.list[0].id;

                $scope.$apply();
                if($scope.id){
                    $scope.title = "修改基础分";
                    }else{
                    $scope.title = "添加基础分";
                    $scope.record = {};
                }
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post("/edu/dorm/base/read/list",{},success,error);
        }

        $scope.init1();

        // 班级基础分提交
        $scope.submit = function(){
            var num0={
                "baseData":$scope.baseScore
            };
            if(!$scope.baseScore){
                toaster.pop('error', "", "基础分数不能为空");                
                setTimeout(function(){toaster.clear("*");},1000);
                return false;
            }
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $scope.closeThisDialog();
                    // $scope.ngDialogData.callback();
                },200);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            if($scope.id){

                API.post('/classes/base/update',num0,success,error);

            }else{
                API.post('/classes/base/add',num0,success,error);
            }
        }

            // 宿舍基础分添加修改
        $scope.submit1 = function(){
            var num1={
                "baseScore":$scope.dormBaseScore
            };
            if(!$scope.dormBaseScore){
                toaster.pop('error', "", "基础分数不能为空");                
                setTimeout(function(){toaster.clear("*");},1000);
                return false;
            }
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $scope.closeThisDialog();
                    // $scope.ngDialogData.callback();
                },200);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            if($scope.id){

                API.post('/edu/dorm/base/update',num1,success,error);

            }else{
                API.post('/edu/dorm/base/add',num1,success,error);
            }


        
       }

} ]);