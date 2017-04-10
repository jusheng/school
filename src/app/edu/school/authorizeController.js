'use strict';

angular.module('app')
	.controller('authorizeController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','API','ngDialog',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,API,ngDialog) {
	$scope.title = "教材授权管理" + " ("+$state.params.name+")";

	$scope.loading = false;
        $scope.param = {
        	"schoolId":$state.params.id
        };
		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/res/textbook/schoolTextbooklist',
				data: $scope.param
			}).then(function(result) {
				console.log(result);
		        $scope.loading = false;
				if (result.httpCode == 200) {
					$scope.pageInfo = result.data;
				} else {
					$scope.msg = result.msg;
				}
				$scope.$apply();
			});
		}
		
		$scope.search();
		
		$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
		}
		
	
		
		// 翻页
        $scope.pagination = function (obj) {
            $scope.param.pageNum=obj.page;
            $scope.search();
        };


        



        $scope.select_textbook = function(){
        	ngDialog.open({
        	    template:'src/app/edu/school/textbook.html',
        	    controller: 'textbookController',
        	    className: 'ngdialog-theme-green',
        	    scope:$scope,
        	    resolve: {
        	             deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
        	                return uiLoad.load('src/app/edu/school/textbookController.js').then(function(){
        	                    return $ocLazyLoad.load(['toaster','ng-iscroll']);
        	                });
        	         }]}
        	}) 

        }


        $scope.bind = function(id,obj){

        	var success = function(){
        		toaster.clear('*');
	            toaster.pop('success', '', "授权成功");
	            obj.s = 1;
	            $scope.$apply();
	            $scope.search();
        	}

        	var error = function(){

        	}

        	API.post("/res/textbook/bindSchoolTextbook",{"textbook.id":id,"schoolId":$state.params.id},success,error);
        }

        $scope.unbind = function(id){

        	var success = function(){
        		toaster.clear('*');
	            toaster.pop('success', '', "操作成功");
	            $scope.search();
        	}

        	var error = function(){

        	}

        	API.post("/res/textbook/unbindSchoolTextbook",{"id":id},success,error);
        }


}])