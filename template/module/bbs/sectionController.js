'use strict';

angular.module('app')
	.controller('sectionController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API) {
		
	
	$scope.loading=false;

	$scope.s_all = 0;  //全选标记
    $scope.select_all = function(){
    	$scope.s_all = !$scope.s_all;

    	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
    		$scope.pageInfo.list[i].selected = $scope.s_all;
    	}

    };	
    
    $scope.select_per = function(index){
    	$scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
    }

    $scope.removeHTMLTag = function(str) {
            str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
            str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
            //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
            str=str.replace(/ /ig,'');//去掉 
            return str;
    }
    
    $scope.search=function(){
		$scope.s_all = 0;
		var success = function(result){
			// console.log(result);
			
			$scope.pageInfo = result.data;

			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				$scope.search1($scope.pageInfo.list[i].id,$scope.pageInfo.list[i]);
			}

			$scope.$apply();
			// var words = window.opener.document.getElementById("words");
   //  		$clamp(words, {clamp: 2, useNativeClamp: false});
		}

		var error = function(result){

		}
	
		API.post('/scl/bbs/plate/read/list',$scope.param,success,error);

	}

	$scope.search();
	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
	}

	// 版块里的5个热帖
	$scope.search1=function(pid,obj){
		$scope.s_all = 0;
		var success = function(result){

			obj.threads = result.data;
			console.log(obj.threads);
			$scope.$apply();
		}

		var error = function(result){
		}
	
		API.post('/scl/bbs/read/list',{"sectorId":pid},success,error);

	}
	// 翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };
     // 按键标记
 	$scope.set_curr1(1);
    //删除操作
	$scope.del = function(id){

		var success = function(result){
				toaster.clear('*');
            	toaster.pop('success', "", "删除成功");
            	$timeout(function(){
            		$scope.search();
            	},1000);
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}

		if(id){ //单个删除

			API.post("/scl/bbs/plate/delete",{"sectorId":id},success,error);

		}
    }
    // 删除确认
    $scope.op_confrim = function(id){
    		console.log(id);
	   		ngDialog.open({
				template:'template/module/edu/activity/confirm.html',
				controller: 'activityconfirmController',
				className: 'ngdialog-theme-green',
				data:{
					"id":id,
					"callback":$scope.del
				},
				resolve: {
   	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
   	                     	return uiLoad.load('template/module/edu/activity/activityconfirmController.js').then(function(){
   	                     		return $ocLazyLoad.load('toaster');
   	                     	});
   	                 }]}
			})


	   }



} ]);