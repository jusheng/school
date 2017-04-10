'use strict';

angular.module('app')
	.controller('appController', ['$rootScope', '$scope', '$timeout', '$http', '$state', 'toaster',
		function($rootScope, $scope, $timeout, $http, $state, toaster) {
			$scope.loading = false;
			$scope.title = $state.params.name +" > "+ $state.params.role_name + " >应用授权";

			$scope.school_id = $state.params.school_id;
			$scope.role_id = $state.params.role_id;


            $scope.role_type = $state.params.role_type;


			$scope.record = {
				"schoolId":$state.params.school_id,
				"appIds":"",
				"roleId":$state.params.role_id,
				"roleType":$state.params.role_type
			};


			$scope.myFilter = function(item){

				return item.__ivhTreeviewIndeterminate || item.selected;
			}

			/*var select_lev1 = function(obj){
				for (var i = 0; i < obj.length; i++) {
					obj[i]["__ivhTreeviewIndeterminate"] = true;
					obj[i].selected = true;


					var flag = true;

					if(obj[i].children.length==0){
						obj[i]["__ivhTreeviewIndeterminate"] = false;
						obj[i].selected = false;
					}else{
						for (var j = 0; j < obj[i].children.length; j++) {

							if(!obj[i].children[j].selected){
								flag = false;
								obj[i]["__ivhTreeviewIndeterminate"] = true;
								obj[i].selected = false;
								
								console.log(j);
								if(j==(obj[i].children.length-1)){
									obj[i]["__ivhTreeviewIndeterminate"] = false;
									obj[i].selected = false;
								}
								
								//break;
							}

						}
					}

				}

				return obj;
			}*/

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
		                   $scope.$apply();	                   
		                }else{
		                  	toaster.clear('*');
		                    toaster.pop('error', '', result.msg);
		                }
		            
				};

				$.ajax({
					url : '/app/read/schoolAppTree',
					data:{'schoolId':$state.params.school_id,"roleId":$state.params.role_id,"roleType":$state.params.role_type}
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
				var l = angular.element(".select_id").length;
				$scope.record.appId = "";
				var temp = [];
				for (var i = 0; i < l; i++) {
					temp.push(angular.element(".select_id")[i].value);
				}

				if(temp.length==0){
					return false;
				}

				$scope.record.appIds = temp.join(',');
				console.log($scope.record);




				var callback = function(result){
					console.log(result);
					if(result.httpCode ==200){//成功
		                  	toaster.clear('*');
		                    toaster.pop('success', '', "保存成功");
		                    $timeout(function(){
		                        $state.go('main.edu.role.rolelist',{"school_id":$state.params.school_id,"name":$state.params.name});
		                        
		                    },2000);                   
		                }else{
		                  	toaster.clear('*');
		                    toaster.pop('error', '', result.msg);
		                }
		            
				};

				$.ajax({
					url : '/edu/updateRoleApp',  //给学校角色授权app
					data:$scope.record
				}).then(callback);	

			}		

		}]);