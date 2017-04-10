'use strict';

angular.module('app')
  .controller('activityteacherdetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat',
                                  function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat) {
        
        
        $scope.init=function(){
            var success = function(result){
                $scope.record = result.data;
                $scope.catalogId=$scope.record.catalogId;
                // console.log($scope.record);
                $scope.$apply();
                
              }  
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
              }
              
            API.post("/scl/activity/getListById",{"id":$state.params.id},success,error);
       }

       $scope.init();

       // 作品列表
     
     $scope.works_list = function(){
        var success = function(result){
          $scope.pageInfo = result.data;
          $scope.$apply();
          console.log($scope.pageInfo);
        };

        var error = function(){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        } 
        API.post("/scl/classics/getListByParam",{"activityId":$state.params.id},success,error);
     } 
     $scope.works_list();

     // 翻页
      $scope.pagination = function (obj) {
        
          $scope.param.pageNum=obj.page;
          $scope.works_list();
      };
} ]);