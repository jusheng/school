'use strict';

angular.module('app')
	.controller('studenthomeworkdetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

	 $scope.app_name = "课后作业";

	 $scope.record={
	 	"id":$state.params.hid
	 };
	 
	 $scope.get_detail = function(id){
	 	var success = function(result){
		
			$scope.detail = result.data;
			//$scope.detail.endDate = $state.params.endDate;
			//$scope.record.id = $scope.detail.id;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/homework/stuhomeworkDetail',{"id":id},success,error);
	 }  
	 $scope.get_detail($state.params.hid);


	 // 附件上传
	 $scope.onFileSelect = function(files){
	        	console.log(files.length);

	        	angular.forEach(files,function(file){
	        		file.upload = Upload.upload({
	        			"url":"/upload/file",
	        			"data":{file:file},
	        			"headers":{'Content-Type':'multipart/form-data'}
	        		});

	        		file.upload.then(function(response){
	        			console.log(response);

	        			$scope.record.pic = response.data.data[0].id;
	        			$scope.record.imgUrl = response.data.data[0].imgUrl;

	        		})

	        	})
	        	
	      };

	$scope.submit = function(){
		
		var success = function(result){
		
			toaster.clear('*');
   			toaster.pop('success', '', '操作成功！');
   			$timeout(function(){
   				$state.go("main.studenthomework.list");
   			},500);
		}

		var error = function(result){
		}
	
		API.post('/homework/submit',$scope.record,success,error);
	}      


}])	                                	