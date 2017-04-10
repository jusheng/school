'use strict';

angular.module('app')
	.controller('moduleController', [ '$rootScope', '$scope', '$timeout','$http', '$state','toaster','Upload',
	                                function($rootScope, $scope, $timeout,$http, $state,toaster,Upload) {
		$scope.loading = false;
		$scope.title = "应用模块添加";
		$scope.record = {};

		$scope.init = function(id){

			var callback = function(result){
					console.log(result);
					if(result.httpCode ==200){//成功
		                   $scope.record = result.data;	                  
		                   $scope.$apply();	                   
		                }else{
		                  	toaster.clear('*');
		                    toaster.pop('error', '', result.msg);
		                }
		            
				};

				$.ajax({
					url : '/app/read/detail',
					data: {"id":id}
				}).then(callback);

		};

		if($state.params.id){  //编辑
		   $scope.init($state.params.id);
		   $scope.title = "应用模块编辑";	
		}else{
			$scope.record.pid = 0;
		}

		//授权对象
	    $scope.appType = [
	    		{
	    			"id":1,
	    			"name":"学生应用"
	    		},
	    		{
	    			"id":2,
	    			"name":"老师应用"
	    		}
	    ]	


		$scope.submit = function(){
			console.log('提交');	
        	console.log($scope.record);


        	var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功

						toaster.clear('*');
	                    toaster.pop('success', '', "保存成功");
	                    $timeout(function(){
	                        $state.go('main.app.appmanage.list');
	                    },2000);

	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};





			delete $scope.record.updateTime;
			delete $scope.record.createTime;


			



			$.ajax({
				url : $state.params.id?'/app/update':'/app/add',
				data: $scope.record
			}).then(callback);

		}

		$scope.onFileSelect1 = function(files){
	        	console.log(files.length);

	        	angular.forEach(files,function(file){
	        		file.upload = Upload.upload({
	        			"url":"/upload/file",
	        			"data":{file:file},
	        			"headers":{'Content-Type':'multipart/form-data'}
	        		});

	        		file.upload.then(function(response){
	        			console.log(response);

	        			$scope.record.picApp = response.data.data[0].id;
	        			$scope.record.imgUrlApp = response.data.data[0].imgUrl;

	        		})

	        	})
	        	
	      };

		//表单验证
        function validate(){
            jQuery('form').validate({
                rules: {
                	name: {
                        required: true
                    },
                    identify: {
                        required: true
                    },
                    apptype: {
                        required: true
                    },
                    icon: {
                        required: true
                    },
                    url: {
                        required: true
                    },
                    remark: {
                        required: true
                    }
                },
                messages: {
                	name: {
                        required: '请填写模块名称'
                    },
                    identify: {
                        required: '请填写模块标识'
                    },
                    apptype: {
                        required: '请选择授权对象'
                    },
                    icon: {
                        required: '请填写图标'
                    },
                    url: {
                        required: '请填写url'
                    },
                    remark: {
                        required: '请添写模块简介'
                    }

                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }


        validate();



	}]);