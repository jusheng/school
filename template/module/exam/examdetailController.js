'use strict';

angular.module('app')
	.controller('examdetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
		$scope.param={};
        $scope.param={"gradeId":$state.params.gradeId};
        $scope.id= $state.params.gradeId;
        $scope.title = "查看详情";

        //获取考试类型
        $scope.getType = function(){
            var success = function(result){
                $scope.eType = result.data;

                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/res/exam/type/read/all',{},success,error);
        }
       $scope.getType();

       //获取科目组
        $scope.getSubjectgroup = function(){
             var success = function (result) {
                    $scope.subjectgroup = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/subjectGroup/read/all', $scope.param, success, error);
        }
       $scope.getSubjectgroup();

         $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data;  
                $scope.$apply(); 
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post("/res/exam/read/detail",{"id":id},success,error);

         }  

            $scope.init($state.params.id);
                

} ])
    