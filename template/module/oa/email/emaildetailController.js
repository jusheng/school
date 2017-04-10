'use strict';

angular.module('app')
	.controller('emaildetailController', [ '$rootScope', '$scope', '$http', '$state','API','toaster',
	                                function($rootScope, $scope, $http, $state,API,toaster) {
		
	        $scope.title = ""; 
	        $scope.eid = $state.params.eid;
	        $scope.id = $state.params.id;
	    	console.log($scope.eid);


	    	// 标记为已读
	        $scope.set_readed = function(id){

	        	var success = function(result){
					/*	toaster.clear('*');
		            	toaster.pop('success', "", "操作成功");
		            	$timeout(function(){
		            		$scope.search();
		            	},1000);*/
					}
				var error = function(result){
					/*toaster.clear('*');
		        	toaster.pop('error', '', result.msg);*/
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

	        $scope.set_readed($scope.id);

	        

	        $scope.get_detail = function(id){

	        	var success = function(result){
	        		$scope.record = result.data;
	        		$scope.$apply();
	        	};

	        	var error = function(result){
	        		//alert(result);
	        	};

	        	API.post("/oa/mail/getMailInboxByPk",{"oaMailInboxId":id},success,error);
	        }

	        $scope.get_detail($scope.eid);


	        



	           	

} ]);