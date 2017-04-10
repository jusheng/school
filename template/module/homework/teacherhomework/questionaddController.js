'use strict';

angular.module('app')
	.controller('questionaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

	
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


	$scope.init = function(id){
		var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.record = result.data;

	                   $scope.record_temp.content_temp = JSON.parse(result.data.content);
	                   $scope.record_temp.analysis_temp = JSON.parse(result.data.analysis);


	                   //重组答案数据
			        	switch($scope.record.type){

			        		case 76: //单选题
			        			$scope.record_temp.single_answer_temp = JSON.parse($scope.record.answer);
			        			break;

			        		case 77: //多选题
			        			$scope.record_temp.multi_answer_temp = JSON.parse($scope.record.answer);
			        			break;

			        		case 78://问答题
			        			$scope.record_temp.qa_temp = JSON.parse($scope.record.answer);
			        			break;

			        		case 79://判断题
			        			$scope.record_temp.judge_answer_temp = JSON.parse($scope.record.answer);
			        			break;

			        		case 80://填空题
			        			$scope.record_temp.comple_temp = JSON.parse($scope.record.answer);
			        			break;

			        		case 147://解答题
			        			$scope.record_temp.aq_temp = JSON.parse($scope.record.answer);
			        			break;					
			        	}

			        	$scope.get_chapter_knowledge($scope.record.id);

	                   $scope.$apply();	                   
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/res/question/detail',
				data: {"id":id}
			}).then(callback);
	};


	if($state.params.id){  //编辑
	   $scope.record_temp = {};
	   $scope.init($state.params.id);
	   $scope.title = "试题编辑"+' ('+$state.params.subject_name+' '+$state.params.grade_name+')';
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


	//试题类型 
	$scope.get_type = function(){

		var success = function(result){
			console.log(result);
			$scope.type = result.data.list;
			$scope.type.reverse();
			$scope.$apply();
		};
		var error  = function(){

		}
		API.post('/dic/read/list',{"key":"QUESTION_TYPE"},success,error);
	};
	$scope.get_type();


	// 试题难度
	$scope.get_level = function(){

		var success = function(result){
			console.log(result);
			$scope.level = result.data.list;
			$scope.level.reverse();
			$scope.$apply();
		};
		var error  = function(){

		}
		API.post('/dic/read/list',{"key":"QUESTION_LEVEL"},success,error);
	};
	$scope.get_level();


	//试题内容图片上传
    $scope.onContentSelect = function(files){
    	console.log(files.length);

    	angular.forEach(files,function(file){
    		file.upload = Upload.upload({
    			"url":"/upload/file",
    			"data":{file:file},
    			"headers":{'Content-Type':'multipart/form-data'}
    		});

    		file.upload.then(function(response){
    			console.log(response);

    			//$scope.record.pic = response.data.data[0].id;
    			$scope.record_temp.content_temp.img.push(response.data.data[0].imgUrl);

    		})
    	})
    };

    $scope.del_content_img = function(index){
    	$scope.record_temp.content_temp.img.splice(index,1);
    }

    //试题解析图片上传
    $scope.onAnalysisSelect = function(files){
    	console.log(files.length);

    	angular.forEach(files,function(file){
    		file.upload = Upload.upload({
    			"url":"/upload/file",
    			"data":{file:file},
    			"headers":{'Content-Type':'multipart/form-data'}
    		});

    		file.upload.then(function(response){
    			console.log(response);

    			// $scope.record.pic = response.data.data[0].id;
    			// $scope.record.imgUrl = response.data.data[0].imgUrl;
    			$scope.record_temp.analysis_temp.img.push(response.data.data[0].imgUrl);
    		})
    	})
    };

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
					template: 'src/app/res/question/chapter.html',
					controller: 'chapterController',
					className: 'ngdialog-theme-green',
					scope:$scope,
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        	return uiLoad.load('src/app/res/question/chapterController.js').then(function(){
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
					template: 'src/app/res/question/knowledge.html',
					controller: 'knowledgeController',
					className: 'ngdialog-theme-green',
					scope:$scope,
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        	return uiLoad.load('src/app/res/question/knowledgeController.js').then(function(){
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

        	$scope.record.content = JSON.stringify($scope.record_temp.content_temp);
        	$scope.record.analysis = JSON.stringify($scope.record_temp.analysis_temp);

        	//重组答案数据
        	switch($scope.record.type){

        		case 76: //单选题
        			$scope.record.answer = JSON.stringify($scope.record_temp.single_answer_temp);
        			break;

        		case 77: //多选题
        			$scope.record.answer = JSON.stringify($scope.record_temp.multi_answer_temp);
        			break;

        		case 78://问答题
        			$scope.record.answer = JSON.stringify($scope.record_temp.qa_temp);
        			break;

        		case 79://判断题
        			$scope.record.answer = JSON.stringify($scope.record_temp.judge_answer_temp);
        			break;

        		case 80://填空题
        			$scope.record.answer = JSON.stringify($scope.record_temp.comple_temp);
        			break;

        		case 147://解答题
        			$scope.record.answer = JSON.stringify($scope.record_temp.aq_temp);
        			break;					
        	}

        	console.log($scope.record);

        	var success = function(result){
        		toaster.clear('*');
	            toaster.pop('success', '', "操作成功");
	            $timeout(function(){
	            	$state.go('main.res.question.questionlist',{"subject_id": $scope.param.subjectId, "grade_id":$scope.param.gradeId, "subject_name":$scope.param.subjectName, "grade_name":$scope.param.gradeName});
	            },1000)
        	};

        	var error = function(){

        	}

        	recordFormat.format($scope.record,'.');

        	if($state.params.id){
        		API.post("/res/question/update",$scope.record,success,error);
        	}else{
        		API.post("/res/question/add",$scope.record,success,error);
        	}
	}

	//表单验证、
	var validator;
        function validate(){
		    validator = jQuery('form').validate({
		                rules: {
		                	rank: {
		                        required: true
		                    },
		                    chapters:{
								required: true
		                    },
		                    knowledgePoints:{
								required: true
		                    },
		                    hide_content: {
		                        required: true
		                    },
		                	type: {
		                        required: true
		                    },
		                    hide_analysis: {
		                        required: true
		                    },
		                    keyword: {
		                        required: true
		                    },
		                    duration: {
		                        required: true
		                    },
		                    tag: {
		                        required: true
		                    }
		                },
		                messages: {
		                	rank: {
		                        required: '请选择试题难度'
		                    },
		                    chapters:{
								required: "请选择教材章节"
		                    },
		                    knowledgePoints:{
								required: "请选择知识点"
		                    },
		                    hide_content: {
		                        required: '请填写试题内容'
		                    },
		                	type: {
		                        required: '请填写试题类型'
		                    },
		                    hide_analysis: {
		                        required: '请填写试题解析'
		                    },
		                    keyword: {
		                        required: '请填写关键词'
		                    },
							duration: {
		                        required: '请填写试题时间'
		                    },
		                    tag: {
		                        required: '请填写试题标签'
		                    }
		                },
		                submitHandler: function() {
		                    $scope.submit();
		                }
		            });
        }


        validate();                                	

}])	                                	