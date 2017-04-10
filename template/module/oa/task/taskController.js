'use strict';

angular.module('app')
	.controller('taskController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API','toaster',
		function($rootScope, $scope, $http, $state, Upload, ngDialog, API,toaster) {

			$scope.app_name = "我的任务";


		/*	$scope.getList = function() {
				var success = function(result) {
					$scope.class_list = result.data;
					// console.log(result);
					$scope.$apply();
				}
				var error = function(result) {
					toaster.clear('*');
					toaster.pop('error', '', result.msg);
				}
				API.post('/oa/plan/read/PlanTypeList', {}, success, error);
			}
		   $scope.getList();*/


		}
	]);