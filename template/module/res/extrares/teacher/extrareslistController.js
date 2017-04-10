'use strict';

angular.module('app')
	.controller('extrareslistController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {
    $scope.app_name = "课外资源";  


    //资源分类 
    $scope.get_class = function(){
    	var success = function(result){
    		$scope.class = result.data;
    		$scope.$apply();
    	}
    	var error = function(){

    	}

    	API.post("/res/extraResource/read/classifyList",{},success,error);

    }
    $scope.get_class();


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


	//取得科目
	$scope.get_subject = function(){
		var success = function(result){
				$scope.subject = result.data;
				$scope.$apply();
			}
			var error = function(){

			}

			API.post('/subject/read/all',{"extraStr":"1"},success,error);
	}
	$scope.get_subject();

	$scope.params = {
		"resType":0,
		"classifyId":0,
		"subjectId":0,
		"pageSize":12
	};

	$scope.myfilter = function(item){

		if($scope.params.subjectId == 0 ){
			return true;
		}else{
			return $scope.params.subjectId==item.subjectId;
		}

	}

	$scope.set_subject = function(t){
		$scope.params.subjectId = t;

		//设置科目后 重新过滤分类
		$scope.params.classifyId = 0;

		$scope.search();
	}
	$scope.set_class = function(t){
		$scope.params.classifyId = t;

		$scope.search();
	}
	$scope.set_res = function(t){
		$scope.params.resType = t;

		$scope.search();
	}


	$scope.search = function(){

	  		var success = function(result) {
	  			console.log(result);
	  			$scope.pageInfo = result.data;
	  			console.log($scope.pageInfo);
                $scope.$apply();
	  		}

	  		var error = function() {
	  			// body...
	  		}

	  		API.post("/res/extraResource/read/list",$scope.params,success,error);
	  	
	  }

	  $scope.search();
	  
	  
	  


	 // 翻页
    $scope.pagination = function (obj) {
        $scope.params.pageNum=obj.page;
        $scope.params.pageSize = 12;
        $scope.search();
    };








}])