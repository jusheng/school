'use strict';

angular.module('app')
	.controller('messagedetailController', [ '$rootScope', '$scope', '$http', '$state','API','toaster','$timeout',
	                                function($rootScope, $scope, $http, $state,API,toaster,$timeout) {
		
	        $scope.title = ""; 
	        $scope.id = $state.params.id;

	    	$scope.menu.curr = 2;  
	        

	        $scope.get_detail = function(id){

	        	var success = function(result){
	        		$scope.record = result.data;
	        		$scope.$apply();
	        	};

	        	var error = function(result){
	        		//alert(result);
	        	};

	        	API.post("/edu/message/read/detail",{"id":$scope.id},success,error);
	        }

	        $scope.get_detail();


	        //删除操作
			$scope.del = function(id){

				var success = function(result){
						toaster.clear('*');
		            	toaster.pop('success', "", "删除成功");
		            	$timeout(function(){
		            		$state.go('main.email.sended');
		            	},1000);
					}
				var error = function(result){
					toaster.clear('*');
		        	toaster.pop('error', '', result.msg);
				}

				if(id){ //单个删除

					API.post("/oa/mail/deleteOaMailSendByPks",{"oaMailSendIds":id},success,error);

				}else{ //批量删除

					var temp = [];
					for (var i = 0; i < $scope.pageInfo.list.length; i++) {
						$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
					}


					temp.length>0 && API.post("/oa/mail/deleteOaMailSendByPks",{"oaMailSendIds":temp.join(",")},success,error);
				}


		    }



	           	

} ]);