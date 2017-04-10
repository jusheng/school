'use strict';

angular.module('app')
	.controller('extraresaddController',['$rootScope','$scope','$http','$state','toaster','API','Upload','$timeout','recordFormat',
		function($rootScope,$scope,$http,$state,toaster,API,Upload,$timeout,recordFormat){
		
		$scope.subjectId = $state.params.subject_id;
		$scope.km = $state.params.km;

		$scope.title="课外资源管理 - "+$scope.km;


		//内容编辑框的样式
     	$scope._simpleConfig = {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars:[['Source','undo','redo','bold','italic','underline','fontsize','fontfamily', 'justifyleft', 
        'justifyright', 
        'justifycenter', 
        'justifyjustify', 'kityformula','insertimage']],
                //focus时自动清空初始化时的内容
                //autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false,
                "imageActionName": "uploadimage", /* 执行上传图片的action名称 */  
                "imageFieldName": "upfile", /* 提交的图片表单名称 */  
                "imageMaxSize": 2048000, /* 上传大小限制，单位B */  
                "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */  
                "imageCompressEnable": true, /* 是否压缩图片,默认是true */  
                "imageCompressBorder": 1600, /* 图片压缩最长边限制 */  
                "imageInsertAlign": "none", /* 插入的图片浮动方式 */  
          }


		//资源类型
		$scope.get_type = function(){
			var success = function(result){
				console.log(result);
				$scope.resType = result.data.list;
				$scope.$apply();
			}
			var error = function(){

			}

			API.post('/dic/read/list',{"key":"RESOURCE_TYPE"},success,error);
		}	
	    $scope.get_type();


	    //资源分类
		$scope.get_class = function(){
			var success = function(result){
				$scope.class = result.data;
				$scope.$apply();
			}
			var error = function(){

			}

			API.post('/res/extraResourceClassify/getList',{},success,error);
		}	
	    $scope.get_class();



	    $scope.init = function(id){

	    	var success = function(result){
				$scope.record = result.data;
				
				if($scope.record.icon){
					$scope.record.originalName2 = $scope.record.icon;
				}
				$scope.record.originalName = $scope.record.resUrl;

				if($scope.record.resType==3){ //视频类
					$scope.record.originalName = $scope.record.resUrl;
				}

				if($scope.record.resType==2){ //音频类
					$scope.record.originalName1 = $scope.record.resUrl;
				}


				$scope.$apply();
			}
			var error = function(){

			}

			API.post('/res/extraResource/detail',{"id":id},success,error);
	    }
	    

	    $scope.record = {};
	    if($state.params.id != "0"){
	    	$scope.init($state.params.id);
	    }else{
	    	// $scope.record = {
	    	// 	"status":1
	    	// }

	    	$scope.record.status = 1;
	    }

	    



	 //    $scope.$watch("record.resType",function(){

		// 	if(!$scope.record.resType){
		// 		return false;
		// 	}

		// 	if($scope.record.resType=="3"){
		// 		console.log('ddd');
		// 		$("#originalName").rules("add",{required:true,messages:{required:"请上传视频文件"}});
		// 		$("#description").rules("add",{required:true,messages:{required:"请添写介绍描述"}});

		// 		$("#originalName1").rules("remove");
		// 	}


		// 	if($scope.record.resType=="2"){
		// 		$("#originalName1").rules("add",{required:true,messages:{required:"请上传视频文件"}});
		// 		$("#description").rules("add",{required:true,messages:{required:"请添写介绍描述"}});

		// 		$("#originalName").rules("remove");
		// 	}

		// 	if($scope.record.resType=="1"){
		// 		$("#content").rules("add",{required:true,messages:{required:"请添写文字内容"}});
				
		// 		$("#originalName1").rules("remove");	
		// 		$("#originalName").rules("remove");
		// 		$("#description").rules("remove");
		// 	}


		// });

		$scope.change_restype = function(){
	    	angular.element('.edui-editor-iframeholder').css({"width":"auto"});
	    	angular.element('.edui-editor').css({"width":"auto"});

	    }


	// 图片上传
	
	$scope.onFileSelect_img = function(files){
	        	console.log(files.length);

	        	angular.forEach(files,function(file){

	        		// console.log(file);
	        		// if(upload_type1.join(",").indexOf(file.type)<0){
	        		// 	toaster.clear('*');
	          //   		toaster.pop('error', '', "只允许上传mp4类型文件");
	        		// 	return false;
	        		// }


	        		file.upload = Upload.upload({
	        			"url":"/upload/file",
	        			"data":{file:file},
	        			"headers":{'Content-Type':'multipart/form-data'}
	        		}).progress(function (evt) {
	                    //进度条
	                    $scope.upload3_progress = parseInt(100.0 * evt.loaded / evt.total);
	                    //console.log('progess:' + progressPercentage + '%');



	                });

	        		file.upload.then(function(response){
	        			console.log(response);

	        			$scope.record.originalName2 = response.data.data[0].originalName;

	        			//$scope.record.fileId = response.data.data[0].id;
	        			$scope.record.icon = response.data.data[0].imgUrl;

	        		})

	        	})
	        	
	      };    

	// 视频上传
	var upload_type1 = [
    	"video/mp4",
    	//'application/x-shockwave-flash'
    ];
	$scope.onFileSelect = function(files){
	        	console.log(files.length);

	        	angular.forEach(files,function(file){

	        		console.log(file);
	        		if(upload_type1.join(",").indexOf(file.type)<0){
	        			toaster.clear('*');
	            		toaster.pop('error', '', "只允许上传mp4类型文件");
	        			return false;
	        		}


	        		file.upload = Upload.upload({
	        			"url":"/upload/file",
	        			"data":{file:file},
	        			"headers":{'Content-Type':'multipart/form-data'}
	        		}).progress(function (evt) {
	                    //进度条
	                    $scope.upload1_progress = parseInt(100.0 * evt.loaded / evt.total);
	                    //console.log('progess:' + progressPercentage + '%');



	                });

	        		file.upload.then(function(response){
	        			console.log(response);

	        			$scope.record.originalName = response.data.data[0].originalName;

	        			//$scope.record.fileId = response.data.data[0].id;
	        			$scope.record.resUrl = response.data.data[0].imgUrl;

	        		})

	        	})
	        	
	      };


	    //音频上传  
		var upload_type2 = [
	    	"audio/mp3"
	    ];
		$scope.onFileSelect1 = function(files){
	        	console.log(files.length);

	        	angular.forEach(files,function(file){

	        		console.log(file);
	        		if(upload_type2.join(",").indexOf(file.type)<0){
	        			toaster.clear('*');
	            		toaster.pop('error', '', "只允许上传mp3类型文件");
	        			return false;
	        		}


	        		file.upload = Upload.upload({
	        			"url":"/upload/file",
	        			"data":{file:file},
	        			"headers":{'Content-Type':'multipart/form-data'}
	        		}).progress(function (evt) {
	                    //进度条
	                    $scope.upload2_progress = parseInt(100.0 * evt.loaded / evt.total);
	                    //console.log('progess:' + progressPercentage + '%');



	                });

	        		file.upload.then(function(response){
	        			console.log(response);

	        			$scope.record.originalName1 = response.data.data[0].originalName;

	        			//$scope.record.fileId = response.data.data[0].id;
	        			$scope.record.resUrl = response.data.data[0].imgUrl;

	        		})

	        	})
	        	
	      };  

	    $scope.submit = function(){
	     	console.log('提交');
	     	var success = function(){
	     		toaster.clear('*');
	            toaster.pop('success', '', "操作成功");
	            $timeout(function(){
	            	$state.go('main.res.extra.reslist',{subject_id: $scope.subjectId,km:$scope.km});
	            },1000)
	     	}

	     	var error = function(){

	     	}

	     	recordFormat.format($scope.record,".");
	     	
	     	if($state.params.id != "0"){
				API.post("/res/extraResource/update",$scope.record,success,error);
	     	}else{
	     		API.post("/res/extraResource/add",$scope.record,success,error);
	     	}
	     	
	    }    
		function validate(){

		    jQuery('form').validate({
		                rules: {
		                	title: {
		                        required: true
		                    },
		                    // originalName2: {
		                    //     required: true
		                    // },
		                	resType: {
		                        required: true
		                    },
		                    classifyId:{
								required: true
		                    }
		                },
		                messages: {
		                	title: {
		                        required: '请添写标题'
		                    },
		                    // originalName2: {
		                    //     required: '请上传图片'
		                    // },
		                	resType: {
		                        required: '请选择资源类型'
		                    },
		                    classifyId:{
								required: "请选择资源分类"
		                    }
		                },
		                submitHandler: function() {
		                    $scope.submit();
		                }
		   });


        }


        validate();



}])