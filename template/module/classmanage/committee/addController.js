'use strict';

angular.module('app')
	.controller('addController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {



       
                // 获取班委列表
        $scope.getType=function(value){
            var success = function(result){
                $scope.committee = result.data;
                $scope.$apply();
         
                // console.log($scope.committee);
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post("/dic/read/key",{key:"CLASS_POSITION"},success,error);
        
        }
        $scope.getType();
        $scope.add=function(value){

        }

        // 获取班级学生列表
        $scope.param={
                "classId":$scope.ngDialogData.classId
       };

        $scope.getStudents=function(value){

            var success = function(result){
                    // console.log(result.data);
                    $scope.students = result.data;
                    $scope.$apply();
             
                }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post("/classes/student/read/classStudent",$scope.param,success,error);
        
        }
        $scope.getStudents();

        
        // 提交
        $scope.submit = function(){
            var data={
                "eduClass.id":$scope.ngDialogData.classId,
                "student.id":$scope.s_student,
                "classPosition":$scope.s_committee,
            };
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

            API.post('/classes/cadre/add',data,success,error);

        }

} ]);