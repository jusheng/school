'use strict';

angular.module('app')
	.controller('activitydetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat) {
        $scope.init=function(){
            var success = function(result){
                      $scope.record = result.data;
                      // if($scope.record.catalogId){
                      // $scope.set_curr($scope.record.catalogId);
                      // console.log($scope.record.catalogId);
                      
                      // }
                

                      if($scope.record.createTime){
        
                      $scope.record.createTime = $scope.record.createTime.split(" ")[0];
        
                      }
                      if($scope.record.starttime){
                      $scope.record.starttime = $scope.record.starttime.split(" ")[0];
                      }
                      if($scope.record.endtime){
                      $scope.record.endtime = $scope.record.endtime.split(" ")[0];
                      }

                $scope.$apply();
                
              }  
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
              }
              
            API.post("/scl/activity/getListById",{"id":$state.params.id},success,error);
       }

       $scope.init();
       
} ]);