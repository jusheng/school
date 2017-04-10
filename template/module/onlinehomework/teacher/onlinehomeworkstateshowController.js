'use strict';

angular.module('app')
	.controller('onlinehomeworkstateshowController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
	$scope.app_name = "在线作业";

	//内容编辑框的样式
   $scope._simpleConfig = {
            //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
            toolbars:[['Source','undo','redo','bold','italic','underline','fontsize','fontfamily', 'justifyleft', 
    'justifyright', 
    'justifycenter', 
    'justifyjustify', 'insertimage']],
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
            //"initialFrameHeight":300
      }

    $scope.set_curr(3);  

	
	$scope.id = $state.params.id;
	$scope.hid = $state.params.hid;
	$scope.status = $state.params.status;
	$scope.endDate = $state.params.endDate;


	// var now = Date.parse(new Date());
	// var endDate = Date.parse(new Date($scope.endDate));
	// console.log(now - endDate);
	// if((now - endDate)>0){
	// 	$scope.overTime = true;
	// }else{
	// 	$scope.overTime = false;
	// }


	$scope.param = {
		stuHomeworkId:$scope.hid
	};



	 //取出作业的详情 
	 $scope.get_detail = function(){

	    	var success = function(result){
	    		$scope.detail = result.data;
	    	}

	    	var error = function(){

	    	}


	    	API.post("/homework/read/detail",{"id":$scope.id},success,error);
	  }
	  $scope.get_detail();

	  $scope.search = function(){

	  		var success = function(result) {
	  			console.log(result);
	  			$scope.pageInfo = result.data;


	  			//老师没有阅卷的题目(主观题) 把isTrue都置为null
	  			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
	  				if($scope.pageInfo.list[i].isMarking){
	  					//$scope.pageInfo.list[i].isTrue = null;
	  				}
	  			}



	  			$scope.format($scope.pageInfo.list);

                $scope.$apply();
	  		}

	  		var error = function() {
	  			// body...
	  		}

	  	

	  	API.post("/homework/getAnswerBystuHomeworkId",$scope.param,success,error);
	  		
	  }

	  $scope.search();


	  // 翻页
	    $scope.pagination = function (obj) {
	        $scope.param.pageNum=obj.page;
	        $scope.search();
	    };
      

	  //试题类型 
	$scope.get_type = function(){

		var success = function(result){
			console.log(result);
			$scope.answertype = {}; 

			for (var i = 0; i < result.data.list.length; i++) {
				$scope.answertype[result.data.list[i].id] = result.data.list[i].codeText;
			}

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
			$scope.level = [];
			for (var i = 0; i < result.data.list.length; i++) {
				$scope.level[result.data.list[i].id] = result.data.list[i].codeText;
			}

			$scope.$apply();
		};
		var error  = function(){

		}
		API.post('/dic/read/list',{"key":"QUESTION_LEVEL"},success,error);
	};
	$scope.get_level();


	//试题内容的格式化
	$scope.format = function(arr){

	  		for (var i = 0; i < arr.length; i++) {
	  			arr[i].resQuestion.analysis = JSON.parse(arr[i].resQuestion.analysis);  //解析


	  			arr[i].resQuestion.answer = JSON.parse(arr[i].resQuestion.answer);  //答案
	  			
	  			
	  			arr[i].resQuestion.content = JSON.parse(arr[i].resQuestion.content); //内容


	  			arr[i].answerSheet = JSON.parse(arr[i].answerSheet); //学生添写的答案
	  		}

	  }


	//显示提交答案按钮
	$scope.show_answerBtn = function(index){

		var select = $scope.pageInfo.list[index].answerSheet;

		if(!select){
			return false;
		}

		if(Object.prototype.toString.call(select)=='[object Object]'){  //多选题
				

				//至少有一个项为true时  才允许提交
				for(var i in select){
					if(select[i]){
						return true;
						break;
					}
				}


		}else{  //单选题或主观题答案
			if(select!=""){
				return true;
			}
		}


		return false;

		
	}	  


	var is_correct_77_79 = function(index){
		var my_answer = $scope.pageInfo.list[index].answerSheet;
		var collect_answer = $scope.pageInfo.list[index].resQuestion.answer;

		//把答案的中的正确选项取出来
		var temp = {};
		for (var i = 0; i < collect_answer.length; i++) {
			if(collect_answer[i].is_correct){
				temp[i] = true;
			}
		}
		console.log(temp);
		console.log(my_answer);

		if(JSON.stringify(temp) == JSON.stringify(my_answer)){
			return 1;
		}else{
			return 0;
		}

	}
    

    var is_correct_76 = function(index){
    	var my_answer = $scope.pageInfo.list[index].answerSheet;
		var collect_answer = $scope.pageInfo.list[index].resQuestion.answer;

		console.log(collect_answer[my_answer].is_correct);
		if(collect_answer[my_answer].is_correct == 1 || collect_answer[my_answer].is_correct == true){
			return 1;
		}else{
			return 0;
		}
    }

    //学生提交答案
    //questionId 试题ID
    //index  索引
    //answerSheetId 答题卡Id
    //type 试题类型 
    $scope.answerSheet = function(questionId,index,answerSheetId,type){
    	console.log(JSON.stringify($scope.pageInfo.list[index].answerSheet));
    	var select = $scope.pageInfo.list[index].answerSheet;


    	var isTrue = 0;

    	//if(Object.prototype.toString.call(select)=='[object Object]'){  
    	if(type ==77 || type == 79){  //提交的是 多选题 判断题答案 判断是否答对了	
    		var temp = {};	
    		for(var i in select){
    			if(select[i]){
    				temp[i]=select[i];
    			}
    		}
    		$scope.pageInfo.list[index].answerSheet = temp;
    		isTrue = is_correct_77_79(index);
    		console.log(isTrue);
    	}

    	if(type==76){ //提交的是单选题  判断是否答对了	
    		isTrue = is_correct_76(index);
    		console.log(isTrue);
    	}


    	var success = function(result){
    		toaster.clear('*');
            toaster.pop('success', '', '提交答案成功');
            $scope.pageInfo.list[index].status = 0;
            $scope.$apply();
    	}

    	var error = function(){

    	}

    	API.post("/homework/saveAnswer",{
    		"stuHomeworkId":$scope.hid,
    		"questionId":questionId,
    		'answerSheet':JSON.stringify($scope.pageInfo.list[index].answerSheet),
    		'id':answerSheetId,
    		'isTrue':isTrue
    	},success,error);


    }



    //提交作业
    $scope.homework_submit = function(){

    	var callback = function(id){
    		var success = function(result){
				toaster.clear('*');
		        toaster.pop('success', '', '作业提交成功');
		        //$scope.status = 0;
		        $scope.$apply();

		        $timeout(function(){
		        	$state.go("main.studentonlinehomework.list");
		        },1000);
			}

			var error = function(){

			}

			API.post("/homework/submit",{"id":id},success,error);
    	}


    	ngDialog.open({
            template:'template/module/tpl/return.html',
            controller: 'returnController',
            className: 'ngdialog-theme-green',
            data:{
                "id":$scope.hid,
                "callback":callback,
                "title":"提交作业",
                "confirm_msg":"请确认作业已完成，提交后将不能修改试题答案！"
            },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/tpl/returnController.js').then(function(){
                            return $ocLazyLoad.load('toaster');
                        });
                 }]}
        })
    }



    //显示我的答案
    $scope.show_myanwser = function(index){

    	var obj = $scope.pageInfo.list[index];

 		//<!-- 填空题 问答题 解答题-->
    	if(obj.resQuestion.type == 80 || obj.resQuestion.type==78 || obj.resQuestion.type==147){
    		return obj.status==0 ? obj.answerSheet:"未答此题";
    	}

    	//单选题 
        if(obj.resQuestion.type == 76){  //单选题

        	if(obj.status == 0){
        		return $scope.pageInfo.list[index].resQuestion.answer[obj.answerSheet].select.replace(/:/g,'');
        	}else{
        		return "未答此题";
        	}

        }           

        //多选题 判断题
        if(obj.resQuestion.type == 77 || obj.resQuestion.type == 79){

        	if(obj.status == 0){

        		var temp = [];
        		for(var i in obj.answerSheet){
        			temp.push($scope.pageInfo.list[index].resQuestion.answer[i].select.replace(/:/g,''));
        		}

        		return temp.join(',');

        		//return $scope.pageInfo.list[index].resQuestion.answer[obj.answerSheet].select.replace(/:/g,'');
        	}else{
        		return "未答此题";
        	}

        } 
		                    
    }


    //老师批阅主观题
    $scope.marking = function(index){

    	var obj = $scope.pageInfo.list[index];
    	var success = function(result){
    		toaster.clear('*');
		    toaster.pop('success', '', '批阅成功！');
		    obj.isMarking = 0;
		    obj.isTrue = obj.isTrue-0;

    	}

    	var error = function(){

    	}

    	console.log(obj);

    	API.post("/homework/reviewAnwser",{
    		"id":obj.id,
    		"isTrue":obj.isTrue,
    		"remark":obj.remark
    	},success,error);

    }




}])