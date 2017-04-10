'use strict';

angular.module('app')
	.controller('textbookController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','Upload',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,Upload) {
	$scope.title = "教材添加";

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
				url : '/res/textbook/read/detail',
				data: {"id":id}
			}).then(callback);

	};

	if($state.params.id){  //编辑
	   $scope.init($state.params.id);
	   $scope.title = "教材编辑";	
	}

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
	        			if(!$scope.record){
	        				$scope.record = {};
	        			}

	        			$scope.record.pic = response.data.data[0].id;
	        			$scope.record.imgUrl = response.data.data[0].imgUrl;

	        		})

	        	})
	        	
	 };

	// 教材版本
	$scope.get_resource = function(){

		var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.resource = result.data;	                  
	                   $scope.$apply();	                   
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/res/textbookVersion/read/all'
			}).then(callback);
	}

	$scope.get_resource();


	//年级
	$scope.get_grade = function(){

		var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.grade = result.data;	                  
	                   $scope.$apply();	                   
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/basegrade/read/alllist'
			}).then(callback);
	}

	$scope.get_grade();


	//科目 
	$scope.get_subject = function(){

		var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.subject = result.data;	                  
	                   $scope.$apply();	                   
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/subject/read/all'
			}).then(callback);
	}

	$scope.get_subject();

	$scope.submit = function(){

		    console.log('提交');	
        	console.log($scope.record);


        	var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功

						toaster.clear('*');
	                    toaster.pop('success', '', "保存成功");
	                    $timeout(function(){
	                        $state.go('main.res.textbook.list');
	                    },2000);

	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};


			$scope.record["grade.id"] = $scope.record.grade.id;
			$scope.record["subject.id"] = $scope.record.subject.id;
			$scope.record["version.id"] = $scope.record.version.id;



			delete $scope.record.updateTime;
			delete $scope.record.createTime;
			delete $scope.record.version.id



			$.ajax({
				url : $state.params.id?'/res/textbook/update':'/res/textbook/add',
				data: $scope.record
			}).then(callback);
	}


	//表单验证
        function validate(){
            jQuery('form').validate({
                rules: {
                	name: {
                        required: true
                    },
                    version: {
                        required: true
                    },
                    code: {
                        required: true
                    },
                    pic:{
                    	required: true
                    },
                    gradeId: {
                        required: true
                    },
                    subjectId: {
                        required: true
                    },
                    remark: {
                        required: true
                    }
                },
                messages: {
                	name: {
                        required: '请填写教材名称'
                    },
                    version: {
                        required: '请选择教材版本'
                    },
                    code: {
                        required: '请填写教材编号'
                    },
                    pic:{
                    	required: '请上传封面图片'
                    },
                    gradeId: {
                        required: '请选择年级'
                    },
                    subjectId: {
                        required: '请选择科目'
                    },
                    remark: {
                        required: '请添写教材版本简介'
                    }

                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }


        validate();


}]);