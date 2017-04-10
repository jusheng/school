'use strict';

angular.module('app')
	.controller('teachrehomeworkstateshowController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API,recordFormat) {

      $scope.classId = $state.params.classId;
      $scope.id = $state.params.id;

      $scope.title = "查看作业完成情况";                                  
      $scope.get_statedetail = function(id){
            var success = function(result){
                $scope.record = result.data;
                $scope.$apply();
            }   

            var error = function(){

            }

            API.post("/homework/stuhomeworkDetail",{"id":id},success,error);

      }

      $scope.get_statedetail($state.params.id);

   $scope.get_studentObj = function(id){
      var success = function(result){
      
        $scope.record.student = result.data;
        $scope.$apply();
      }

      var error = function(result){
      }
    
      API.post('/student/read/detail',{"id":id},success,error);
    }   


    $scope.$watch("record",function(){
        if(!$scope.record){
            return false;
        }

        $scope.get_studentObj($scope.record.studentId);
    })


	                                	
}])	                                	