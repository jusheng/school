'use strict';

angular.module('app')
	.controller('messagesendedlistController', [ '$rootScope', '$scope', '$http', '$state','API','toaster','$timeout',
	                                function($rootScope, $scope, $http, $state,API,toaster,$timeout) {
		
	        $scope.title = "已发送邮件";                        	
	        $scope.menu.curr = 2;    



        	$scope.param={ };
        	$scope.loading=false;

        	$scope.s_all = 0;  //全选标记
            $scope.select_all = function(){
            	$scope.s_all = !$scope.s_all;

            	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
            		$scope.pageInfo.list[i].selected = $scope.s_all;
            	}

            };	


            $scope.select_per = function(index){
            	$scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
            }


	        $scope.search=function(){
				$scope.s_all = 0;
				var success = function(result){
					console.log(result);
					$scope.pageInfo = result.data;
					$scope.$apply();
				}

				var error = function(result){
				}
			
				API.post('/edu/message/messageDetaillist',$scope.param,success,error);

			}

			$scope.search();


			// 翻页
		    $scope.pagination = function (obj) {
		    	
		        $scope.param.pageNum=obj.page;
		        $scope.search();
		    };


			//删除操作
			$scope.del = function(id){

				var success = function(result){
						toaster.clear('*');
		            	toaster.pop('success', "", "删除成功");
		            	$timeout(function(){
		            		$scope.search();
		            	},1000);
					}
				var error = function(result){
					toaster.clear('*');
		        	toaster.pop('error', '', result.msg);
				}

				if(id){ //单个删除

					API.post("/edu/message/deleteMessage",{"ids":id},success,error);

				}else{ //批量删除

					var temp = [];
					for (var i = 0; i < $scope.pageInfo.list.length; i++) {
						$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
					}


					temp.length>0 && API.post("/edu/message/deleteMessage",{"ids":temp.join(",")},success,error);
				}


		    }

		  //   $scope.$watch("pageInfo",function(){
		  //   	if(!$scope.pageInfo){
		  //   		return false;
		  //   	}

		  //   	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
		  //   		$scope.get_receive(i,$scope.pageInfo.list[i].id);
		  //   	}


		  //   });


		  //   $scope.get_receive = function(index,id){

		  //   	var success = function(result){
		  //           	$scope.pageInfo.list[index].receiveName = result.data;
		  //           	$scope.$apply();

				// 	}
				// var error = function(result){

				// }


				// API.post("/edu/message/getmessagebyid",{"id":id},success,error);

		  //   }




} ]);