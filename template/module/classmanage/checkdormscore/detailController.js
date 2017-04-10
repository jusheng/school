'use strict';

angular.module('app')
	.controller('detailController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat) {
          
         console.log($state.params);                             
         $scope.dorm = $state.params.dorm;
        $scope.init=function(){
            var success = function(result){
                $scope.dormBaseScore = result.data.dormBaseScore;
                $scope.record = result.data.dormCheck;
                // alert(1);
                console.log(result);
                $scope.$apply();
                
              }  
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
              }
              
            API.post("/edu/dorm/check/read/detail",{"id":$state.params.id},success,error);
            
        }

        $scope.init();

    console.log($state.params);
    $scope.branch = {};
    $scope.branch = $state.params;
    $scope.param = {};
    if($state.params.classId != 0 ){
        $scope.param.classId = $state.params.classId;
        $scope.params1 = $state.params.classId;
        console.log($scope.params1);
        $scope.set_curr($scope.param.classId);


        // $scope.search();
    }else{
        $scope.$watch("lists",function(){
            if(!$scope.lists){
                // console.log($scope.lists);
                return false;
            }

            // console.log('有值了');
            $scope.param.classId = ($scope.lists.length>0 &&　$scope.lists[0].classId);
            $scope.params1 = $state.params.classId;
            $scope.set_curr($scope.param.classId);
            // $scope.search();
        })
    }


             
       



        $scope.height = function(){
           return angular.element("#ue_lay").height();
        } 


} ]);