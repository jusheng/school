'use strict';

angular.module('app')
	.controller('detailController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,recordFormat) {
         
	$scope.id = $state.params.id;  
	$scope.classId = $state.params.classId;                                	



	$scope.get_detail = function(id){
		var success = function(result){
                 $scope.record = result.data;
                 $scope.record.pic != "" && ($scope.myCroppedImage = $scope.record.imgUrl);
                 $scope.$apply();
            }
        var error = function(result){

        }

		API.post("/classes/student/read/detail",{"id":id},success,error);
	}

	$scope.get_detail($scope.id);



    $scope.get_nation = function(key){
        
            var success = function(result){
                 $scope.nation = result.data.list;

                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":"NATIONAL"},success,error);
     }  
     $scope.get_nation();

     // 政治面貌
    $scope.get_politics = function(key){
        
            var success = function(result){
                 $scope.politics = result.data.list;

                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":"POLITICS_STATUS"},success,error);
     }  
     $scope.get_politics();

     //性别
    $scope.get_sex = function(key){
        
            var success = function(result){
                 $scope.sexData = result.data.list;

                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":"SEX"},success,error);
     }  
     $scope.get_sex();

}])