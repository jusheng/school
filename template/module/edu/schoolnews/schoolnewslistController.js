'use strict';

angular.module('app')
	.controller('schoolnewslistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout','$sce',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout,$sce) {
		
	    // 新闻列表
	   $scope.param={ };

	   if($state.params.sorts_id!=0){
			$scope.param.sortsId = $state.params.sorts_id;
		}

		$scope.myfilter = function(str){

			str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
            str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
            //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
            str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
            return str;

			//return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
		}

		// $scope.content = $sce.trustAsHtml("这里写需要的代码");
	    $scope.schoolnews_list = function(){

	   		var success = function(result){
	   			$scope.pageInfo = result.data;
	   			for (var i = $scope.pageInfo.list.length - 1; i >= 0; i--) {
	   				//$scope.pageInfo.list[i].content = $sce.trustAsHtml($scope.pageInfo.list[i].content);
	   				$scope.pageInfo.list[i].createTime = $scope.pageInfo.list[i].createTime.split(' ')[0];

	   			}


	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/scl/news/read/list", $scope.param,success,error);
	   } 

	   $scope.schoolnews_list();

	   // 翻页
	    $scope.pagination = function (obj) {
	    	
	        $scope.param.pageNum=obj.page;
	        $scope.schoolnews_list();
	    };

}])