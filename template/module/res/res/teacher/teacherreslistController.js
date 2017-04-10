'use strict';

angular.module('app')
	.controller('teacherreslistController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

	  var ico = {
	  		'doc':"template/img/res/doc.jpg",
	  		'docx':"template/img/res/doc.jpg",
	  		'xls':"template/img/res/xls.jpg",
	  		'xlsx':"template/img/res/xls.jpg",
	  		'ppt':"template/img/res/ppt.jpg",
	  		'pptx':"template/img/res/ppt.jpg",
	  		'mp4':"template/img/res/mp4.jpg",
	  }
	  $scope.re_ico = function(obj){
	  	var temp = obj.fileUrl.split(".");

	  	obj.ico = ico[temp[temp.length-1].toLowerCase()];

	  }


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



	  $scope.format = function(arr){

	  		for (var i = 0; i < arr.length; i++) {
	  			arr[i].analysis = JSON.parse(arr[i].analysis);  //解析


	  			arr[i].answer = JSON.parse(arr[i].answer);  //答案
	  			
	  			
	  			arr[i].content = JSON.parse(arr[i].content); //内容
	  		}

	  }




	  $scope.type = 1;
	  $scope.param = {
	  		"textbookId": $state.params.textbookId
	  };
	  //教材 PPI 视频 试题
	  $scope.get_res = function(){

	  		var success = function(result) {
	  			console.log(result);
	  			$scope.pageInfo = result.data;

	  			if($scope.type!=4){
	  				for (var i = 0; i < $scope.pageInfo.list.length; i++) {
		  				$scope.re_ico($scope.pageInfo.list[i]);


		  				var arr = $scope.pageInfo.list[i].fileUrl.split(".");
						$scope.pageInfo.list[i].extension = arr[arr.length-1];

		  			}
	  			}else{   //试题内容格式化
	  				$scope.format($scope.pageInfo.list);
	  			}
	  			

                $scope.$apply();
	  		}

	  		var error = function() {
	  			// body...
	  		}

	  		$scope.param.type = $scope.type;

	  		if($scope.curr!=0){
	  			$scope.param.chapterId = $scope.curr;
	  		}else{
	  			delete $scope.param.chapterId;
	  		}


	  		if($scope.type !=4){
	  			API.post("/res/library/list",$scope.param,success,error);
	  		}else{


	  			delete $scope.param.type;
	  			API.post("/res/question/list",$scope.param,success,error);
	  		}
	  		


	  }

	  $scope.get_res();


	  // 翻页
	    $scope.pagination = function (obj) {
	        $scope.param.pageNum=obj.page;
	        $scope.get_res();
	    };

	  $scope.$watch("curr",function(){
	  	
	  		$scope.get_res();
	  })




	  $scope.change = function(s){
	  		
  			$scope.type = s;
  			$scope.get_res();
	  		
	  }



}])