'use strict';

angular.module('app')
	.controller('appcenterController', [ '$rootScope', '$scope', '$http', '$state','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state, API, toaster,recordFormat,$timeout) {
			
	        $scope.app_name = "应用中心";
	        $scope.curr = 0;
	        var iconapp_obj = {
							"identify":"my-iconappcontainer",
							"url":"",
							"icon":"icon-th-large",
							"name":"图标应用"
						}
		    $scope.desk_name = 	$state.params.desk_name;			
				


	       	$scope.get_appBymodule = function(module){
	       		var success = function(result) {
					module.children = result.data;
					$scope.$apply();
				}
				var error = function(result) {
					// toaster.clear('*');
					// toaster.pop('error', '', result.msg);
				}

				API.post("/user/getUserRoleApp",{"pid":module.id},success,error);
	       	}
	        

	        $scope.select_curr = function(t,module){
	        	console.log(module);
	        	$scope.curr = t;

	        	if(module!=0 && module !=undefined && !module.children){  //取得相应模块下的应用
	        		$scope.get_appBymodule(module);
	        	}
	        }

	        $scope.myFilter = function(item){
	        	return $parent.item.id == item.pid;
	        }


	        //取得模块
	        $scope.get_appmodule = function(){
	        	var success = function(result) {

					$scope.appmodule = result.data;
					
					var t = 0;
					for (var i = 0; i < $scope.appmodule.length; i++) {
					
						if($scope.appmodule[i].identify+'desk' == $scope.desk_name){

							t = i+1;
							break;
						}
					}

					$scope.select_curr(t,$scope.appmodule[t-1]);

					$scope.$apply();
					
				}
				var error = function(result) {
					// toaster.clear('*');
					// toaster.pop('error', '', result.msg);
				}
				API.post('/user/getRoleTopApp', {}, success, error);
	        };
	        $scope.get_appmodule();


	        //取得全部app
	        $scope.get_all_app = function(){
	        	var success = function(result) {
					$scope.all_app = result.data;
					$scope.$apply();
					
				}
				var error = function(result) {
					toaster.clear('*');
					toaster.pop('error', '', result.msg);
				}
				API.post('/user/getUserRoleApp', {}, success, error);
	        }
	        $scope.get_all_app();
	        

		    // 添加到桌面通用方法
		   $scope.add_desk_p = function(obj,sign){
		   		
		   		var save_desk = function(module,obj_settings,obj_desk,sign,obj){

		   			var success = function(result){
						console.log(result);
						toaster.clear("*");
						toaster.pop('success', "", "添加成功！");
						
						if(sign==""){
							obj.deskFlag = 1;
						}else{
							obj.moduleFlag = 1;
						}

						$scope.$apply();
					};

					var error = function(){

					}	

					//$scope.save_config();

					var data = {
						"module":module,
						"settings":obj_settings,
						"desktop":JSON.stringify(obj_desk)
						//"desktop":''
					}


					API.post('/user/saveDesktop',data,success,error);
		   		}	


		   		//最小值 所在的位置
		   		Array.prototype.min_index = function(){
		   			var min = Math.min.apply(null,this);
		   			var index = 0;
		   			for (var i = 0; i < this.length; i++) {
		   				if(min==this[i]){
		   					index = i;
		   					break;
		   				}
		   			}

		   			return index;
		   		}

		   		var success = function(result){
		   			console.log(result);

		   			if(!result.data){  
		   				var desk = [
								{
									"appL":[iconapp_obj],
									"appM":[],
									"appR":[]
								},
								[]
						];
						var desksettings = "1:1:1";

		   			}else{
		   			    var desk = JSON.parse(result.data.desktop);
		   				var desksettings = result.data.settings;
		   				
		   			}

						if(obj.type==0){ //图标应用
				   			desk[1].unshift(obj);
				   		}else{
				   			//desk[0].appL.unshift(obj);


				   			//放到数量最小的列中
				   			var lay_obj =  [desk[0].appL,desk[0].appM,desk[0].appR];
				   			var len_arr =  [desk[0].appL.length,desk[0].appM.length,desk[0].appR.length];
				   			lay_obj[len_arr.min_index()].unshift(obj);
				   		}



		   			save_desk(sign+'desk',desksettings,desk,sign,obj);

					$scope.$apply();
		   		}
		   		var error = function(){

		   		}


		   		API.post('/user/getDesktop',{'module':sign+'desk'},success,error);


		   }

		   //从桌面删除通用方法
		   $scope.del_desk_p = function(obj,sign){
		   		
		   		var save_desk = function(module,obj_settings,obj_desk,sign,obj){

		   			var success = function(result){
						console.log(result);
						toaster.clear("*");
						toaster.pop('success', "", "删除成功！");
						
						if(sign==""){
							obj.deskFlag = 0;
						}else{
							obj.moduleFlag = 0;
						}

						$scope.$apply();
					};

					var error = function(){

					}	

					//$scope.save_config();

					var data = {
						"module":module,
						"settings":obj_settings,
						"desktop":JSON.stringify(obj_desk)
						//"desktop":''
					}


					API.post('/user/saveDesktop',data,success,error);
		   		}


		   		var success = function(result){
		   			console.log(result);

		   			if(!result.data){  
		   				var desk = [
								{
									"appL":[],
									"appM":[],
									"appR":[]
								},
								[]
						];
						var desksettings = "1:1:1";

		   			}else{
		   			    var desk = JSON.parse(result.data.desktop);
		   				var desksettings = result.data.settings;
		   			}


   					if(obj.type==0){ //图标应用
   			   			//obj_desk[1].unshift(obj);

   			   			for(var i in desk[1]){
   			   				if(desk[1][i].id==obj.id){
   			   					desk[1].splice(i,1);
   			   					break;
   			   				}
   			   			}

   			   		}else{
   						
   						//desk[0].appL.unshift(obj);

   			   			for(var i in desk[0].appL){
   			   				if(desk[0].appL[i].id==obj.id){
   			   					desk[0].appL.splice(i,1);
   			   					break;
   			   				}
   			   			}

   			   			for(var i in desk[0].appM){
   			   				if(desk[0].appM[i].id==obj.id){
   			   					desk[0].appM.splice(i,1);
   			   					break;
   			   				}
   			   			}

   			   			for(var i in desk[0].appR){
   			   				if(desk[0].appR[i].id==obj.id){
   			   					desk[0].appR.splice(i,1);
   			   					break;
   			   				}
   			   			}
   			   			
   			   		}


		   			save_desk(sign+'desk',desksettings,desk,sign,obj);

					$scope.$apply();
		   		}
		   		var error = function(){

		   		}


		   		API.post('/user/getDesktop',{'module':sign+'desk'},success,error);

		   }


} ]);