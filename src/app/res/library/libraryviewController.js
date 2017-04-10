'use strict';

angular.module('app')
	.controller('libraryviewController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','recordFormat','API','Upload','ngDialog',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,recordFormat,API,Upload,ngDialog) {
	$scope.title="资源查看"+' ('+$state.params.subject_name+' '+$state.params.grade_name+')';


	//内容编辑框的样式
     $scope._simpleConfig = {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars:[['Source','kityformula']],
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



	$scope.param = {
			"subjectId" : $state.params.subject_id,  //课目ID
			"gradeId" : $state.params.grade_id,  //年级ID
			"subjectName": $state.params.subject_name,
			"gradeName": $state.params.grade_name
		}

	$scope.type = [
		{
		 "id":1,
	     "name":"教案"
	    },
	    {
		 "id":2,
	     "name":"PPT"
	    },
	    {
		 "id":3,
	     "name":"微视频"
	    }
	]	

	//取得章节 知识点	
	$scope.get_chapter_knowledge = function(id){
		var success = function(result){
			console.log(result);

			$scope.record.s_chapter = result.data.chapterlist[0].name;
			$scope.record.s_knowledgePoints = result.data.knowledgePointlist[0].name;

			$scope.record.textbookId = result.data.chapterlist[0].textbook.id;
			$scope.record.schoolType = result.data.knowledgePointlist[0].schoolType;

			$scope.$apply();

		};
		var error = function(){

		}

		API.post("/res/question/getListByQuestionId",{"id":id},success,error);
	}	

	//取得章节 知识点	
		$scope.get_chapter= function(obj){
			var success = function(result){
				console.log(result);

				obj.s_chapter = result.data.name;
				//obj.s_knowledgePoints = result.data.knowledgePointlist[0].name;

				// $scope.record.textbookId = result.data.chapterlist[0].textbook.id;
				// $scope.record.schoolType = result.data.knowledgePointlist[0].schoolType;

				$scope.$apply();

			};
			var error = function(){

			}

			API.post("/res/chapter/read/detail",{"id":obj.chapterId},success,error);
		}	

		$scope.get_knowledge= function(obj){
			var success = function(result){
				console.log(result);

				//obj.s_chapter = result.data.chapterlist[0].name;
				obj.s_knowledgePoints = result.data.name;

				// $scope.record.textbookId = result.data.chapterlist[0].textbook.id;
				// $scope.record.schoolType = result.data.knowledgePointlist[0].schoolType;

				$scope.$apply();

			};
			var error = function(){

			}

			API.post("/res/knowledge/read/detail",{"id":obj.knowledgeId},success,error);
		}	

	$scope.view_doc = function(url){
		$('#documentViewer').FlexPaperViewer(
            { config : {

                //SWFFile : "http://jxt.chenharry.com/group1/M00/00/12/wKgCXlgQUSqAWkOlAAAZdCfs1U4520.swf",
                SWFFile : url,

                Scale : 0.6,
                ZoomTransition : 'easeOut',
                ZoomTime : 0.5,
                ZoomInterval : 0.2,
                FitPageOnLoad : true,
                FitWidthOnLoad : true,
                FullScreenAsMaxWindow : true,
                ProgressiveLoading : false,
                MinZoomSize : 0.2,
                MaxZoomSize : 5,
                SearchMatchAll : false,
                InitViewMode : 'Portrait',
                RenderingOrder : 'flash',
                StartAtPage : '',

                ViewModeToolsVisible : true,
                ZoomToolsVisible : true,
                NavToolsVisible : true,
                CursorToolsVisible : true,
                SearchToolsVisible : true,
                WMode : 'window',
                localeChain: 'en_US'
            }}
   		 );
	}	
	
	$scope.view_video = function(url){
		jwplayer("mediaplayer").setup({
		    flashplayer: "res/jwplayer/player.swf",
		    file: url,
		    //image: "jwplayer/preview.png",
		    width: "980px",
		    height: "476px",
		    autostart: false
		});
	}

	$scope.init = function(id){
		var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.record = result.data;


	                   if($scope.record.type=="1" || $scope.record.type=="2"){
							$scope.record.originalName = $scope.record.fileUrl;

							$scope.view_doc($scope.record.fileSwfUrl);

						}else{
							$scope.record.originalName1 = $scope.record.fileUrl;

							$scope.view_video($scope.record.fileUrl);
						}

						$scope.get_chapter($scope.record);
						$scope.get_knowledge($scope.record);



	                   $scope.$apply();	                   
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/res/library/read/detail',
				data: {"id":id}
			}).then(callback);
	};


	if($state.params.id){  //编辑
	   $scope.record_temp = {};
	   $scope.init($state.params.id);
	   $scope.title = "资源查看"+' ('+$state.params.subject_name+' '+$state.params.grade_name+')';
	}else{


		$scope.record = {
			"grade.id":$state.params.grade_id,
			"subject.id":$state.params.subject_id
		}

		$scope.record_temp = {  //临时记录数据对象
			"content_temp":{ //试题内容
				"c":"",
				"img":[]
			},
			"analysis_temp":{  //试题解析
				"c":"",
				"img":[]
			}
		}


	}






    // office上传
    var upload_type1 = [
    	"application/msword",
    	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    	"application/vnd.ms-excel",
    	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    	"application/vnd.ms-powerpoint",
    	"application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ];
	$scope.onFileSelect = function(files){
	        	console.log(files.length);

	        	angular.forEach(files,function(file){
	        		console.log(file);

	        		if(upload_type1.join(",").indexOf(file.type)<0){
	        			toaster.clear('*');
	            		toaster.pop('error', '', "只允许上传doc,docx,xls,xlsx,ppt,pptx类型文件");
	        			return false;
	        		}

	        		file.upload = Upload.upload({
	        			"url":"/upload/uploadFileToConver",
	        			"data":{file:file},
	        			"headers":{'Content-Type':'multipart/form-data'}
	        		}).progress(function (evt) {
	                    //进度条
	                    $scope.upload1_progress = parseInt(100.0 * evt.loaded / evt.total);
	                    //console.log('progess:' + progressPercentage + '%');



	                });

	        		file.upload.then(function(response){
	        		

	        			// $scope.record.pic = response.data.data[0].id;
	        			// $scope.record.imgUrl = response.data.data[0].imgUrl;
	        			
	        			if(response.data && response.data.data && response.data.data.length>0){

	        				for (var i = 0; i < response.data.data.length; i++) {

	        					if(response.data.data[i].type=="1"){

	        						$scope.record.originalName = response.data.data[i].originalName;

	        						$scope.record.fileId = response.data.data[i].id;
	        						$scope.record.fileUrl = response.data.data[i].imgUrl;

	        					}else if(response.data.data[i].type=="2"){

	        						$scope.record.filePdfUrl = response.data.data[i].imgUrl;

	        					}else if(response.data.data[i].type=="3"){

									$scope.record.fileSwfUrl = response.data.data[i].imgUrl;
	        					}
	        					
	        				}


	        			}else{
	        				toaster.clear('*');
	            			toaster.pop('error', '', response.statusText);
	        			}
	        			 
	        		

	        		})
	        		

	        	})
	        	
	      };

// 视频上传
	var upload_type2 = [
    	"video/mp4"
    ];
	$scope.onFileSelect1 = function(files){
	        	console.log(files.length);

	        	angular.forEach(files,function(file){

	        		console.log(file);
	        		if(upload_type2.join(",").indexOf(file.type)<0){
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
	                    $scope.upload2_progress = parseInt(100.0 * evt.loaded / evt.total);
	                    //console.log('progess:' + progressPercentage + '%');



	                });

	        		file.upload.then(function(response){
	        			console.log(response);

	        			$scope.record.originalName1 = response.data.data[0].originalName;

	        			$scope.record.fileId = response.data.data[0].id;
	        			$scope.record.fileUrl = response.data.data[0].imgUrl;

	        		})

	        	})
	        	
	      };


    $scope.del_content_img = function(index){
    	$scope.record_temp.content_temp.img.splice(index,1);
    }


     $scope.del_analysis_img = function(index){
    	$scope.record_temp.analysis_temp.img.splice(index,1);
    }


    $scope.change_answer = function(){
    	angular.element('.edui-editor-iframeholder').css({"width":"auto"});
    	angular.element('.edui-editor').css({"width":"auto"});

    }


    //选择章节
    $scope.select_chapter = function(){

    	ngDialog.open({
					template: 'src/app/res/library/chapter.html',
					controller: 'chapterController',
					className: 'ngdialog-theme-green',
					scope:$scope,
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        	return uiLoad.load('src/app/res/library/chapterController.js').then(function(){
                        		return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                        	});
                        }]}
				});
    }

    //选择知识点
    $scope.select_knowledgePoints = function(){

    	ngDialog.open({
					template: 'src/app/res/library/knowledge.html',
					controller: 'knowledgeController',
					className: 'ngdialog-theme-green',
					scope:$scope,
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        	return uiLoad.load('src/app/res/library/knowledgeController.js').then(function(){
                        		return $ocLazyLoad.load([
                                    'toaster',
                                    'lib/angular/ivh-treeview.css',
                                    'lib/angular/ivh-treeview-theme-basic.css'
                                    ]);
                        	});
                        }]}
				});

    }

    if(!$state.params.id){
	    $scope.$watch("record_temp.content_temp.c",function(){
	    	if(!$scope.record_temp.content_temp.c){
	    		return false;
	    	};
	    	validator.form();
	    });


	    $scope.$watch("record_temp.analysis_temp.c",function(){
	    	if(!$scope.record_temp.analysis_temp.c){
	    		return false;
	    	};
	    	validator.form();
	    })
    }


    $scope.validator = function(){
    	validator.form();
    }


	$scope.submit = function(){
		    console.log('提交');	
        	console.log($scope.record);

        	
        	switch($scope.record.type){

        		case 1: //教案
        			//$scope.record.s_chapter &&　delete $scope.record.s_chapter;
        			//$scope.record.chapters &&　delete $scope.record.chapters;
					$scope.record.s_knowledgePoints &&　delete $scope.record.s_knowledgePoints;
					$scope.record.knowledgePoints &&　delete $scope.record.knowledgePoints;

        			break;

        		case 2: //PPT

        			//$scope.record.s_chapter &&　delete $scope.record.s_chapter;
        			//$scope.record.chapters &&　delete $scope.record.chapters;
					$scope.record.s_knowledgePoints &&　delete $scope.record.s_knowledgePoints;
					$scope.record.knowledgePoints &&　delete $scope.record.knowledgePoints;

        			break;
				
        	}

        	console.log($scope.record);

        	var success = function(result){
        		toaster.clear('*');
	            toaster.pop('success', '', "操作成功");
	            $timeout(function(){
	            	$state.go('main.res.library.librarylist',{"subject_id": $scope.param.subjectId, "grade_id":$scope.param.gradeId, "subject_name":$scope.param.subjectName, "grade_name":$scope.param.gradeName});
	            },1000)
        	};

        	var error = function(){

        	}

        	recordFormat.format($scope.record,'.');

        	if($state.params.id){
        		API.post("/res/library/update",$scope.record,success,error);
        	}else{
        		API.post("/res/library/add",$scope.record,success,error);
        	}
	}

	// $scope.$watch("record.type",function(){

	// 	if(!$scope.record.type){
	// 		return false;
	// 	}

	// 	if($scope.record.type=="1" || $scope.record.type=="2"){
	// 		$("#originalName1").rules("remove");
	// 		//$("#chapters").rules("remove");
	// 		$("#knowledgePoints").rules("remove");

	// 	}else{
	// 		$("#originalName1").rules("add",{required:true,messages:{required:"请上传视频文件"}});
	// 		//$("#chapters").rules("add",{required:true,messages:{required:"请选择章节"}});
	// 		$("#knowledgePoints").rules("add",{required:true,messages:{required:"请选择知识点"}});
	// 	}	

	// });

	//表单验证、
	var validator;

        function validate(){

		    validator = jQuery('form').validate({
		                rules: {
		                	type: {
		                        required: true
		                    },
		                    name:{
								required: true
		                    },
		                    chapters:{
								required: true
		                    },
		                    originalName:{
		                    	required: true
		                    }
		                },
		                messages: {
		                	type: {
		                        required: '请选择资源类型'
		                    },
		                    name:{
								required: "请添写文件名称"
		                    },
		                    chapters:{
								required: "请选择章节"
		                    },
		                    originalName:{
		                    	required: "请上传文件或等待文件格式转换完成"
		                    }
		                },
		                submitHandler: function() {
		                    $scope.submit();
		                }
		   });


        }


        validate();

}])