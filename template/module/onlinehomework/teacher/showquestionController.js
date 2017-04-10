'use strict';

angular.module('app')
	.controller('showquestionController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

	    $scope.id =  $state.params.id;                           	
	    $scope.param = {
	    	//"id": $state.params.id,
			// "gradeId": $state.params.gradeId,
			// "subjectId": $state.params.subjectId,
			// "chapterId": $state.params.chapterId,
			// "knowledgePointId": $state.params.knowledgePointId
	    }

	    //取出作业的详情 （取得现有的 questionId ）（目的：提交新的试题 拼接上原来的questionId）
	    $scope.get_detail = function(){

	    	var success = function(result){
	    		$scope.detail = result.data;
	    		$scope.param.ids = result.data.questionId;
	    		$scope.$apply();


	    		$scope.param.ids !="" && $scope.search();
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

	  			$scope.format($scope.pageInfo.list);

                $scope.$apply();
	  		}

	  		var error = function() {
	  			// body...
	  		}

	  	

	  	API.post("/res/question/list",$scope.param,success,error);
	  		
	  }

	  //$scope.search();


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
	  			arr[i].analysis = JSON.parse(arr[i].analysis);  //解析


	  			arr[i].answer = JSON.parse(arr[i].answer);  //答案
	  			
	  			
	  			arr[i].content = JSON.parse(arr[i].content); //内容
	  		}

	  }


	 // 根据地址状态显示相应的操作项
	 $scope.show_options = function(t){
	 	return $state.includes(t);
	 }


	 //解绑试题
	 $scope.unbindquestion = function(id){
	 	var id_arr = $scope.detail.questionId.split(',');

	 	var temp = [];
	 	for (var i = 0; i < id_arr.length; i++) {
	 		if(id_arr[i]!=id){
	 			temp.push(id_arr[i]);
	 		}
	 	}

	 	var success = function(result){
			toaster.clear('*');
            toaster.pop('success', '', '操作成功！');
            $scope.detail = result.eduHomework;

            $scope.param.ids = result.eduHomework.questionId;
           
            if($scope.param.ids==''){
            	console.log('eee');
            	$scope.param.ids='0';	
            }

            $scope.$apply();

            $scope.search();
		};
		var error  = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}

	 	API.post('/homework/bindQuestionId',{"id":$scope.id,"questionId":temp.join(',')},success,error);


	 }





	}])