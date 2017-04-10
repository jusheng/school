'use strict';

angular.module('app')
	.controller('moduledeskController', [ '$rootScope', '$scope', '$timeout','$http', '$state','toaster','Upload','API',
	                                function($rootScope, $scope, $timeout,$http, $state,toaster,Upload,API) {
		
		$scope.title = "【"+$state.params.name + '】 模块桌面配置'; 

		$scope.pid = $state.params.id;
		$scope.name = $state.params.name;
		$scope.roleType = $state.params.roleType;
		$scope.moduleIdentify = $state.params.moduleIdentify;


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
				
			var success = function(result){
				console.log(result);

				if($scope.pid==0){
					$scope.applist = select_lev1(result.data);	
				}else{
					var obj = [{
						"id":$scope.pid,
						"label":$state.params.name,
						"pid":"0",
						"selected":false,
						"state":"open",
						"type":null
					}]
					obj[0].children = result.data;

					$scope.applist = select_lev1(obj);					
				}


				$scope.$apply();		                    
		                    
			}	
			var error = function(){

			}

			if($scope.pid==0){  //我的桌面模块 特殊处理
				// url : '/app/read/treelist',
				// 	data:{'schoolId':$state.params.id,"appType":2}
				API.post("/app/read/treelist",{
					"appType":$scope.roleType
				},success,error)	

			}else{
				API.post("/app/queryTree",{"pid":$scope.pid},success,error);
			}

						
		}

		$scope.get_applist();

		$scope.isexit_children = function(obj){

				for (var i = 0; i < obj.length; i++) {
					if(obj[i].selected){
						return true;
						break;
					}
				}

				return false;
		}

		//配置 
		$scope.authorization = function(){
				var l = angular.element(".student .select_id").length;
				
				var temp = [];
				for (var i = 0; i < l; i++) {
					temp.push(angular.element(".student .select_id")[i].value);
				}

				if(temp.length==0){
					$timeout(function(){
						toaster.clear('*');
		            	toaster.pop('error', '', "至少选择一个应用");
					});
					return false;
				}


				var success = function(){
					toaster.clear('*');
		            toaster.pop('success', '', "保存成功");
				}

				var error = function(){

				}

				API.post("/edu/layoutTemplate/add",{
					"roleType":$scope.roleType,
					"module":$scope.moduleIdentify+"desk",
					"settings":"1:1:1",
					"appids":temp.join()
				},success,error);	

			}

	}])