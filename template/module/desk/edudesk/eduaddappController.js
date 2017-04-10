'use strict';
angular.module('app')
	.controller('eduaddappController', ['$rootScope', '$scope', '$http', '$state','recordFormat','API',
		function($rootScope, $scope, $http, $state,recordFormat,API) {

			$scope.bb = "添加app到桌面";
			$scope.$parent.myScrollOptions = {
		        snap: false,
		        hScrollbar:true,
		        scrollbars:true,
		        fadeScrollbars:true,
		       /* onScrollEnd: function ()
		        {
		            alert('finshed scrolling');
		        }*/
		    };

			/*$scope.treedata = [{
				id: "1",
				label: "办公OA",
				pid: "0",
				children: [
					{
						id: "5",
						label: "备忘录",
						identify:'my-note',
						type:1,
						pid: "1"
					},
					{
						id: "8",
						label: "教师考勤",
						identify:'my-clock',
						type:1,
						pid: "1"
					}
				]
			}, {
				id: "2",
				label: "校务管理",
				pid: "0",
				children: [
					{
						id: "6",
						label: "课程表",
						identify:'my-course',
						type:1,
						pid: "2"
					},
					{
						id: "1",
						label: "班级管理",
						identify:'my-class',
						type:0,
						pid: "2"
					},

				]
			}];*/


			var filter_app = function(obj,a){
				console.log('只保留edu模块的应用');
				console.log(obj);
				var temp = [];
				for (var i = 0; i < obj.length; i++) {
					if(obj[i].attrs.identify == a){
						temp.push(obj[i]);
					}
				}

				$scope.treedata = temp;

			}

			//应用树
			$scope.get_app_tree = function(){
				var success = function(result){
					console.log(result);

				if(result.data && result.data.length>0){

						//只保留oa模块的应用
					    filter_app(result.data,'edu');

					    //$scope.treedata = result.data;


					    console.log('桌面上已有的应用(桌面型和图标型)：');
					    console.log($scope.$parent.my_all_desk);

						$scope.$parent.my_all_desk.length>0 && $scope.app_select();

					    $scope.$apply();
				}	

			    


				};
				var error = function(result){
					
				}

				API.post('/app/read/roletreelist',{},success,error);
			}

			$scope.get_app_tree();


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


			//在桌面上的所有app （$scope.my_all_desk 来自父作用域）
			/*
				通过在桌面上的所有app 
				确定树结构中app的勾选状态

			 */
			$scope.app_select = function(){

				var id_arr = [];

				for (var i = 0; i < $scope.$parent.my_all_desk.length; i++) {
					id_arr.push($scope.$parent.my_all_desk[i].id);
				};

				console.log('桌面所有app的ID');
				console.log(id_arr);



				for (var i = 0; i < $scope.treedata.length; i++) {
						for (var j = 0; j < $scope.treedata[i].children.length; j++) {

							if(id_arr.indexOf($scope.treedata[i].children[j].id)>-1){
								$scope.treedata[i].children[j].selected=true;
							}

						}
				}

				console.log($scope.treedata);

				$scope.treedata = select_lev1($scope.treedata);

				console.log($scope.treedata);
				$scope.$apply();

			}

			//树的操作
			$scope.selectCallback = function(n,s,t){
				console.log(s);

				recordFormat.format(n,'_');
				console.log(n);
				//recordFormat.format(n.children,'_');

				if(n.pid=="0"){ //点击的模块  同时操作多个app

					for (var i = 0; i < n.children.length; i++) {
							recordFormat.format(n.children[i],'_');
						}

					if(s){	

						//for (var i = 0; i < n.children.length; i++) {
							$scope.add_app_callback(n.children);  //调用作用域函数
						//}
					}else{
						for (var i = 0; i < n.children.length; i++) {
							$scope.del_app(n.children[i].attrs_identify);  
						}
					}
					
				}else{ //点击的app

					if(s){ //添加
						$scope.add_app_callback(n);  //调用作用域函数
					}else{
						$scope.del_app(n.attrs_identify);
					}

				}

			}

	}])