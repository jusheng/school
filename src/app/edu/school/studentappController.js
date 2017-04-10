'use strict';

angular.module('app')
	.controller('studentappController', ['$rootScope', '$scope', '$timeout', '$http', '$state', 'toaster',
		function($rootScope, $scope, $timeout, $http, $state, toaster) {

			$scope.title = "学生应用";

			
			$scope.school_id = $state.params.id;
			console.log($scope.school_id);
			$scope.record = {
				"schoolId":$state.params.id,
				"appIds":""
			};


			$scope.myFilter = function(item){

				return item.__ivhTreeviewIndeterminate || item.selected;
			}
			
			var select_lev1 = function(obj){
				for (var i = 0; i < obj.length; i++) {
					obj[i]["__ivhTreeviewIndeterminate"] = false;
					obj[i].selected = true;


			

					if(obj[i].children.length==0){
						obj[i]["__ivhTreeviewIndeterminate"] = false;
						obj[i].selected = false;
					}else{

						for (var j = 0; j < obj[i].children.length; j++) {

							if(!obj[i].children[j].selected){
								//console.log(obj[i].children[j]);
								obj[i]["__ivhTreeviewIndeterminate"] = true;
								obj[i].selected = false;
								
								console.log(j);
								if(j==(obj[i].children.length-1)){
									obj[i]["__ivhTreeviewIndeterminate"] = true;
									obj[i].selected = false;
								}
								
							}

						}
					}

				}

				return obj;
			}												

			$scope.get_applist = function(){
				var callback = function(result){
					console.log(result);
					if(result.httpCode ==200){//成功
							$scope.applist = select_lev1(result.data);
		                   //$scope.applist = result.data;

		                   $scope.$apply();	                   
		                }else{
		                  	toaster.clear('*');
		                    toaster.pop('error', '', result.msg);
		                }
		            
				};

				$.ajax({
					url : '/app/read/treelist',
					data:{'schoolId':$state.params.id,"appType":1}
				}).then(callback);	
			}

			$scope.get_applist();
			
			$scope.selectCallback = function(a,b,c){
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

			$scope.authorization = function(){
				var l = angular.element(".student .select_id").length;
				$scope.record.appId = "";
				var temp = [];
				for (var i = 0; i < l; i++) {
					temp.push(angular.element(".student .select_id")[i].value);
				}

				if(temp.length==0){
					return false;
				}

				$scope.record.appIds = temp.join(',');
				console.log($scope.record);

				$scope.record.appType = 1;


				var callback = function(result){
					console.log(result);
					if(result.httpCode ==200){//成功
		                  	toaster.clear('*');
		                    toaster.pop('success', '', "保存成功");
		                    $timeout(function(){
		                        $state.go('main.edu.school.list');
		                    },2000);                   
		                }else{
		                  	toaster.clear('*');
		                    toaster.pop('error', '', result.msg);
		                }
		            
				};

				$.ajax({
					url : '/school/updateSchoolApp',
					data:$scope.record
				}).then(callback);	

			}		

		}])