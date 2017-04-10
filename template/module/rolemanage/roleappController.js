'use strict';

angular.module('app')
	.controller('roleappController', ['$rootScope', '$scope', '$timeout', '$http', '$state', 'toaster', 'API',
		function($rootScope, $scope, $timeout, $http, $state, toaster, API) {

			$scope.loading = false;
			$scope.app_name = $state.params.name + " > " + $state.params.role_name + " >应用授权";

			$scope.role_id = $state.params.role_id;
			$scope.role_type = $state.params.role_type;

			$scope.record = {
				// "schoolId":$state.params.school_id,
				"appIds": "",
				"roleId": $state.params.role_id
			};


			$scope.myFilter = function(item) {

				return item.__ivhTreeviewIndeterminate || item.selected;
			}

			var select_lev1 = function(obj) {
				for (var i = 0; i < obj.length; i++) {
					obj[i]["__ivhTreeviewIndeterminate"] = false;
					obj[i].selected = true;



					if (obj[i].children.length == 0) {
						obj[i]["__ivhTreeviewIndeterminate"] = false;
						obj[i].selected = false;
					} else {

						for (var j = 0; j < obj[i].children.length; j++) {

							if (!obj[i].children[j].selected) {
								//console.log(obj[i].children[j]);
								obj[i]["__ivhTreeviewIndeterminate"] = true;
								obj[i].selected = false;

								console.log(j);
								if (j == (obj[i].children.length - 1)) {
									obj[i]["__ivhTreeviewIndeterminate"] = true;
									obj[i].selected = false;
								}

							}

						}
					}

				}

				return obj;
			}

			$scope.get_applist = function() {
				var success = function(result) {
					console.log(result);
					$scope.applist = select_lev1(result.data);
					$scope.$apply();
				}

				var error = function(result) {
					toaster.clear('*');
					toaster.pop('error', '', result.msg);
				}
				API.post('/app/read/treelist', {
					"roleId": $state.params.role_id,
					"roleType": $state.params.role_type
				}, success, error);

			}

			$scope.get_applist();

			$scope.selectCallback = function(a, b, c) {
				/*console.log(a);
				console.log(b);
				console.log(c);
				if(a.pid!='0' && b){
					$scope.record.appId.push(a.id);
				};*/
			}

			$scope.isexit_children = function(obj){

				for (var i = 0; i < obj.length; i++) {
					if(obj[i].selected){
						return true;
						break;
					}
				}

				return false;
			}


			$scope.authorization = function() {
				var l = angular.element(".select_id").length;
				$scope.record.appId = "";
				var temp = [];
				for (var i = 0; i < l; i++) {
					temp.push(angular.element(".select_id")[i].value);
				}

				if (temp.length == 0) {
					return false;
				}

				$scope.record.appIds = temp.join(',');

				var success = function() {
					toaster.clear('*');
					toaster.pop('success', '', "保存成功");
					$timeout(function() {
						$state.go('main.rolemanage.rolelist');

					}, 2000);
				}

				var error = function(result) {
					toaster.clear('*');
					toaster.pop('error', '', result.msg);
				}


				API.post('sys/role/updateRoleApp', $scope.record, success, error);

			}

		}
	]);