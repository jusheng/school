'use strict';

angular.module('app')
	.controller('emaillistController', [ '$rootScope', '$scope', '$http', '$state','API','toaster','$timeout','ngDialog',
	                                function($rootScope, $scope, $http, $state,API,toaster,$timeout,ngDialog) {
		
	        $scope.title = "";                        	
	        $scope.menu.curr = 1;


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
					/*toaster.clear('*');
		            toaster.pop('error', '', result.msg);*/
				}
			
				API.post('/oa/mail/listOaMailInbox?empStatus=1',$scope.param,success,error);

			}

			$scope.search();

			// 翻页
		    $scope.pagination = function (obj) {
		    	
		        $scope.param.pageNum=obj.page;
		        $scope.search();
		    };

		    
		    $scope.do_del = function(id){
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

					//if(id){ //单个删除

						API.post("/oa/mail/deleteOaMailInboxByPks",{"mailempIds":id},success,error);

					// }else{ //批量删除

					// 	var temp = [];
					// 	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
					// 		$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
					// 	}

					// 	temp.length>0 && API.post("/oa/mail/deleteOaMailInboxByPks",{"mailempIds":temp.join(",")},success,error);
					// }
		    }


		    //删除操作
			$scope.del = function(id){

				// var success = function(result){
				// 		toaster.clear('*');
		  //           	toaster.pop('success', "", "删除成功");
		  //           	$timeout(function(){
		  //           		$scope.search();
		  //           	},1000);
				// 	}
				// var error = function(result){
				// 	toaster.clear('*');
		  //       	toaster.pop('error', '', result.msg);
				// }

				// if(id){ //单个删除

				// 	API.post("/oa/mail/deleteOaMailInboxByPks",{"mailempIds":id},success,error);

				// }else{ //批量删除

				// 	var temp = [];
				// 	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				// 		$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
				// 	}

				// 	temp.length>0 && API.post("/oa/mail/deleteOaMailInboxByPks",{"mailempIds":temp.join(",")},success,error);
				// }
				// 
				
				if(id){
					var id = id;
				}else{
					var temp = [];
					for (var i = 0; i < $scope.pageInfo.list.length; i++) {
						$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
					}
					var id = temp.join(",");
				}

				if(id.length==0){
					return false;
				}


				ngDialog.open({
					template:'template/module/tpl/confirm.html',
					controller: 'confirmController',
					className: 'ngdialog-theme-primary',
					data:{
						"id":id,
						"callback":$scope.do_del
					},
					resolve: {
	   	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
	   	                     	return uiLoad.load('template/module/tpl/confirmController.js').then(function(){
	   	                     		return $ocLazyLoad.load('toaster');
	   	                     	});
	   	                 }]}
				})



		    }



		    // 标记为已读
	        $scope.set_readed = function(id){

	        	var success = function(result){
						toaster.clear('*');
		            	toaster.pop('success', "", "操作成功");
		            	$timeout(function(){
		            		$scope.search();
		            	},1000);
					}
				var error = function(result){
					toaster.clear('*');
		        	toaster.pop('error', '', result.msg);
				}

				if(id){ //单个删除

					API.post("/oa/mail/setMailinboxIsread",{"mailEmpIds":id},success,error);

				}else{ //批量删除

					var temp = [];
					for (var i = 0; i < $scope.pageInfo.list.length; i++) {
						$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
					}


					temp.length>0 && API.post("/oa/mail/setMailinboxIsread",{"mailEmpIds":temp.join(",")},success,error);
				}
	        };


	        /*$scope.set_unread = function(){

	        };

	        $scope.remove_trash = function(){
	        	
	        }

	        $scope.del = function(){

	        }*/



	        //收件箱星标邮件
	        $scope.set_star = function(id,iscollection){

	        	var iscollection = iscollection == 1?0:1;
	        	var success = function(result){
	        			toaster.clear('*');

	        			if(iscollection){
	        				toaster.pop('success', "", "成功添加星标邮件");
	        			}else{
	        				toaster.pop('success', "", "成功取消星标邮件！");
	        			}
		            	


		            	$timeout(function(){
		            		$scope.search();
		            	},1000);
	        	};

	        	var error = function(result){
					toaster.clear('*');
		        	toaster.pop('error', '', result.msg);
				}

	        	

	        	API.post("/oa/mail/setMailIsCollection",{"mailType":1,"id":id,"collectionType":iscollection},success,error);

	        }


} ]);